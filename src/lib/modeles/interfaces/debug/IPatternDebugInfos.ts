import { StringOrNull, NumberOrNull } from '@ric-ng/ts-general';

export interface IPatternDebugInfos {
    id:  number;
    typeId: StringOrNull;
    index: NumberOrNull;
    constructorName: string;
}