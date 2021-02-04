import { 
    IPattern, 
    IPatternsFactory,
    IStringPattern,
    IRegExpStringPattern,
    IPatternsList
 } from './../interfaces';

import { StringPattern } from './StringPattern';
import { RegExpStringPattern } from './RegExpStringPattern';
import { OrderedFullMatchPatternsList } from './OrderedFullMatchPatternsList';
import { OrderedOneMatchPatternsList } from './OrderedOneMatchPatternsList';


export class PatternsFactory implements IPatternsFactory {
    
    getStringPattern(
        stringPatternAsString: string, 
        consecutiveMatchingsMinNumber: number = 1,
        consecutiveMatchingsMaxNumber: number = null,
        caseSensitivity: boolean = true
    ): IStringPattern {
        const result: StringPattern = this.createStringPattern(stringPatternAsString, caseSensitivity);
        
        result.setConsecutiveMatchingsMinNumber(consecutiveMatchingsMinNumber);

        if (consecutiveMatchingsMaxNumber !== null) {
            result.setConsecutiveMatchingsMaxNumber(consecutiveMatchingsMaxNumber);
        }

        return(result);
    }
    private createStringPattern(stringPatternAsString: string, caseSensitivity: boolean): StringPattern {
        const result: StringPattern = new StringPattern(stringPatternAsString, caseSensitivity);
        return(result);
    }


    getRegExpStringPattern(
        regExpStringPatternAsString: string, 
        consecutiveMatchingsMinNumber: number = 1,
        consecutiveMatchingsMaxNumber: number = null,
        caseSensitivity: boolean = true
    ): IRegExpStringPattern {
        const result: RegExpStringPattern = this.createRegExpStringPattern(regExpStringPatternAsString, caseSensitivity);
        
        result.setConsecutiveMatchingsMinNumber(consecutiveMatchingsMinNumber);
        result.setConsecutiveMatchingsMaxNumber(consecutiveMatchingsMaxNumber);

        return(result);
    }
    private createRegExpStringPattern(regExpStringPatternAsString: string, caseSensitivity: boolean): RegExpStringPattern {
        const result: RegExpStringPattern = new RegExpStringPattern(regExpStringPatternAsString, caseSensitivity);
        return(result);
    }



    getOrderedFullMatchPatternsList(
        patterns: Array<IPattern>, 
        consecutiveMatchingsMinNumber: number = 1,
        consecutiveMatchingsMaxNumber: number = null
    ): IPatternsList {
        const result: OrderedFullMatchPatternsList = this.createOrderedFullMatchPatternsList(patterns);
        
        result.setConsecutiveMatchingsMinNumber(consecutiveMatchingsMinNumber);

        if (consecutiveMatchingsMaxNumber !== null) {
            result.setConsecutiveMatchingsMaxNumber(consecutiveMatchingsMaxNumber);
        }

        return(result);
    }
    private createOrderedFullMatchPatternsList(patterns: Array<IPattern>): OrderedFullMatchPatternsList {
        const result: OrderedFullMatchPatternsList = new OrderedFullMatchPatternsList(patterns);
        return(result);
    }
    
    
    getOrderedOneMatchPatternsList(
        patterns: Array<IPattern>, 
        consecutiveMatchingsMinNumber: number = 1,
        consecutiveMatchingsMaxNumber: number = null
    ): IPatternsList {
        const result: OrderedOneMatchPatternsList = this.createOrderedOneMatchPatternsList(patterns);
        
        result.setConsecutiveMatchingsMinNumber(consecutiveMatchingsMinNumber);

        if (consecutiveMatchingsMaxNumber !== null) {
            result.setConsecutiveMatchingsMaxNumber(consecutiveMatchingsMaxNumber);
        }

        return(result);
    }
    private createOrderedOneMatchPatternsList(patterns: Array<IPattern>): OrderedOneMatchPatternsList {
        const result: OrderedOneMatchPatternsList = new OrderedOneMatchPatternsList(patterns);
        return(result);
    }     
    
}
