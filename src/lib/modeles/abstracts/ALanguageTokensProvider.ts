
export abstract class ALanguageTokensProvider {

    getSpace(): string {
        const result: string = " ";
        return (result);
    }

    getCR(): string {
        const result: string = "\n";
        return (result);
    }
    getLF(): string {
        const result: string = "\r";
        return (result);
    }

    getLineCommentStart(): string {
        const result: string = "//";
        return (result);
    }
    getBlockCommentStart(): string {
        const result: string = "/*";
        return (result);
    }
    getBlockCommentEnd(): string {
        const result: string = "*/";
        return (result);
    }

    getBlockStart(): string {
        const result: string = "{";
        return (result);
    }
    getBlockEnd(): string {
        const result: string = "}";
        return (result);
    }

    getStringDelimiter(): string {
        const result: string = "\"";
        return (result);
    }
    getStringDelimiterAlias(): string {
        const result: string = "'";
        return (result);
    }

    getIdentifier(): string {
        const regExpAlpha: string = "A-Za-z_$";
        const result: string = `[${regExpAlpha}]{1}[${regExpAlpha}0-9]*`;
        return (result);
    }

}