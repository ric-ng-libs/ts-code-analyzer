import { StringToParseMatchingsListOrNull } from "./../types";
import { AOrderedPatternsList } from "./../abstracts";

export class OrderedOneMatchPatternsList extends AOrderedPatternsList {
    mustStopSearchingMatching(stringToParseMatchings: StringToParseMatchingsListOrNull): boolean {
        const result: boolean = (stringToParseMatchings !== null);
        return(result);
    }
}