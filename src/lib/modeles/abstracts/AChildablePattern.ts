import { IPatternsList, IChildablePattern } from './../interfaces';
import { APattern } from './APattern';

export abstract class AChildablePattern extends APattern implements IChildablePattern {
    
    private parentPattern: IPatternsList = null;
    
    setParentPattern(parentPattern: IPatternsList): IChildablePattern {
        this.parentPattern = parentPattern;
        return(this);
    }

    getParentPattern(): (IPatternsList | null) {
        return(this.parentPattern);
    }
}
