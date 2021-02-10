import { IPatternDebugInfos } from './IPatternDebugInfos';

export interface IStringToParseMatchingDebugInfos {
    constructorName: string;
    addedFromFunc: string;
    matchingPatternType: string; //matchingPattern constructor name
    matchingString: string;
    matchingPattern: IPatternDebugInfos;
    matchingAtPosition: number;
    matchingTotalLength: number;
    subMatchings?: Array<IStringToParseMatchingDebugInfos>;
    _id: number;
}