import { IStringToParse } from "./IStringToParse";
import { StringToParseMatchingsListOrNull } from "./../types";


export interface IPattern {

    //@return { StringToParseMatchingsListOrNull } null if fails, id est the consecutive matchings number is out of range ([min, max]).
    listStringToParseNextConsecutiveMatchings(stringToParse: IStringToParse): StringToParseMatchingsListOrNull;

    setConsecutiveMatchingsMinNumber(consecutiveMatchingsMinNumber: number): IPattern;
    getConsecutiveMatchingsMinNumber(): number;
    setConsecutiveMatchingsMaxNumber(consecutiveMatchingsMaxNumber: number): IPattern;
    getConsecutiveMatchingsMaxNumber(): number;
    isDefinedConsecutiveMatchingsMaxNumber(): boolean;
    setConsecutiveMatchingsNumbers(consecutiveMatchingsMinNumber: number, consecutiveMatchingsMaxNumber?: number): IPattern;    

}