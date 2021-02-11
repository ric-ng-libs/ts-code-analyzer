import { NumberOrNull, StringOrNull } from '@ric-ng/ts-general';

import { IPattern } from "./IPattern";
import { IStringToParseMatchingDebugInfos } from './debug';


export interface IStringToParseMatching {


    getDebugInfos(): IStringToParseMatchingDebugInfos;
    
    getPattern(): IPattern;
    interpret(): IStringToParseMatching;

    getPointerPosition(): NumberOrNull;
    getAsString(useCache?: boolean): StringOrNull;
    getTotalLength(useCache?: boolean): NumberOrNull;

    
}