import { StringOrNull, NumberOrNull } from '@ric-ng/ts-general';

export interface IPatternDebugInfos {
    id:  number;
    parentId: NumberOrNull;
    typeId: StringOrNull;
    index: StringOrNull;
    constructorName: string;
}