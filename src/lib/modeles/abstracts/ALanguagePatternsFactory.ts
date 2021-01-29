import { 
    IPattern, 
    IPatternsFactory, 
    ILanguageTokensProvider, 
    ILanguageStringToParseMatchingInterpreter 
} from './../interfaces';

import { ASimplePattern } from './ASimplePattern';

export abstract class ALanguagePatternsFactory {

    constructor(
        protected patternsFactory: IPatternsFactory,
        private languageTokensProvider: ILanguageTokensProvider,
        protected languageStringToParseMatchingInterpreter: ILanguageStringToParseMatchingInterpreter
    ) {
        this.setCaseSensitivity();
    }


    private setCaseSensitivity(): void {
        ASimplePattern.setDefaultCaseSensitivity( this.getCaseSensitivity() );
    }

    protected getCaseSensitivity(): boolean {
        return(true);
    }
    

    protected getCRToken(maxOccurencesNumber: number = null): IPattern {
        const result: IPattern = this.patternsFactory.getStringPattern( 
            this.languageTokensProvider.getCR(),
            1, maxOccurencesNumber
        );
        return(result);
    }
    
    protected getLFToken(maxOccurencesNumber: number = null): IPattern {
        const result: IPattern = this.patternsFactory.getStringPattern( 
            this.languageTokensProvider.getLF(),
            1, maxOccurencesNumber
        );
        return(result);
    }

    protected getSpaceToken(): IPattern {
        const result: IPattern = this.patternsFactory.getStringPattern( 
            this.languageTokensProvider.getSpace(),
            1, null
        );
        return(result);
    }

    protected getCRLFToken(): IPattern {
        const result: IPattern = this.patternsFactory.getOrderedOneMatchPatternsList([
            this.patternsFactory.getOrderedFullMatchPatternsList([
                this.getCRToken(1),
                this.getLFToken(1)
            ], 1, null),
            this.getCRToken(),
            this.getLFToken()
            
        ], 1, null)
        .setDebugInfosTypeId("CRLFs...");       

        return(result);
    }    
    
    protected getSpacingToken(optional: boolean): IPattern {
        
        const result: IPattern = this.patternsFactory.getOrderedOneMatchPatternsList([
            this.getSpaceToken(),
            this.getCRLFToken()
            
        ], ((optional)? 0:1), null )
        .setDebugInfosTypeId("SPACINGS");

        return(result);
    }     


    protected getExportToken(): IPattern {
        const result: IPattern = this.patternsFactory.getStringPattern( 
            this.languageTokensProvider.getExport(),
            1, 1
        );
        return(result);
    }     

    protected getAbstractClassToken(): IPattern {
        const result: IPattern = this.patternsFactory.getStringPattern( 
            this.languageTokensProvider.getAbstractClass(),
            1, 1
        );
        return(result);
    }
    
    protected getClassToken(): IPattern {
        const result: IPattern = this.patternsFactory.getStringPattern( 
            this.languageTokensProvider.getClass(),
            1, 1
        );
        return(result);
    }


    protected getIdentifierToken(): IPattern {
        const result: IPattern = this.patternsFactory.getRegExpStringPattern(
            this.languageTokensProvider.getIdentifier(),
            1, 1
        );
        return(result);
    }

    protected getBlockStartToken(): IPattern {
        const result: IPattern = this.patternsFactory.getStringPattern(
            this.languageTokensProvider.getBlockStart(),
            1, 1
        );
        return(result);
    }
    protected getBlockEndToken(): IPattern {
        const result: IPattern = this.patternsFactory.getStringPattern(
            this.languageTokensProvider.getBlockEnd(),
            1, 1
        );
        return(result);
    }     


    protected getExport(): IPattern {
        const result: IPattern = this.patternsFactory.getOrderedFullMatchPatternsList([
            this.getExportToken(),
            this.getSpacingToken(false)
            
        ], 0, 1)
        .setDebugInfosTypeId("EXPORT");

        return(result);

    }    
 

    protected getAbstract(): IPattern {
        const result: IPattern = this.patternsFactory.getOrderedFullMatchPatternsList([
            this.getAbstractClassToken(),
            this.getSpacingToken(false)
            
        ], 0, 1)
        .setDebugInfosTypeId("ABSTRACT");

        return(result);

    }
    

    protected getIdentifier(): IPattern {
        const result: IPattern = this.patternsFactory.getOrderedFullMatchPatternsList([
            this.getIdentifierToken(),
            this.getSpacingToken(true)
            
        ], 1, 1)
        .setDebugInfosTypeId("IDENTIFIER");

        return(result);

    }    
    
    protected getBlockStart(): IPattern {
        const result: IPattern = this.patternsFactory.getOrderedFullMatchPatternsList([
            this.getBlockStartToken(),
            this.getSpacingToken(true)
            
        ], 1, 1);

        return(result);

    }
    
    protected getBlockEnd(): IPattern {
        const result: IPattern = this.patternsFactory.getOrderedFullMatchPatternsList([
            this.getBlockEndToken(),
            this.getSpacingToken(true)
            
        ], 1, 1);

        return(result);

    }    

    
}