import { IClassPatternsFactory, IPattern, IPatternsFactory } from './../../interfaces';

export class ClassPatternsFactory implements IClassPatternsFactory {

    constructor(
        private patternsFactory: IPatternsFactory,
        private 
        private languageTokensProvider: ILanguageTokensProvider
    ) {

    }

    getClassKeywordPattern(): IPattern {
        const result: IPattern = this.patternsFactory.getStringPattern( 
            ?? //Objet qu'appelera le pattern pour setter classesContainer.add( factory.getClass() )
            this.languageTokensProvider.getClassToken(),
            1, 1
        );
        return(result);
    }
    
}
