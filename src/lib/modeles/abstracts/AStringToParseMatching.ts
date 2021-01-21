import { StringOrNull } from '@ric-ng/ts-general';

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
        const asString: StringOrNull = this.getAsString(useCache);
        const result: number = (asString !== null)? asString.length : 0;
        return(result);
    }
    
}

