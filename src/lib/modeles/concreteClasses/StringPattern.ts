import { IStringComparator, StringComparator } from "@ric-ng/ts-general";

import { IStringPattern, IStringToParse, IStringToParseMatching } from "./../interfaces";
import { StringToParseMatchingsListOrNull } from "./../types";
import { ASimplePattern } from "./../abstracts";


export class StringPattern extends ASimplePattern implements IStringPattern {

    private matchComparator: IStringComparator = null;

    setMatchComparator(matchComparator: IStringComparator): IStringPattern {
        this.matchComparator = matchComparator;
        return(this);
    }
    private getMatchComparator(): IStringComparator {
        if (this.matchComparator === null) {
            this.matchComparator = this.createStringComparator();
        }
        return(this.matchComparator);
    }
    private createStringComparator(): IStringComparator {
        const result: IStringComparator = new StringComparator();
        return(result);
    }

    getStringToParseMatchings(stringToParse: IStringToParse): StringToParseMatchingsListOrNull {
        let result: StringToParseMatchingsListOrNull = null;

        const string: string = this.getString();
        const stringToParseAsString: string = stringToParse.getRemainingStringToParse();
        if ((string !== "") && (stringToParseAsString.length >= string.length)) {

            const stringToParseStart: string = stringToParse.getStringFromPointerPosition(string.length);
            const match: boolean = this.getMatchComparator()
                                    .setCaseSensitivity(this.isCaseSensitivity())
                                    .testEquality(string, stringToParseStart);

            if (match) {
                const stringToParseMatching: IStringToParseMatching = this.createStringToParseMatchingObject(
                    this,
                    stringToParseStart,
                    stringToParse.getPointerPosition()
                );
                result = this.createStringToParseMatchingsList(Array(stringToParseMatching));
            }

        }

        return (result);
    }
}