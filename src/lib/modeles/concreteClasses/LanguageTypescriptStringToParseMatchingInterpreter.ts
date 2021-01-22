import { ILanguageStringToParseMatchingInterpreter, IStringToParseMatching } from './../interfaces';
import { ALanguageStringToParseMatchingInterpreter } from './../abstracts';

export class LanguageTypescriptStringToParseMatchingInterpreter 
    extends ALanguageStringToParseMatchingInterpreter 
    implements ILanguageStringToParseMatchingInterpreter {

    interpret(stringToParseMatching: IStringToParseMatching): ILanguageStringToParseMatchingInterpreter {
        console.log(`ICI`);
        console.log( stringToParseMatching.getPattern().getDebugInfo() );
        return(this);
    }
    
}