import { IStringToParseMatchingsListOrNull } from "./../types";
import { IStringToParse, IStringToParseMatchingsList } from "./../interfaces";
import { AOrderedPatternsList } from "./../abstracts";


export class OrderedFullMatchPatternsList extends AOrderedPatternsList {

    protected onBeforeSearchMatchings(stringToParse: IStringToParse): void {
        super.onBeforeSearchMatchings(stringToParse);
        stringToParse.savePointerPosition();
    }    


    protected onPatternElementMatchingSuccess(
        stringToParseMatchingsList: IStringToParseMatchingsList,
        stringToParse: IStringToParse
    ): void {

        super.onPatternElementMatchingSuccess(stringToParseMatchingsList, stringToParse);
        stringToParse.incrementPointerPosition(stringToParseMatchingsList.getTotalLength());
    }

    protected onPatternElementMatchingFail(): void {
console.log(`OrderedFullMatchPatternsList - onPatternElementMatchingFail() : `+
            `(RE)MISE ) NULL du result (this.stringToParseNextMatchingsListOrNull) `);
        this.stringToParseNextMatchingsListOrNull = null;
    }    


    protected mustStopSearchingMatching(stringToParseMatchingsListOrNull: IStringToParseMatchingsListOrNull): boolean {
        const result: boolean = (stringToParseMatchingsListOrNull === null);
        return(result);
    }


    protected onAfterSearchMatchings(stringToParse: IStringToParse): void {
        super.onAfterSearchMatchings(stringToParse);
        stringToParse.restoreLastSavedPointerPosition();
    }

}