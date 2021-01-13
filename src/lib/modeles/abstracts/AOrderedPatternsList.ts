import { IPattern, IStringToParse, IStringToParseMatchingsList } from "./../interfaces";
import { StringToParseMatchingsListOrNull } from "./../types";
import { APatternsList } from "./APatternsList";




export abstract class AOrderedPatternsList extends APatternsList {
    
    protected abstract mustStopSearchingMatching(stringToParseMatchings: StringToParseMatchingsListOrNull): boolean;

    getStringToParseMatchings(stringToParse: IStringToParse): StringToParseMatchingsListOrNull {
        let result: StringToParseMatchingsListOrNull = null;

        this.list.each<StringToParseMatchingsListOrNull>(
            
            (pattern: IPattern): StringToParseMatchingsListOrNull => {
                const stringToParseMatchings: StringToParseMatchingsListOrNull = 
                    pattern.getStringToParseMatchings(stringToParse);

                if (stringToParseMatchings !== null) {
                    if (result === null) {
                        result =this.createStringToParseMatchingsList();
                    }
                    
                    result.addElementsFromList( stringToParseMatchings );

                    stringToParse.incrementPointerPosition(stringToParseMatchings.getTotalLength());

                } else {
                    if (!stringToParse.isPointerAtTheEnd()) {
                        stringToParse.incrementPointerPosition(1);
                    }
                }

                return(stringToParseMatchings);
            },

            (stringToParseMatchings: StringToParseMatchingsListOrNull): boolean => {
                let breakLoopCondition: boolean;
                breakLoopCondition = this.mustStopSearchingMatching(stringToParseMatchings);
                return(breakLoopCondition);
            }
        );

        return(result);
    }

}