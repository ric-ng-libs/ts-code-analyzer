import { IChildablePattern } from "./IChildablePattern";

export interface IPatternsList extends IChildablePattern {
    definePatterns(patterns: Array<IChildablePattern>): IPatternsList;
    definePattern(pattern: IChildablePattern): IPatternsList;
    addPatterns(patterns: Array<IChildablePattern>): IPatternsList;
    addPattern(pattern: IChildablePattern): IPatternsList;    
}