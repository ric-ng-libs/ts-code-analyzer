import { IPattern } from "./IPattern";

export interface IStringToParseMatching {
    getMasterPattern(): IPattern;
    getPattern(): IPattern;
    getStringToParseMatching(): string;
    getStringToParseMatchingLength(): number;
    getStringToParsePointerPosition(): number;    
}