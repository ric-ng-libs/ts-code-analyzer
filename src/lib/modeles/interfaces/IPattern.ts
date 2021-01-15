import { IStringToParse } from "./IStringToParse";
import { StringToParseMatchingsListOrNull } from "./../types";


export interface IPattern {

    //@return { StringToParseMatchingsListOrNull } null if matching fails.
    listStringToParseNextConsecutiveMatchings(stringToParse: IStringToParse): StringToParseMatchingsListOrNull;

    setConsecutiveMatchingsMinNumber(consecutiveMatchingsMinNumber: number): IPattern;
    getConsecutiveMatchingsMinNumber(): number;
    setConsecutiveMatchingsMaxNumber(consecutiveMatchingsMaxNumber: number): IPattern;
    getConsecutiveMatchingsMaxNumber(): number;
    isDefinedConsecutiveMatchingsMaxNumber(): boolean;
    setConsecutiveMatchingsNumbers(consecutiveMatchingsMinNumber: number, consecutiveMatchingsMaxNumber?: number): IPattern;    

}