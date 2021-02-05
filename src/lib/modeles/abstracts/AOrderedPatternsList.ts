import { LoggerMessageType } from '@ric-ng/ts-general';

import { IStringToParseMatchingOrNull, IStringToParseMatchingsListOrNull } from "./../types";
import { IPattern, IStringToParse } from "./../interfaces";
import { APatternsList } from "./APatternsList";




export abstract class AOrderedPatternsList extends APatternsList {
    private static recursions: number = 0;

    protected abstract mustStopSearchingMatching(stringToParseMatchingsListOrNull: IStringToParseMatchingsListOrNull): boolean;


    getStringToParseNextMatching(stringToParse: IStringToParse): IStringToParseMatchingOrNull {
        this.stringToParseNextMatchingsListOrNull = null;

AOrderedPatternsList.recursions++;       if (AOrderedPatternsList.recursions>900) throw new Error("OVER RECURSIONS !!!");

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
        this.logger.endBlock();

        this.onAfterSearchMatchings(stringToParse);

        return(this.getSimplifiedResult());
    }

    private isMatching(): boolean {
        const result: boolean = (this.stringToParseNextMatchingsListOrNull !== null);
        return(result);
    }

    private getResultElementsNumber(): number {
        const result: number = (this.isMatching()) ? this.stringToParseNextMatchingsListOrNull.getList().getElementsNumber() : 0;
        return(result);

    }

    private getSimplifiedResult(): IStringToParseMatchingOrNull {
        const resultElementsNumber: number = this.getResultElementsNumber();
        const isMonoElementResult: boolean = (resultElementsNumber === 1);
        const result: IStringToParseMatchingOrNull = 
            (isMonoElementResult) ? 
                this.stringToParseNextMatchingsListOrNull.getList().getElementByIndex(0)
            : 
                this.stringToParseNextMatchingsListOrNull
            ;

        if (isMonoElementResult)  {
            this.logger.addLineToLog([
                result,
                "  instead of  ",
                this.stringToParseNextMatchingsListOrNull,
            ], LoggerMessageType.warning, false);
        }          

        return(result); 
    }
    

}