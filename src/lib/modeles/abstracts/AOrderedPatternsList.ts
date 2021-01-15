import { IPattern, IStringToParse } from "./../interfaces";
import { StringToParseMatchingsListOrNull } from "./../types";
import { APatternsList } from "./APatternsList";




export abstract class AOrderedPatternsList extends APatternsList {
    
    protected abstract mustStopSearchingMatching(stringToParseMatchings: StringToParseMatchingsListOrNull): boolean;
    

    listStringToParseNextMatchings(stringToParse: IStringToParse): StringToParseMatchingsListOrNull {

        this.onBeforeSearchMatchings(stringToParse);

        this.list.each<StringToParseMatchingsListOrNull>(
            
            (patternElement: IPattern): StringToParseMatchingsListOrNull => {
                console.log(`\n----- Treating this Element Pattern (constructor name: ${this.constructor.name})`);
                console.log(patternElement);

                const stringToParseMatchings: StringToParseMatchingsListOrNull = 
                    patternElement.listStringToParseNextConsecutiveMatchings(stringToParse);

                if (stringToParseMatchings !== null) {
                    this.onPatternElementMatchingSuccess(stringToParseMatchings, stringToParse);

                }

                return(stringToParseMatchings);
            },

            (stringToParseMatchings: StringToParseMatchingsListOrNull): boolean => {
                let breakLoop: boolean;
                breakLoop = this.mustStopSearchingMatching(stringToParseMatchings);
                console.log(`breakLoop: ${breakLoop}`);
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


    protected onBeforeSearchMatchings(stringToParse: IStringToParse): void {
    }
    protected onAfterSearchMatchings(stringToParse: IStringToParse): void {
    } 
    
    
    private addStringToParseMatchingsToList(stringToParseMatchings: StringToParseMatchingsListOrNull): void {
        this.defineStringToParseNextMatchingsListIfNotDefined();
        this.stringToParseNextMatchingsListOrNull.addElementsFromList( stringToParseMatchings );      

    }

}