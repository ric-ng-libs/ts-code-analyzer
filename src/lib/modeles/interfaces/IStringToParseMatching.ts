import { IChildablePattern } from "./IChildablePattern";

export interface IStringToParseMatching {
    
    getPattern(): IChildablePattern;

    getStringToParseMatching(): string;
    getStringToParseMatchingLength(): number;
    getStringToParsePointerPosition(): number;    
    
}