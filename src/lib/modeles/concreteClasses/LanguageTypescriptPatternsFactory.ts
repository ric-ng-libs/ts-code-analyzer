import { ILanguagePatternsFactory, IChildablePattern, ILanguageStringToParseMatchingInterpreter } from './../interfaces';

import { ALanguagePatternsFactory } from './../abstracts';

import { LanguageTypescriptStringToParseMatchingInterpreter } from './LanguageTypescriptStringToParseMatchingInterpreter';


export class LanguageTypescriptPatternsFactory extends ALanguagePatternsFactory implements ILanguagePatternsFactory {


    getClass(): IChildablePattern {
        const  languageStringToParseMatchingInterpreter: ILanguageStringToParseMatchingInterpreter = 
            new LanguageTypescriptStringToParseMatchingInterpreter();

        const result: IChildablePattern = this.patternsFactory.getOrderedFullMatchPatternsList([
            this.getSpacingToken(true),
            
            this.getExport().setLanguageStringToParseMatchingInterpreter(languageStringToParseMatchingInterpreter),

            this.getAbstract().setLanguageStringToParseMatchingInterpreter(languageStringToParseMatchingInterpreter),
            
            this.getClassToken(),
            this.getSpacingToken(false),

            this.getIdentifier().setLanguageStringToParseMatchingInterpreter(languageStringToParseMatchingInterpreter),

            this.getBlockStart(),
            
            this.getBlockEnd()

        ], 0, null)
        .setLanguageStringToParseMatchingInterpreter(languageStringToParseMatchingInterpreter)
        .setDebugInfo("CLASS");
        
        return(result);        
    }

    
}
