import { IChildablePattern } from "./IChildablePattern";

export interface ISimplePattern extends IChildablePattern {
    setString(string: string): ISimplePattern;
    getString(): string;

    setCaseSensitivity(caseSensitivity: boolean): ISimplePattern;
    isCaseSensitivity(): boolean;
}