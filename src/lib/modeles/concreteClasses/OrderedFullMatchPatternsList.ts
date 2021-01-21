import { IStringToParse } from "./../interfaces";
import { StringToParseMatchingsOrNull } from "./../types";
import { AOrderedPatternsList } from "./../abstracts";

export class OrderedFullMatchPatternsList extends AOrderedPatternsList {

    protected onBeforeSearchMatchings(stringToParse: IStringToParse): void {
        super.onBeforeSearchMatchings(stringToParse);
        stringToParse.savePointerPosition();
    }    

    protected onPatternElementMatchingSuccess(
        stringToParseMatchings: StringToParseMatchingsOrNull,
        stringToParse: IStringToParse
    ): void {

        super.onPatternElementMatchingSuccess(stringToParseMatchings, stringToParse);
        stringToParse.incrementPointerPosition(stringToParseMatchings.getTotalLength());
    }

    protected onPatternElementMatchingFail(): void {
        console.log(`OrderedFullMatchPatternsList - onPatternElementMatchingFail() : `+
                    `(RE)MISE ) NULL du result (this.stringToParseNextMatchingsListOrNull) `);
        this.stringToParseNextMatchingsOrNull = null;
    }    

    protected mustStopSearchingMatching(stringToParseMatchings: StringToParseMatchingsOrNull): boolean {
        const result: boolean = (stringToParseMatchings === null);
        return(result);
    }

    protected onAfterSearchMatchings(stringToParse: IStringToParse): void {
        super.onAfterSearchMatchings(stringToParse);
        stringToParse.restoreLastSavedPointerPosition();
    }

}