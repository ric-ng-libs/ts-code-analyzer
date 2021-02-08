export interface ILanguageTokensProvider {

    getSpace(): string;
    getCR(): string;
    getLF(): string;
    
    getLineCommentStart(): string;
    getBlockCommentStart(): string;
    getBlockCommentEnd(): string;

    getBlockStart(): string;
    getBlockEnd(): string;

    getStringDelimiter(): string;
    getStringDelimiterAlias(): string;
    

    getExport(): string;

    getAbstractClass(): string;

    getClass(): string;

    getAbstractMember(): string;
    getAbstractMethod(): string;   
    
    getIdentifier(): string;






    getXMLTagStartDelimiter(finalTag: boolean): string;
    getXMLTagEndDelimiter(): string;    

}