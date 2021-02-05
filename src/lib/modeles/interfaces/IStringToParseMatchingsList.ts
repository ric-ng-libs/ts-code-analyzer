import { IGenericList } from '@ric-ng/ts-general';
import { IStringToParseMatching } from "./IStringToParseMatching";


export interface IStringToParseMatchingsList extends IStringToParseMatching {
    
    addStringToParseMatching(stringToParseMatching: IStringToParseMatching): IStringToParseMatchingsList;
    
    getList(): IGenericList<IStringToParseMatching>;

}



