import { 
    IPattern, 
    IStringPattern,
    IRegExpStringPattern,
    IPatternsList
 } from './../interfaces';

export interface IPatternsFactory {
    
  
    getStringPattern(
        stringPatternAsString: string, 
        consecutiveMatchingsMinNumber?: number,
        consecutiveMatchingsMaxNumber?: number,
        caseSensitivity?: boolean
    ): IStringPattern;

    getRegExpStringPattern(
        regExpStringPatternAsString: string, 
        consecutiveMatchingsMinNumber?: number,
        consecutiveMatchingsMaxNumber?: number,
        caseSensitivity?: boolean
    ): IRegExpStringPattern;


    getOrderedFullMatchPatternsList(
        patterns: Array<IPattern>, 
        consecutiveMatchingsMinNumber?: number,
        consecutiveMatchingsMaxNumber?: number
    ): IPatternsList;
    
    getOrderedOneMatchPatternsList(
        patterns: Array<IPattern>, 
        consecutiveMatchingsMinNumber?: number,
        consecutiveMatchingsMaxNumber?: number
    ): IPatternsList;
    

}