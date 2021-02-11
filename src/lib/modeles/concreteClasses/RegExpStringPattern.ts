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
        const matchResult: Array<string> = stringToCompare.match(regExp);

        const match: boolean = (matchResult !== null) /*&& (match[0].length>0)*/;
        result = (match)? matchResult[0] : null;

        this.logger.addLineToLog([
            `  matching : ${match};`,
            `RegExpStringPattern ('^${this.getString()}'/(${this.getRegExpOptions()})): '${regExp}';`,
            `stringToCompare : '${stringToCompare.substr(0,35).replaceCRLFBy()}'... (${stringToCompare.length});`,
            `matchResult : `+((match)? `['${matchResult.join("',")}']` : `null`)+';',
            `=> compare result : ${(result!==null)? "'"+result.replaceCRLFBy()+"'" : null};`,            
            `caseSensitive: ${this.isCaseSensitivity()}`
        ]);        

        return(result);
    }
    

    private getDefaultRegExpOptions(): string {
        const result: string = ""; //"g";
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
        const regExpOptions: string = this.getRegExpOptions();
        const result: RegExp = new RegExp(`^${regExpString}`, regExpOptions);
        return (result);
    }

}
