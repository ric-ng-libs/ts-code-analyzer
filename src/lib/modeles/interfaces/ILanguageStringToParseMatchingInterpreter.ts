import { IStringToParseMatching } from './IStringToParseMatching';


export interface ILanguageStringToParseMatchingInterpreter {

    interpret(stringToParseMatching: IStringToParseMatching): ILanguageStringToParseMatchingInterpreter;

}