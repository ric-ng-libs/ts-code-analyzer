import { IChildablePattern } from './../interfaces';



export abstract class AStringToParseMatching {
    
    protected asString: string = null;

    protected abstract getAsString(useCache?: boolean): string;


    constructor(
        private pattern: IChildablePattern, 
    ) {

    }

    getPattern(): IChildablePattern {
        return(this.pattern);
    }

    getTotalLength(useCache: boolean = true): number {
        const result: number = this.getAsString(useCache).length;
        return(result);
    }
    
}

