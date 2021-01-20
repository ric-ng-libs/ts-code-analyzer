import { NumberOrNull, StringOrNull } from '@ric-ng/ts-general';

import { IChildablePattern } from "./IChildablePattern";


export interface IStringToParseMatching {
    
    getPattern(): IChildablePattern;

    getPointerPosition(): NumberOrNull;
    getAsString(useCache?: boolean): StringOrNull;
    getTotalLength(useCache?: boolean): NumberOrNull;
    
}