import { IStringToParseMatchingsListOrNull } from "./../types";
import { IStringToParse } from "./IStringToParse";
import { ILanguageStringToParseMatchingInterpreter } from './ILanguageStringToParseMatchingInterpreter';
import { IPatternDebugInfos } from './debug';


export interface IPattern {

    setDebugInfosTypeId(debugInfosTypeId: string): IPattern;
    getDebugInfos(): IPatternDebugInfos;


    //@return {IStringToParseMatchingsListOrNull}:
    //                                           - null if fails, id est : if the consecutive matchings number is out of range ([min, max]).
    //                                           - an empty list, if there was no matching BUT the minimal number of macthings is also 0.
    listStringToParseNextConsecutiveMatchings(stringToParse: IStringToParse): IStringToParseMatchingsListOrNull;

    setConsecutiveMatchingsMinNumber(consecutiveMatchingsMinNumber: number): IPattern;
    getConsecutiveMatchingsMinNumber(): number;
    setConsecutiveMatchingsMaxNumber(consecutiveMatchingsMaxNumber: number): IPattern;
    getConsecutiveMatchingsMaxNumber(): number;
    isDefinedConsecutiveMatchingsMaxNumber(): boolean;
    setConsecutiveMatchingsNumbers(
        consecutiveMatchingsMinNumber: number, 
        consecutiveMatchingsMaxNumber?: number
    ): IPattern;    


    setLanguageStringToParseMatchingInterpreter(
        languageStringToParseMatchingInterpreter: ILanguageStringToParseMatchingInterpreter
    ): IPattern;

    getLanguageStringToParseMatchingInterpreter(): ILanguageStringToParseMatchingInterpreter | null;    
}