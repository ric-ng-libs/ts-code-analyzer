import { IRegExpStringPattern, IStringToParse, IStringToParseMatching } from "./../interfaces";
import { StringToParseMatchingsListOrNull } from "./../types";
import { ASimplePattern } from "./../abstracts";


export class RegExpStringPattern extends ASimplePattern implements IRegExpStringPattern {

    getStringToParseMatchings(stringToParse: IStringToParse): StringToParseMatchingsListOrNull {
        let result: StringToParseMatchingsListOrNull = null;

        const string: string = this.getString();
        const stringToParseAsString: string = stringToParse.getRemainingStringToParse();
        if ((string !== "") && (stringToParseAsString.length > 0)) {

            const regExp: RegExp = this.getRegExp();
            console.log(`${stringToParseAsString}`);
            console.log(regExp);
            const match: Array<string> = stringToParseAsString.match(regExp);
            console.log(match);

            if (match !== null) {
                const stringToParseMatching: IStringToParseMatching = this.createStringToParseMatchingObject(
                    this,
                    match[0],
                    stringToParse.getPointerPosition()
                );
                result = this.createStringToParseMatchingsList(Array(stringToParseMatching));
            }            

        }

        return (result);
    }

    private getRegExp(): RegExp {
        let regExpOption: string = (this.isCaseSensitivity()) ? "" : "i";
        regExpOption += "g";
        const regExpString: string = this.getString();
        console.log(regExpString);
        const result: RegExp = new RegExp(`^${regExpString}`, regExpOption);
        return (result);
    }

}
