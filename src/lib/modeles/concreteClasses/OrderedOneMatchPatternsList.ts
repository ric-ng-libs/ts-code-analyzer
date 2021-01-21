import { StringToParseMatchingsOrNull } from "./../types";
import { AOrderedPatternsList } from "./../abstracts";

export class OrderedOneMatchPatternsList extends AOrderedPatternsList {

    protected mustStopSearchingMatching(stringToParseMatchings: StringToParseMatchingsOrNull): boolean {
        const result: boolean = (stringToParseMatchings !== null);
        return(result);
    }
    
}