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
    private patternConsecutiveMatchingsNumber: number = null;

    abstract getAsString(useCache?: boolean): StringOrNull;
    abstract getPointerPosition(): NumberOrNull;


    getDebugInfos(): IStringToParseMatchingDebugInfos {
        let asString: StringOrNull = this.getAsString();
        if (asString !== null) {
            asString = asString.replaceCRLFBy();
        }
        const result: IStringToParseMatchingDebugInfos = {
            patternConsecutiveMatchingsNumber: this.patternConsecutiveMatchingsNumber,
            matchingString: asString,
            matchingPattern: this.getPattern().getDebugInfos(),
            matchingAtPosition: this.getPointerPosition(),
            matchingTotalLength: this.getTotalLength(), 
            subMatchings: null, 
            constructorName: this.constructor.name,     
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

    setPatternConsecutiveMatchingsNumber(patternConsecutiveMatchingsNumber: number): IStringToParseMatching {
        this.patternConsecutiveMatchingsNumber = patternConsecutiveMatchingsNumber;
        return(this);
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

