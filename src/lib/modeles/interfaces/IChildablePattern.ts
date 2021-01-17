import { IPattern } from './IPattern';
import { IPatternsList } from './IPatternsList';

export interface IChildablePattern extends IPattern {

    setParentPattern(parentPattern: IPatternsList): IChildablePattern;

    getParentPattern(): (IPatternsList | null);
    
}
