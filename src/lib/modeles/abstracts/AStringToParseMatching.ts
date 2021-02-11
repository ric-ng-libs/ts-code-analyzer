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

    private otherDebugInfosAddedFromFunc: string = null;

    abstract getAsString(useCache?: boolean): StringOrNull;
    abstract getPointerPosition(): NumberOrNull;

    setDebugInfosAddedFromFunc(addedFromFunc: string): IStringToParseMatching {
        this.otherDebugInfosAddedFromFunc = addedFromFunc;
        return(this);
    }
    getDebugInfos(): IStringToParseMatchingDebugInfos {
        let asString: StringOrNull = this.getAsString();
        if (asString !== null) {
            asString = asString.replaceCRLFBy();
        }
        const matchingPattern: IPattern = this.getPattern();
        const result: IStringToParseMatchingDebugInfos = {
            constructorName: this.constructor.name,    
            addedFromFunc: this.otherDebugInfosAddedFromFunc, 
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

