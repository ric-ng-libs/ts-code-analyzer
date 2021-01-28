import { IStringToParseMatchingsListOrNull } from "./../types";
import { IStringToParse, IStringToParseMatchingsList, IPattern } from "./../interfaces";
import { AOrderedPatternsList } from "./../abstracts";


export class OrderedFullMatchPatternsList extends AOrderedPatternsList {

    protected onBeforeSearchMatchings(stringToParse: IStringToParse): void {
        super.onBeforeSearchMatchings(stringToParse);
        stringToParse.savePointerPosition();
    }    


    protected onPatternElementMatchingSuccess(
        patternElement: IPattern,
        stringToParseMatchingsList: IStringToParseMatchingsList,
        stringToParse: IStringToParse
    ): void {

        super.onPatternElementMatchingSuccess(
            patternElement,
            stringToParseMatchingsList, 
            stringToParse
        );
        stringToParse.incrementPointerPosition(stringToParseMatchingsList.getTotalLength());
    }

    protected onPatternElementMatchingFail(): void {
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