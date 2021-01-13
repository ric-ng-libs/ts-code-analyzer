import { IStringToParse } from "./../interfaces";
import { StringToParseMatchingsListOrNull } from "./../types";
import { AOrderedPatternsList } from "./../abstracts";

export class OrderedFullMatchPatternsList extends AOrderedPatternsList {

    protected onBeforeSearchMatchings(stringToParse: IStringToParse): void {
        super.onBeforeSearchMatchings(stringToParse);
        stringToParse.savePointerPosition();
    }    

    protected onMatchingSuccess(
        stringToParseMatchings: StringToParseMatchingsListOrNull,
        stringToParse: IStringToParse
    ): void {

        super.onMatchingSuccess(stringToParseMatchings, stringToParse);
        stringToParse.incrementPointerPosition(stringToParseMatchings.getTotalLength());
    }

    protected mustStopSearchingMatching(stringToParseMatchings: StringToParseMatchingsListOrNull): boolean {
        const result: boolean = (stringToParseMatchings === null);
        return(result);
    }

    protected onAfterSearchMatchings(stringToParse: IStringToParse): void {
        super.onAfterSearchMatchings(stringToParse);
        stringToParse.restoreLastSavedPointerPosition();
    }

}