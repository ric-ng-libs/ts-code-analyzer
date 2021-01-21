import { IStringToParseMatchingsListOrNull } from "./../types";
import { IStringToParse } from "./IStringToParse";


export interface IPattern {

    //@return {IStringToParseMatchingsListOrNull} null if fails, id est : if the consecutive matchings number is out of range ([min, max]).
    listStringToParseNextConsecutiveMatchings(stringToParse: IStringToParse): IStringToParseMatchingsListOrNull;

    setConsecutiveMatchingsMinNumber(consecutiveMatchingsMinNumber: number): IPattern;
    getConsecutiveMatchingsMinNumber(): number;
    setConsecutiveMatchingsMaxNumber(consecutiveMatchingsMaxNumber: number): IPattern;
    getConsecutiveMatchingsMaxNumber(): number;
    isDefinedConsecutiveMatchingsMaxNumber(): boolean;
    setConsecutiveMatchingsNumbers(consecutiveMatchingsMinNumber: number, consecutiveMatchingsMaxNumber?: number): IPattern;    

}