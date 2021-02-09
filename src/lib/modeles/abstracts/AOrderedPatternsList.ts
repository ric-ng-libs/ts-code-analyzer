import { LoggerMessageType } from '@ric-ng/ts-general';

import { IStringToParseMatchingOrNull, IStringToParseMatchingsListOrNull } from "./../types";
import { IPattern, IStringToParse } from "./../interfaces";
import { APatternsList } from "./APatternsList";




export abstract class AOrderedPatternsList extends APatternsList {
    private static recursions: number = 0;

    protected abstract mustStopSearchingMatching(stringToParseMatchingsListOrNull: IStringToParseMatchingsListOrNull): boolean;


    getStringToParseNextMatching(stringToParse: IStringToParse): IStringToParseMatchingOrNull {
        this.stringToParseNextMatchingsListOrNull = null;

AOrderedPatternsList.recursions++;       if (AOrderedPatternsList.recursions>9000) throw new Error("OVER RECURSIONS !!!");

        this.onBeforeSearchMatchings(stringToParse);

        this.logger.startBlock();
        this.logger.addLineToLog([`Start list.each;`,
                                  'debugInfos:', this.getDebugInfos()
                                 ]);
        this.list.each<IStringToParseMatchingsListOrNull>(
            
            (patternElement: IPattern, index: number): IStringToParseMatchingsListOrNull => {

                
                this.logger.addLineToLog(`(in each) - patternElement[${index}]`);
                
                const stringToParseNextMatchingsListOrNull: IStringToParseMatchingsListOrNull = 
                    patternElement.setStringablesLogger(this.logger).listStringToParseNextConsecutiveMatchings(stringToParse);
                    
                if (stringToParseNextMatchingsListOrNull !== null) {
                    this.onPatternElementMatchingSuccess(
                        patternElement,
                        stringToParseNextMatchingsListOrNull, 
                        stringToParse
                    );

                } else {
                    this.onPatternElementMatchingFail();

                }

                return(stringToParseNextMatchingsListOrNull);
            },

            (stringToParseNextMatchingsListOrNull: IStringToParseMatchingsListOrNull): boolean => {
                let breakLoop: boolean;
                breakLoop = this.mustStopSearchingMatching(stringToParseNextMatchingsListOrNull);
                this.logger.addLineToLog(`break eachLoop: ${breakLoop}`);
                return(breakLoop);
            }
        );
        this.logger.addLineToLog([`End list.each;`,
                                  'debugInfos:', this.getDebugInfos()        
                                 ]);
        this.logger.addLineToLog(['raw RESULT:', (this.isMatching())? this.getRawResult().getDebugInfos() : null]);
        this.logger.addLineToLog(['           ', "For current pattern: ", this.getDebugInfos()]);         
        this.logger.endBlock();

        this.onAfterSearchMatchings(stringToParse);



        // return(this.getSimplifiedResult()); // More readable result BUT doesn't comply to the hierachy of the patterns, 
                                               // and also, the consecutiveMatchingsNumber member, may not have the appropiate value.
        return(this.getRawResult());
    }

    private getRawResult(): IStringToParseMatchingOrNull {
        return(this.stringToParseNextMatchingsListOrNull);
    }    

    // private getSimplifiedResult(): IStringToParseMatchingOrNull {
    //     const resultElementsNumber: number = this.getRawResultElementsNumber();
    //     const isMonoElementResult: boolean = (resultElementsNumber === 1);
    //     const result: IStringToParseMatchingOrNull = 
    //         (isMonoElementResult) ? 
    //             this.stringToParseNextMatchingsListOrNull.getList().getElementByIndex(0)
    //         : 
    //             this.getRawResult()
    //         ;

    //     // if (isMonoElementResult)  {
    //     //     this.logger.addLineToLog([
    //     //         result,
    //     //         "  instead of  ",
    //     //         this.getRawResult(),
    //     //     ], LoggerMessageType.warning, false);
    //     // }          

    //     return(result); 
    // }


    private isMatching(): boolean {
        const result: boolean = (this.getRawResult() !== null);
        return(result);
    }

    // private getRawResultElementsNumber(): number {
    //     const result: number = (this.isMatching()) ? this.stringToParseNextMatchingsListOrNull.getList().getElementsNumber() : 0;
    //     return(result);

    // }
    

}