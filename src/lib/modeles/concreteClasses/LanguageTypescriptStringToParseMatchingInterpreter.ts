import { ILanguageStringToParseMatchingInterpreter, IStringToParseMatching } from './../interfaces';
import { ALanguageStringToParseMatchingInterpreter } from './../abstracts';

export class LanguageTypescriptStringToParseMatchingInterpreter 
    extends ALanguageStringToParseMatchingInterpreter 
    implements ILanguageStringToParseMatchingInterpreter {

    interpret(stringToParseMatching: IStringToParseMatching): ILanguageStringToParseMatchingInterpreter {
        // console.log(`\n\n***************************************\n\n`);
        // console.log("Matching Pattern: ", stringToParseMatching.getPattern());
        // console.log("Matching Pattern constructor name : ", stringToParseMatching.getPattern().constructor.name);
        // console.log("Matching Pattern debug infos : ", stringToParseMatching.getPattern().getDebugInfos());
        // console.log(`Matching Pattern Matching string, pointer position = ${stringToParseMatching.getPointerPosition()}`);
        // console.log(`Matching Pattern Matching string                   = '${stringToParseMatching.getAsString()}'`);
        
        return(this);
    }
    
}