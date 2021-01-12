export interface ILanguageStringPatternsProvider {
    getSpace(): string;
    getCR(): string;
    getLF(): string;

    getLineCommentStart(): string;
    getBlockCommentStart(): string;
    getBlockCommentEnd(): string;

    getStringDelimiter(): string;
    getStringDelimiterAlias(): string;

    getExportKeyword(): string;

    getAbstractClassKeyword(): string;
    getClassKeyword(): string;
    getAbstractMemberKeyword(): string;
    getAbstractMethodKeyword(): string;
}