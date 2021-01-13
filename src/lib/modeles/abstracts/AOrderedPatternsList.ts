import { IPattern, IStringToParse } from "./../interfaces";
import { StringToParseMatchingsListOrNull } from "./../types";
import { APatternsList } from "./APatternsList";




export abstract class AOrderedPatternsList extends APatternsList {
    
    private stringToParseMatchingsListOrNull: StringToParseMatchingsListOrNull; 

    protected abstract mustStopSearchingMatching(stringToParseMatchings: StringToParseMatchingsListOrNull): boolean;
    

    getStringToParseMatchings(stringToParse: IStringToParse): StringToParseMatchingsListOrNull {

        this.onBeforeSearchMatchings(stringToParse);

        this.list.each<StringToParseMatchingsListOrNull>(
            
            (pattern: IPattern): StringToParseMatchingsListOrNull => {
                const stringToParseMatchings: StringToParseMatchingsListOrNull = 
                    pattern.getStringToParseMatchings(stringToParse);

                if (stringToParseMatchings !== null) {
                    this.onMatchingSuccess(stringToParseMatchings, stringToParse);

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


    protected onMatchingSuccess(
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
        if (this.stringToParseMatchingsListOrNull === null) {
            this.stringToParseMatchingsListOrNull =this.createStringToParseMatchingsList();
        }
        
        this.stringToParseMatchingsListOrNull.addElementsFromList( stringToParseMatchings );      
    }
    

}