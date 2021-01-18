import { IChildablePattern, IStringToParse } from "./../interfaces";
import { StringToParseMatchingsListOrNull } from "./../types";
import { APatternsList } from "./APatternsList";




export abstract class AOrderedPatternsList extends APatternsList {
    private static recursions: number = 0;

    protected abstract mustStopSearchingMatching(stringToParseMatchings: StringToParseMatchingsListOrNull): boolean;


    listStringToParseNextMatchings(stringToParse: IStringToParse): StringToParseMatchingsListOrNull {
         AOrderedPatternsList.recursions++;       if (AOrderedPatternsList.recursions>900) throw new Error("OVER RECURSIONS !!!");

        this.onBeforeSearchMatchings(stringToParse);

        this.list.each<StringToParseMatchingsListOrNull>(
            
            (patternElement: IChildablePattern, index: number): StringToParseMatchingsListOrNull => {
                console.log(`\n----- Sur List ${this.constructor.name}): Treating this ElementPattern[${index}] ; (Element constructor name: ${patternElement.constructor.name})`);
                console.log(patternElement);

                const stringToParseMatchings: StringToParseMatchingsListOrNull = 
                    patternElement.listStringToParseNextConsecutiveMatchings(stringToParse);

                if (stringToParseMatchings !== null) {
                    this.onPatternElementMatchingSuccess(stringToParseMatchings, stringToParse);

                } else {
                    this.onPatternElementMatchingFail();
                }

                return(stringToParseMatchings);
            },

            (stringToParseMatchings: StringToParseMatchingsListOrNull): boolean => {
                let breakLoop: boolean;
                breakLoop = this.mustStopSearchingMatching(stringToParseMatchings);
                console.log(`breakLoop: ${breakLoop}  (List constructor name: ${this.constructor.name})`);
                console.log(`\n\n`);
                return(breakLoop);
            }
        );

        this.onAfterSearchMatchings(stringToParse);

        return(this.stringToParseNextMatchingsListOrNull);
    }


    protected onPatternElementMatchingSuccess(
        stringToParseMatchings: StringToParseMatchingsListOrNull,
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
    
    
    private addStringToParseMatchingsToList(stringToParseMatchings: StringToParseMatchingsListOrNull): void {
        this.defineStringToParseNextMatchingsListIfNotDefined();
        this.stringToParseNextMatchingsListOrNull.addElementsFromList( stringToParseMatchings );      

    }

}