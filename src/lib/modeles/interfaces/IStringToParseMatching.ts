import { NumberOrNull, StringOrNull } from '@ric-ng/ts-general';

import { IPattern } from "./IPattern";


export interface IStringToParseMatching {
    
    getPattern(): IPattern;
    interpret(): IStringToParseMatching;

    getPointerPosition(): NumberOrNull;
    getAsString(useCache?: boolean): StringOrNull;
    getTotalLength(useCache?: boolean): NumberOrNull;

    
}