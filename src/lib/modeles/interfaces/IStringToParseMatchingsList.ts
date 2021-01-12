import { IGenericList } from "@ric-ng/ts-general";
import { IStringToParseMatching } from "./IStringToParseMatching";

export interface IStringToParseMatchingsList extends IGenericList<IStringToParseMatching> {
    getTotalLength(): number;
}



