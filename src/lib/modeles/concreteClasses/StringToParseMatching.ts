import { IPattern, IStringToParseMatching } from "./../interfaces";


export class StringToParseMatching implements IStringToParseMatching {

    constructor(
        private masterPattern: IPattern,
        private pattern: IPattern, 
        private stringToParseMatching: string,
        private stringToParsePointerPosition: number
    ) {

    }

    getMasterPattern(): IPattern {
        return(this.masterPattern);
    }    
    getPattern(): IPattern {
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