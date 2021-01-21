import { IStringToParseMatchingsListOrNull } from "./../types";
import { AOrderedPatternsList } from "./../abstracts";

export class OrderedOneMatchPatternsList extends AOrderedPatternsList {

    protected mustStopSearchingMatching(stringToParseMatchingsListOrNull: IStringToParseMatchingsListOrNull): boolean {
        const result: boolean = (stringToParseMatchingsListOrNull !== null);
        return(result);
    }
    
}