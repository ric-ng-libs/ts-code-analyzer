import { IPattern } from "./IPattern";

export interface IPatternsList extends IPattern {
    definePatterns(patterns: Array<IPattern>): IPatternsList;
    definePattern(pattern: IPattern): IPatternsList;
    addPatterns(patterns: Array<IPattern>): IPatternsList;
    addPattern(pattern: IPattern): IPatternsList;    
}