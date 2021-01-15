import { StringOrNull } from '@ric-ng/ts-general';

import { IRegExpStringPattern } from "./../interfaces";
import { ASimplePattern } from "./../abstracts";


export class RegExpStringPattern extends ASimplePattern implements IRegExpStringPattern {

    protected getStringToParseMinimalLength(): number {
        const result: number = 1;
        return(result);
    }    

    protected getStringToCompare(stringToParseAsString: string): string {
        const result: string = stringToParseAsString;
        return(result);
    }

    protected getStringToParseMatching(stringToCompare: string): StringOrNull {
        let result: StringOrNull;
        
        const regExp: RegExp = this.getRegExp();
        console.log("RegExp: ", regExp);
        const match: Array<string> = stringToCompare.match(regExp);
        console.log("match: ", match);
        result = ((match !== null) /*&& (match[0].length>0)*/)? match[0] : null;

        return(result);
    }
    

    private getDefaultRegExpOptions(): string {
        const result: string = "g";
        return(result);
    }
    private getRegExpOptions(): string {
        let result: string = this.getDefaultRegExpOptions();
        if (!this.isCaseSensitivity()) {
            result +=  "i";
        }
        return(result);
    }
    private getRegExp(): RegExp {
        const regExpString: string = this.getString();
        console.log(`regExpString: '${regExpString}'`);
        const regExpOptions: string = this.getRegExpOptions();
        const result: RegExp = new RegExp(`^${regExpString}`, regExpOptions);
        return (result);
    }

}
