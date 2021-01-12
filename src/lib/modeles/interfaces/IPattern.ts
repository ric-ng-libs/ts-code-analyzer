import { IStringToParse } from "./IStringToParse";
import { StringToParseMatchingsListOrNull } from "./../types";


export interface IPattern {

    //@return { Array<IStringToParseMatching> | null } null if matching fails.
    getStringToParseMatchings(stringToParse: IStringToParse): StringToParseMatchingsListOrNull;

    setMinOccurencesNumber(minOccurencesNumber: number): IPattern;
    getMinOccurencesNumber(): number;
    setMaxOccurencesNumber(maxOccurencesNumber: number): IPattern;
    getMaxOccurencesNumber(): number;
    isDefinedMaxOccurencesNumber(): boolean;
    setOccurencesNumbers(minOccurencesNumber: number, maxOccurencesNumber?: number): IPattern;    

}