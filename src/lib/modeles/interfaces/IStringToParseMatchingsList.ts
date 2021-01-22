import { IGenericList } from '@ric-ng/ts-general';

import { IStringToParseMatching } from "./IStringToParseMatching";



export interface IStringToParseMatchingsList extends IStringToParseMatching {
    
    getList(): IGenericList<IStringToParseMatching>;
    
    addStringToParseMatching(stringToParseMatching: IStringToParseMatching): IStringToParseMatchingsList;

}



