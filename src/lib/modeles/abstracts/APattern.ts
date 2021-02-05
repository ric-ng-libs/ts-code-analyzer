import { IStringablesLogger } from '@ric-ng/ts-general';
import { IStringToParseMatchingsListOrNull, IStringToParseMatchingOrNull } from "./../types";

import { 
    IPatternDebugInfos,
    IPattern, 
    IStringToParse, 
    IStringToParseMatching, 
    IStringToParseMatchingsList, 
    ILanguageStringToParseMatchingInterpreter
} from "./../interfaces";

import { StringToParseMatchingsList } from '../concreteClasses/StringToParseMatchingsList';



export abstract class APattern implements IPattern {
    
    private static staticDebugInfos: { [key: string]: any } = {
        lastInstanceId:  0
    };

    private static readonly PATTERN_MAX_CONSECUTIVE_MATCHINGS_NUMBER_UNDEFINED_VALUE: number = null;
    private static readonly PATTERN_MAX_CONSECUTIVE_MATCHINGS_NUMBER: number = 50;

    protected debugInfos: IPatternDebugInfos = {
        constructorName: "",
        typeId: null,
        id:  0,
        parentId: null,
        index: null
    };
    protected logger: IStringablesLogger = null;
    
    
    private languageStringToParseMatchingInterpreter: ILanguageStringToParseMatchingInterpreter = null;

    private consecutiveMatchingsMinNumber: number = 1;
    private consecutiveMatchingsMaxNumber: number = APattern.PATTERN_MAX_CONSECUTIVE_MATCHINGS_NUMBER_UNDEFINED_VALUE;

    private stringToParseNextConsecutiveMatchingsOrNull: IStringToParseMatchingsListOrNull = null;


    protected abstract getStringToParseNextMatching(stringToParse: IStringToParse): IStringToParseMatchingOrNull;

    
    constructor() {
        this.debugInfos.id = APattern.staticDebugInfos.lastInstanceId++;
        this.debugInfos.constructorName = this.constructor.name;
        
    }

    setStringablesLogger(stringablesLogger: IStringablesLogger): IPattern {
        this.logger = stringablesLogger;
        return(this);
    }

    setDebugInfosTypeId(debugInfosTypeId: string): IPattern {
        this.debugInfos.typeId = debugInfosTypeId;
        return(this);
    }
    setDebugInfosIndex(debugInfosIndex: string): IPattern {
        this.debugInfos.index = debugInfosIndex;
        return(this);        
    }
    setDebugInfosParentId(debugInfosParentId: number): IPattern {
        this.debugInfos.parentId = debugInfosParentId;
        return(this);         
    }
    getDebugInfos(): IPatternDebugInfos {
        const result: IPatternDebugInfos = Object.assign({
            constructorName: this.debugInfos.constructorName,
            MatchingBounds:`[${this.consecutiveMatchingsMinNumber}, ${this.consecutiveMatchingsMaxNumber}]`
        }, this.debugInfos);
        return(result);
    }
    

    //@return {IStringToParseMatchingsListOrNull}:
    //                                           - null if fails, id est : if the consecutive matchings number is out of range ([min, max]).
    //                                           - an empty list, if there was no matching BUT the minimal number of macthings is also 0.
    listStringToParseNextConsecutiveMatchings(stringToParse: IStringToParse): IStringToParseMatchingsListOrNull {
        this.logger.startBlock();
        this.logger.addLineToLog("*START - listStringToParseNextConsecutiveMatchings():");
        this.logger.addLineToLog(['debugInfos:', this.getDebugInfos()]);

        let stringToParseNextMatchingOrNull: IStringToParseMatchingOrNull;
        
        let nextConsecutiveMatchingsNumber: number = 0;
        let isInvalidConsecutiveMatchingsNumber: boolean = false;

        let isLastMatchingTestOk: boolean;
        let lastMatchingLength: number;
        let mustStopSearchingMatching: boolean = false;
        
        stringToParse.savePointerPosition();
        this.logger.addLineToLog(`save pointer position: ${stringToParse.getPointerPosition()}`);

        this.defineResultAsNull();
        while( !mustStopSearchingMatching && !stringToParse.isPointerAtTheEnd() ) {
            this.logger.addLineSeparatorToLog().addLineToLog([
                `Begin while - stringToParse at pos. ${stringToParse.getPointerPosition()} / ${stringToParse.getMaxPointerPosition()} : `,
                `'${stringToParse.getStringFromPointerPosition(70).replaceCRLFBy()}'...`
            ]);            
            stringToParseNextMatchingOrNull = this.getStringToParseNextMatching(stringToParse);
            isLastMatchingTestOk = ( stringToParseNextMatchingOrNull !== null );

            mustStopSearchingMatching = !isLastMatchingTestOk;
            if (!mustStopSearchingMatching) {
                nextConsecutiveMatchingsNumber++;
                
                isInvalidConsecutiveMatchingsNumber = this.isTooManyConsecutiveMatchings(nextConsecutiveMatchingsNumber);
                mustStopSearchingMatching = isInvalidConsecutiveMatchingsNumber;
                if (!mustStopSearchingMatching) {
                    
                    this.addToResult(stringToParseNextMatchingOrNull);

                    lastMatchingLength = stringToParseNextMatchingOrNull.getTotalLength();
                    stringToParse.incrementPointerPosition(lastMatchingLength);
                    this.logger.addLineToLog([`(in while) - INCREM. pointer position de +${lastMatchingLength} => `+
                                             ` ${stringToParse.getPointerPosition()};`,
                                             'debugInfos:', this.getDebugInfos()
                                             ]);

                    mustStopSearchingMatching = (lastMatchingLength === 0);
                }

            }
        } //While end.
        this.logger.addLineToLog("Exit while");
        this.logger.addLineToLog(['debugInfos:', this.getDebugInfos()]);

        if ( nextConsecutiveMatchingsNumber === 0  &&  !this.isDefinedConsecutiveMatchingsMinNumber() ) {
            this.defineResultAsEmptyList();

        } else {
            if (!isInvalidConsecutiveMatchingsNumber) {
                isInvalidConsecutiveMatchingsNumber = this.isTooLittleConsecutiveMatchings(nextConsecutiveMatchingsNumber);
            }
        }

        if (isInvalidConsecutiveMatchingsNumber) {
            this.defineResultAsNull();
            this.logger.addLineToLog(['RESULT:', null]);

        } else {
            this.logger.addLineToLog(['RESULT:', this.getResult().getDebugInfos()]);
        }
        
        
        this.logger.addLineToLog('*END - listStringToParseNextConsecutiveMatchings');
        this.logger.addLineToLog([
            `consecutiveMatchingsNumber: ${nextConsecutiveMatchingsNumber} (`+
            ((isInvalidConsecutiveMatchingsNumber)? "INVALID!" : "VALID!")+");",
            `pointer at the end: ${stringToParse.isPointerAtTheEnd()} `+
            `(${stringToParse.getPointerPosition()} / ${stringToParse.getMaxPointerPosition()});`,
            `lastMatchingLength: ${lastMatchingLength}`
        ]);
        
        this.logger.addLineToLog(`pointer position before restore: ${stringToParse.getPointerPosition()}`);
        stringToParse.restoreLastSavedPointerPosition();
        this.logger.addLineToLog(`pointer position after restore: ${stringToParse.getPointerPosition()}`);

        this.logger.endBlock(true).addLineSeparatorToLog(2);
        
        return(this.getResult());
    }

    
    private isTooLittleConsecutiveMatchings(consecutiveMatchingsNumber: number): boolean {
        const retour: boolean = ( consecutiveMatchingsNumber < this.consecutiveMatchingsMinNumber );
        return(retour);
    }

    private isTooManyConsecutiveMatchings(consecutiveMatchingsNumber: number): boolean {
        let retour: boolean = false;
        if (this.isDefinedConsecutiveMatchingsMaxNumber()) {
            retour = ( consecutiveMatchingsNumber > this.consecutiveMatchingsMaxNumber );
        }        
        return(retour);
    }

    private getResult(): IStringToParseMatchingsListOrNull {
        return(this.stringToParseNextConsecutiveMatchingsOrNull);
    }
    private defineResultAsNull(): void {
        this.stringToParseNextConsecutiveMatchingsOrNull = null;
    }
    private defineResultAsEmptyList(): void {
        this.stringToParseNextConsecutiveMatchingsOrNull = this.createStringToParseMatchingsList(this);        
    }
    private defineResultAsEmptyListIfNotDefined(): void {
        if (this.stringToParseNextConsecutiveMatchingsOrNull === null) {
            this.defineResultAsEmptyList();
        }
    }    
    private addToResult(stringToParseMatching: IStringToParseMatching): void {
        this.defineResultAsEmptyListIfNotDefined();
        this.stringToParseNextConsecutiveMatchingsOrNull.addStringToParseMatching( stringToParseMatching );

    }
    protected createStringToParseMatchingsList(pattern: IPattern): IStringToParseMatchingsList {
        const retour: IStringToParseMatchingsList = new StringToParseMatchingsList(pattern);
        return(retour);
    }

    

    setConsecutiveMatchingsMinNumber(consecutiveMatchingsMinNumber: number): IPattern {
        this.consecutiveMatchingsMinNumber = consecutiveMatchingsMinNumber;
        this.checkValidConsecutiveMatchingsMinMaxNumbers();
        return (this);
    }
    getConsecutiveMatchingsMinNumber(): number {
        return (this.consecutiveMatchingsMinNumber);
    }

    setConsecutiveMatchingsMaxNumber(consecutiveMatchingsMaxNumber: number): IPattern {
        this.consecutiveMatchingsMaxNumber = consecutiveMatchingsMaxNumber;
        this.checkValidConsecutiveMatchingsMinMaxNumbers();
        return (this);
    }
    getConsecutiveMatchingsMaxNumber(): number {
        return (this.consecutiveMatchingsMaxNumber);
    }
    isDefinedConsecutiveMatchingsMaxNumber(): boolean {
        const result: boolean = (this.consecutiveMatchingsMaxNumber !== APattern.PATTERN_MAX_CONSECUTIVE_MATCHINGS_NUMBER_UNDEFINED_VALUE);
        return (result);
    } 
    isDefinedConsecutiveMatchingsMinNumber(): boolean {
        const result: boolean = (this.consecutiveMatchingsMinNumber > 0);
        return (result);
    }       

    setConsecutiveMatchingsNumbers(
        consecutiveMatchingsMinNumber: number, 
        consecutiveMatchingsMaxNumber: number = APattern.PATTERN_MAX_CONSECUTIVE_MATCHINGS_NUMBER_UNDEFINED_VALUE
    ): IPattern {
        this.setConsecutiveMatchingsMinNumber(consecutiveMatchingsMinNumber);
        this.setConsecutiveMatchingsMaxNumber(consecutiveMatchingsMaxNumber);
        return (this);
    }

    private checkValidConsecutiveMatchingsMinMaxNumbers(): void {
        const ok: boolean = this.testValidConsecutiveMatchingsMinMaxNumbers();
        if (!ok) {
            throw new Error(`Nombre de matchings consécutifs min et/ou max invalide :  `+ 
                            ` min=${this.consecutiveMatchingsMinNumber}  ou  max=${this.consecutiveMatchingsMaxNumber}.`
                           );
        }
    }
    private testValidConsecutiveMatchingsMinMaxNumbers(): boolean {
        let result: boolean = (this.consecutiveMatchingsMinNumber >= 0);

        if (result && this.isDefinedConsecutiveMatchingsMaxNumber()) {
            result = (this.consecutiveMatchingsMaxNumber <= APattern.PATTERN_MAX_CONSECUTIVE_MATCHINGS_NUMBER)
                        &&
                     (this.consecutiveMatchingsMaxNumber >= this.consecutiveMatchingsMinNumber)
                    ;
        }

        return (result);
    }


    setLanguageStringToParseMatchingInterpreter(languageStringToParseMatchingInterpreter: ILanguageStringToParseMatchingInterpreter)
    : IPattern {
        if (languageStringToParseMatchingInterpreter !== null) {
            this.languageStringToParseMatchingInterpreter = languageStringToParseMatchingInterpreter;
        }
        return(this);
    }
    getLanguageStringToParseMatchingInterpreter(): ILanguageStringToParseMatchingInterpreter | null {
        return(this.languageStringToParseMatchingInterpreter);
    }    


}