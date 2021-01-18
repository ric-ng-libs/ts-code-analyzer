import { IPattern } from './IPattern';
import { IPatternsList } from './IPatternsList';

export interface IChildablePattern extends IPattern {

    debugString(indent?: number): string;

    setParentPattern(parentPattern: IPatternsList): IChildablePattern;

    getParentPattern(): (IPatternsList | null);
    
}
