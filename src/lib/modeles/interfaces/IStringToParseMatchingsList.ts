import { IStringToParseMatching } from "./IStringToParseMatching";

export interface IStringToParseMatchingsList extends IStringToParseMatching {
    addStringToParseMatching(stringToParseMatching: IStringToParseMatching): IStringToParseMatchingsList;
}



