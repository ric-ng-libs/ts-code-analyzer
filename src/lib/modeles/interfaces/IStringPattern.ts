import { IStringComparator } from "@ric-ng/ts-general";
import { ISimplePattern } from "./ISimplePattern";

export interface IStringPattern extends ISimplePattern {
    setMatchComparator(matchComparator: IStringComparator): IStringPattern;
}