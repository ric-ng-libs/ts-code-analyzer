import { StringOrNull, NumberOrNull } from '@ric-ng/ts-general';

import { 
    IPattern, 
    IStringToParseMatching,
    ILanguageStringToParseMatchingInterpreter
} from './../interfaces';



export abstract class AStringToParseMatching implements IStringToParseMatching {

private static lastId: number = 0;
public _id: number = null;
 
    protected asString: StringOrNull = null;

    abstract getAsString(useCache?: boolean): StringOrNull;
    abstract getPointerPosition(): NumberOrNull;


    constructor(
        private pattern: IPattern, 
    ) {
        this._id = AStringToParseMatching.lastId++;
    }

    getPattern(): IPattern {
        return(this.pattern);
    }

    getTotalLength(useCache: boolean = true): NumberOrNull {
        const asString: StringOrNull = this.getAsString(useCache);
        const result: number = (asString !== null)? asString.length : 0;
        return(result);
    }
    

    interpret(): IStringToParseMatching {
        const languageStringToParseMatchingInterpreter: ILanguageStringToParseMatchingInterpreter = 
            this.getPattern().getLanguageStringToParseMatchingInterpreter();

        if (languageStringToParseMatchingInterpreter !== null) {
            languageStringToParseMatchingInterpreter.interpret(this);
        }
        
        return(this);
    }    
}

