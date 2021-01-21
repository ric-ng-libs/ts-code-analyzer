import { IChildablePattern, IStringToParse } from "./../interfaces";
import { StringToParseMatchingsListOrNull, StringToParseMatchingsOrNull } from "./../types";
import { APatternsList } from "./APatternsList";




export abstract class AOrderedPatternsList extends APatternsList {
    private static recursions: number = 0;

    protected abstract mustStopSearchingMatching(stringToParseMatchings: StringToParseMatchingsOrNull): boolean;


    listStringToParseNextMatchings(stringToParse: IStringToParse): StringToParseMatchingsOrNull {
         AOrderedPatternsList.recursions++;       if (AOrderedPatternsList.recursions>900) throw new Error("OVER RECURSIONS !!!");

        this.onBeforeSearchMatchings(stringToParse);

        this.list.each<StringToParseMatchingsOrNull>(
            
            (patternElement: IChildablePattern, index: number): StringToParseMatchingsOrNull => {
                console.log(`\n----- Sur List ${this.constructor.name}): Treating this ElementPattern[${index}] ;`
                            +` (Element constructor name: ${patternElement.constructor.name})`);
                console.log(patternElement);

                const stringToParseMatchings: StringToParseMatchingsOrNull = 
                    patternElement.listStringToParseNextConsecutiveMatchings(stringToParse);

                if (stringToParseMatchings !== null) {
                    this.onPatternElementMatchingSuccess(stringToParseMatchings, stringToParse);

                } else {
                    this.onPatternElementMatchingFail();
                }

                return(stringToParseMatchings);
            },

            (stringToParseMatchings: StringToParseMatchingsOrNull): boolean => {
                let breakLoop: boolean;
                breakLoop = this.mustStopSearchingMatching(stringToParseMatchings);
                console.log(`breakLoop: ${breakLoop}  (List constructor name: ${this.constructor.name})`);
                console.log(`\n\n`);
                return(breakLoop);
            }
        );

        this.onAfterSearchMatchings(stringToParse);

        return(this.stringToParseNextMatchingsOrNull);
    }


    protected onPatternElementMatchingSuccess(
        stringToParseMatchings: StringToParseMatchingsOrNull,
        stringToParse: IStringToParse
    ): void {
        this.addStringToParseMatchingsToList(stringToParseMatchings);

    }

    protected onPatternElementMatchingFail(): void {

    }


    protected onBeforeSearchMatchings(stringToParse: IStringToParse): void {
    }
    protected onAfterSearchMatchings(stringToParse: IStringToParse): void {
    } 
    
    
    private addStringToParseMatchingsToList(stringToParseMatchings: StringToParseMatchingsOrNull): void {
        this.defineStringToParseNextMatchingsListIfNotDefined();
        this.stringToParseNextMatchingsOrNull.( stringToParseMatchings );      

    }

    protected defineStringToParseNextMatchingsListIfNotDefined(): void {
        if (this.stringToParseNextMatchingsOrNull === null) {
            this.stringToParseNextMatchingsOrNull = this.createStringToParseMatchingsList();
        }

    }    

}