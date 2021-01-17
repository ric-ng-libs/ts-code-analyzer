import { IChildablePattern, IStringToParseMatching } from "./../interfaces";


export class StringToParseMatching implements IStringToParseMatching {

    constructor(
        private pattern: IChildablePattern, 
        private stringToParseMatching: string,
        private stringToParsePointerPosition: number
    ) {

    }

    getPattern(): IChildablePattern {
        return(this.pattern);
    }
    
    getStringToParseMatching(): string {
        return(this.stringToParseMatching);
    }
    getStringToParseMatchingLength(): number {
        return(this.getStringToParseMatching().length);
    }    
    getStringToParsePointerPosition(): number {
        return(this.stringToParsePointerPosition);
    }

}