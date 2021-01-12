import { IPattern } from "./IPattern";

export interface ISimplePattern extends IPattern {
    setString(string: string): ISimplePattern;
    getString(): string;

    setCaseSensitivity(caseSensitivity: boolean): ISimplePattern;
    isCaseSensitivity(): boolean;
}