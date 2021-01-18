import { ILanguagePatternsFactory, IChildablePattern } from './../interfaces';

import { ALanguagePatternsFactory } from './../abstracts';


export class LanguageTypescriptPatternsFactory extends ALanguagePatternsFactory implements ILanguagePatternsFactory {


    getClass(): IChildablePattern {
        const result: IChildablePattern = this.patternsFactory.getOrderedFullMatchPatternsList([
            this.getSpacingToken(true),
            
            this.getExport(),

            this.getAbstract(),
            
            this.getClassToken(),
            this.getSpacingToken(false),

            this.getIdentifier(),

            this.getBlockStart(),
            
            this.getBlockEnd()

        ], 0, null);
        return(result);        
    }

    
}
