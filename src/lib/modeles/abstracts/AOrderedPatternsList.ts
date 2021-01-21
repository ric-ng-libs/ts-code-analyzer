import { IStringToParseMatchingOrNull, IStringToParseMatchingsListOrNull } from "./../types";
import { IChildablePattern, IStringToParse } from "./../interfaces";
import { APatternsList } from "./APatternsList";




export abstract class AOrderedPatternsList extends APatternsList {
    private static recursions: number = 0;

    protected abstract mustStopSearchingMatching(stringToParseMatchingsListOrNull: IStringToParseMatchingsListOrNull): boolean;


    getStringToParseNextMatching(stringToParse: IStringToParse): IStringToParseMatchingOrNull {
        this.stringToParseNextMatchingsListOrNull = null;

AOrderedPatternsList.recursions++;       if (AOrderedPatternsList.recursions>900) throw new Error("OVER RECURSIONS !!!");

        this.onBeforeSearchMatchings(stringToParse);

        this.list.each<IStringToParseMatchingsListOrNull>(
            
            (patternElement: IChildablePattern, index: number): IStringToParseMatchingsListOrNull => {
console.log(`\n----- Sur List ${this.constructor.name}): Treating this ElementPattern[${index}] ;`
            +` (Element constructor name: ${patternElement.constructor.name})`);
console.log(patternElement);

                const stringToParseMatchingsListOrNull: IStringToParseMatchingsListOrNull = 
                    patternElement.listStringToParseNextConsecutiveMatchings(stringToParse);

                if (stringToParseMatchingsListOrNull !== null) {
                    this.onPatternElementMatchingSuccess(stringToParseMatchingsListOrNull, stringToParse);

                } else {
                    this.onPatternElementMatchingFail();
                }

                return(stringToParseMatchingsListOrNull);
            },

            (stringToParseMatchingsListOrNull: IStringToParseMatchingsListOrNull): boolean => {
                let breakLoop: boolean;
                breakLoop = this.mustStopSearchingMatching(stringToParseMatchingsListOrNull);
console.log(`breakLoop: ${breakLoop}  (List constructor name: ${this.constructor.name})`);
console.log(`\n\n`);
                return(breakLoop);
            }
        );

        this.onAfterSearchMatchings(stringToParse);

        return(this.stringToParseNextMatchingsListOrNull);
    }


}