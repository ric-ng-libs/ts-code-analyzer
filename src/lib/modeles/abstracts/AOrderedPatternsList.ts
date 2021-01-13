import { IPattern, IStringToParse } from "./../interfaces";
import { StringToParseMatchingsListOrNull } from "./../types";
import { APatternsList } from "./APatternsList";




export abstract class AOrderedPatternsList extends APatternsList {
    
    protected abstract mustStopSearchingMatching(stringToParseMatchings: StringToParseMatchingsListOrNull): boolean;
    

    getStringToParseMatchings(stringToParse: IStringToParse): StringToParseMatchingsListOrNull {

        this.onBeforeSearchMatchings(stringToParse);

        this.list.each<StringToParseMatchingsListOrNull>(
            
            (patternElement: IPattern): StringToParseMatchingsListOrNull => {
                const stringToParseMatchings: StringToParseMatchingsListOrNull = 
                    patternElement.getStringToParseMatchings(stringToParse);

                if (stringToParseMatchings !== null) {
                    this.onPatternElementMatchingSuccess(stringToParseMatchings, stringToParse);

                }

                return(stringToParseMatchings);
            },

            (stringToParseMatchings: StringToParseMatchingsListOrNull): boolean => {
                let breakLoop: boolean;
                breakLoop = this.mustStopSearchingMatching(stringToParseMatchings);
                return(breakLoop);
            }
        );

        this.onAfterSearchMatchings(stringToParse);

        return(this.stringToParseMatchingsListOrNull);
    }


    protected onPatternElementMatchingSuccess(
        stringToParseMatchings: StringToParseMatchingsListOrNull,
        stringToParse: IStringToParse
    ): void {
        this.addStringToParseMatchingsToList(stringToParseMatchings);

    }


    protected onBeforeSearchMatchings(stringToParse: IStringToParse): void {
        this.stringToParseMatchingsListOrNull = null;
    }
    protected onAfterSearchMatchings(stringToParse: IStringToParse): void {
        
    } 
    
    
    private addStringToParseMatchingsToList(stringToParseMatchings: StringToParseMatchingsListOrNull): void {
        this.defineStringToParseMatchingsListIfNotDefined();
        this.stringToParseMatchingsListOrNull.addElementsFromList( stringToParseMatchings );      

    }
    

}