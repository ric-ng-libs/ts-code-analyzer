import { IStringComparator, StringComparator, StringOrNull } from "@ric-ng/ts-general";

import { IStringPattern } from "./../interfaces";
import { ASimplePattern } from "./../abstracts";


export class StringPattern extends ASimplePattern implements IStringPattern {

    private matchComparator: IStringComparator = null;


    protected getStringToParseMinimalLength(): number {
        const string: string = this.getString();
        const result: number = string.length;
        return(result);
    }

    protected getStringToCompare(stringToParseAsString: string): string {
        const string: string = this.getString();
        const result: string = stringToParseAsString.substr(0, string.length);
        return(result);
    }    

    protected getStringToParseMatching(stringToCompare: string): StringOrNull {
        let result: StringOrNull;
        
        const string: string = this.getString();
        const match: boolean = this.getMatchComparator()
                               .setCaseSensitivity(this.isCaseSensitivity())
                               .testEquality(string, stringToCompare);

        result = (match)? stringToCompare : null;
        console.log( `StringPattern match: ${match}; result=${result}` );

        return(result);
    }    


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

}