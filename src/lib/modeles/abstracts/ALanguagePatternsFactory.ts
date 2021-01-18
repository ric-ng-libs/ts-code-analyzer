import { IChildablePattern, IPatternsFactory, ILanguageTokensProvider } from './../interfaces';
import { ASimplePattern } from './ASimplePattern';

export abstract class ALanguagePatternsFactory {

    constructor(
        protected patternsFactory: IPatternsFactory,
        private languageTokensProvider: ILanguageTokensProvider
    ) {
        this.setCaseSensitivity();
    }


    private setCaseSensitivity(): void {
        ASimplePattern.setDefaultCaseSensitivity( this.getCaseSensitivity() );
    }

    protected getCaseSensitivity(): boolean {
        return(true);
    }
    

    protected getCRToken(maxOccurencesNumber: number = null): IChildablePattern {
        const result: IChildablePattern = this.patternsFactory.getStringPattern( 
            this.languageTokensProvider.getCR(),
            1, maxOccurencesNumber
        );
        return(result);
    }
    
    protected getLFToken(maxOccurencesNumber: number = null): IChildablePattern {
        const result: IChildablePattern = this.patternsFactory.getStringPattern( 
            this.languageTokensProvider.getLF(),
            1, maxOccurencesNumber
        );
        return(result);
    }

    protected getSpaceToken(): IChildablePattern {
        const result: IChildablePattern = this.patternsFactory.getStringPattern( 
            this.languageTokensProvider.getSpace(),
            1, null
        );
        return(result);
    }

    protected getCRLFToken(): IChildablePattern {
        const result: IChildablePattern = this.patternsFactory.getOrderedOneMatchPatternsList([
            this.patternsFactory.getOrderedFullMatchPatternsList([
                this.getCRToken(1),
                this.getLFToken(1)
            ], 1, null),
            this.getCRToken(),
            this.getLFToken()
            
        ], 1, null);        

        return(result);
    }    
    
    protected getSpacingToken(optional: boolean): IChildablePattern {
        
        const result: IChildablePattern = this.patternsFactory.getOrderedOneMatchPatternsList([
            this.getSpaceToken(),
            this.getCRLFToken()
            
        ], ((optional)? 0:1), null );

        return(result);
    }     


    protected getExportToken(): IChildablePattern {
        const result: IChildablePattern = this.patternsFactory.getStringPattern( 
            this.languageTokensProvider.getExport(),
            1, 1
        );
        return(result);
    }     

    protected getAbstractClassToken(): IChildablePattern {
        const result: IChildablePattern = this.patternsFactory.getStringPattern( 
            this.languageTokensProvider.getAbstractClass(),
            1, 1
        );
        return(result);
    }
    
    protected getClassToken(): IChildablePattern {
        const result: IChildablePattern = this.patternsFactory.getStringPattern( 
            this.languageTokensProvider.getClass(),
            1, 1
        );
        return(result);
    }


    protected getIdentifierToken(): IChildablePattern {
        const result: IChildablePattern = this.patternsFactory.getRegExpStringPattern(
            this.languageTokensProvider.getIdentifier(),
            1, 1
        );
        return(result);
    }

    protected getBlockStartToken(): IChildablePattern {
        const result: IChildablePattern = this.patternsFactory.getStringPattern(
            this.languageTokensProvider.getBlockStart(),
            1, 1
        );
        return(result);
    }
    protected getBlockEndToken(): IChildablePattern {
        const result: IChildablePattern = this.patternsFactory.getStringPattern(
            this.languageTokensProvider.getBlockEnd(),
            1, 1
        );
        return(result);
    }     


    protected getExport(): IChildablePattern {
        const result: IChildablePattern = this.patternsFactory.getOrderedFullMatchPatternsList([
            this.getExportToken(),
            this.getSpacingToken(false)
            
        ], 0, 1);

        return(result);

    }    
 

    protected getAbstract(): IChildablePattern {
        const result: IChildablePattern = this.patternsFactory.getOrderedFullMatchPatternsList([
            this.getAbstractClassToken(),
            this.getSpacingToken(false)
            
        ], 0, 1);

        return(result);

    }
    

    protected getIdentifier(): IChildablePattern {
        const result: IChildablePattern = this.patternsFactory.getOrderedFullMatchPatternsList([
            this.getIdentifierToken(),
            this.getSpacingToken(true)
            
        ], 1, 1);

        return(result);

    }    
    
    protected getBlockStart(): IChildablePattern {
        const result: IChildablePattern = this.patternsFactory.getOrderedFullMatchPatternsList([
            this.getBlockStartToken(),
            this.getSpacingToken(true)
            
        ], 1, 1);

        return(result);

    }
    
    protected getBlockEnd(): IChildablePattern {
        const result: IChildablePattern = this.patternsFactory.getOrderedFullMatchPatternsList([
            this.getBlockEndToken(),
            this.getSpacingToken(true)
            
        ], 1, 1);

        return(result);

    }    

    
}