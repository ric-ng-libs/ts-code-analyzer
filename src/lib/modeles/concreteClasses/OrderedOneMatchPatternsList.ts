import { StringToParseMatchingsListOrNull } from "./../types";
import { AOrderedPatternsList } from "./../abstracts";

export class OrderedOneMatchPatternsList extends AOrderedPatternsList {

    protected mustStopSearchingMatching(stringToParseMatchings: StringToParseMatchingsListOrNull): boolean {
        const result: boolean = (stringToParseMatchings !== null);
        return(result);
    }
    
}