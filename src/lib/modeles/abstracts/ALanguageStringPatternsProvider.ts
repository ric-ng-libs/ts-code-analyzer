
export abstract class ALanguageStringPatternsProvider {

   getSpace(): string {
       const result: string = " ";
       return(result);
   }

   getCR(): string {
       const result: string = "\n";
       return(result);
   }
   getLF(): string {
       const result: string = "\r";
       return(result);
   }

    getLineCommentStart(): string {
        const result: string = "//";
        return(result);
    }
    getBlockCommentStart(): string {
        const result: string = "/*";
        return(result);
    }
    getBlockCommentEnd(): string {
        const result: string = "*/";
        return(result);
    }

    getStringDelimiter(): string {
        const result: string = "\"";
        return(result);
    }
    getStringDelimiterAlias(): string {
        const result: string = "'";
        return(result);
    }

}