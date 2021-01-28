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

    private debugInfos: IPatternDebugInfos = {
        id:  0,
        typeId: null,
        indice: null
    };
    
    
    private languageStringToParseMatchingInterpreter: ILanguageStringToParseMatchingInterpreter = null;

    private consecutiveMatchingsMinNumber: number = 1;
    private consecutiveMatchingsMaxNumber: number = APattern.PATTERN_MAX_CONSECUTIVE_MATCHINGS_NUMBER_UNDEFINED_VALUE;

    private stringToParseNextConsecutiveMatchingsOrNull: IStringToParseMatchingsListOrNull = null;


    protected abstract getStringToParseNextMatching(stringToParse: IStringToParse): IStringToParseMatchingOrNull;

    
    constructor() {
        this.debugInfos.id = APattern.staticDebugInfos.lastInstanceId++;
    }

    setDebugInfosTypeId(debugInfosTypeId: string): IPattern {
        this.debugInfos.typeId = debugInfosTypeId;
        return(this);
    }
    getDebugInfos(): IPatternDebugInfos {
        return(this.debugInfos);
    }      
    

    //@return {IStringToParseMatchingsListOrNull}:
    //                                           - null if fails, id est : if the consecutive matchings number is out of range ([min, max]).
    //                                           - an empty list, if there was no matching BUT the minimal number of macthings is also 0.
    listStringToParseNextConsecutiveMatchings(stringToParse: IStringToParse): IStringToParseMatchingsListOrNull {
        const pattern: IPattern = this;
        let stringToParseNextMatchingOrNull: IStringToParseMatchingOrNull;
        
        let nextConsecutiveMatchingsNumber: number = 0;
        let isInvalidConsecutiveMatchingsNumber: boolean = false;

        let isLastMatchingTestOk: boolean;
        let lastMatchingLength: number;
        let mustStopSearchingMatching: boolean = false;
        
        stringToParse.savePointerPosition();

        this.defineResultAsNull();
        while( !mustStopSearchingMatching && !stringToParse.isPointerAtTheEnd() ) {
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
                    mustStopSearchingMatching = (lastMatchingLength === 0);
                }

            }
        } //While end.

        if ( nextConsecutiveMatchingsNumber === 0  &&  !this.isDefinedConsecutiveMatchingsMinNumber() ) {
            this.defineResultAsEmptyList();

        } else {
            if (!isInvalidConsecutiveMatchingsNumber) {
                isInvalidConsecutiveMatchingsNumber = this.isTooLittleConsecutiveMatchings(nextConsecutiveMatchingsNumber);
            }
        }

        if (isInvalidConsecutiveMatchingsNumber) {
            this.defineResultAsNull();
        }
        
        stringToParse.restoreLastSavedPointerPosition();

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
        console.log(`\n\n\n* addStringToParseMatching de `, stringToParseMatching, 'à', this.stringToParseNextConsecutiveMatchingsOrNull);
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