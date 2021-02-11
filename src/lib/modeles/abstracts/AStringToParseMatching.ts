import { StringOrNull, NumberOrNull } from '@ric-ng/ts-general';

import { 
    IPattern, 
    IStringToParseMatching,
    ILanguageStringToParseMatchingInterpreter,

    IStringToParseMatchingDebugInfos
} from './../interfaces';



export abstract class AStringToParseMatching implements IStringToParseMatching {

    private static lastId: number = 0;
    public _id: number = null;
 
    protected asString: StringOrNull = null;


    abstract getAsString(useCache?: boolean): StringOrNull;
    abstract getPointerPosition(): NumberOrNull;

    
    getDebugInfos(): IStringToParseMatchingDebugInfos {
        let asString: StringOrNull = this.getAsString();
        if (asString !== null) {
            asString = asString.replaceCRLFBy();
        }
        const matchingPattern: IPattern = this.getPattern();
        const result: IStringToParseMatchingDebugInfos = {
            constructorName: this.constructor.name,
            ...this.otherDebugInfos,   
            matchingPatternType: matchingPattern.constructor.name,
            matchingString: asString,
            matchingPattern: matchingPattern.getDebugInfos(),
            subMatchings: null, 
            matchingAtPosition: this.getPointerPosition(),
            matchingTotalLength: this.getTotalLength(), 
            _id: this._id
        };
        
        return(result);
    }

    constructor(
        private pattern: IPattern, 
        protected otherDebugInfos: object = null
    ) {
        this._id = AStringToParseMatching.lastId++;
        this.otherDebugInfos = otherDebugInfos || {};
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

