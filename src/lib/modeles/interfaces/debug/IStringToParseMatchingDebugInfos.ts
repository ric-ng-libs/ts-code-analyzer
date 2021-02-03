import { IPatternDebugInfos } from './IPatternDebugInfos';

export interface IStringToParseMatchingDebugInfos {
    patternConsecutiveMatchingsNumber: number;
    matchingString: string;
    matchingPattern: IPatternDebugInfos;
    matchingAtPosition: number;
    matchingTotalLength: number;
    subMatchings?: Array<IStringToParseMatchingDebugInfos>;
    constructorName: string;
    _id: number;
}