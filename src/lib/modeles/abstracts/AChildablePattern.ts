import { IPatternsList, IChildablePattern, IStringToParseMatching, IStringToParseMatchingsList } from './../interfaces';
import { APattern } from './APattern';

import { StringToParseMatchingsList } from './../concreteClasses/StringToParseMatchingsList';


export abstract class AChildablePattern extends APattern implements IChildablePattern {
    
    private parentPattern: IPatternsList = null;
    
    setParentPattern(parentPattern: IPatternsList): IChildablePattern {
        this.parentPattern = parentPattern;
        return(this);
    }

    getParentPattern(): (IPatternsList | null) {
        return(this.parentPattern);
    }

    protected createStringToParseMatchingsList(stringToParseMatchingq: Array<IStringToParseMatching> = [])
        : IStringToParseMatchingsList {

        const result: IStringToParseMatchingsList = new StringToParseMatchingsList(this, stringToParseMatchingq);
        return(result);

    }    
}
