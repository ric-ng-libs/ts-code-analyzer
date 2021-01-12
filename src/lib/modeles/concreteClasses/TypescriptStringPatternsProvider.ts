import { ILanguageStringPatternsProvider } from "./../interfaces";
import { ALanguageStringPatternsProvider } from "./../abstracts";

export class TypescriptStringPatternsProvider extends ALanguageStringPatternsProvider
 implements ILanguageStringPatternsProvider {

    getExportKeyword(): string {
        const result: string = "export";
        return(result);
    }

    private getAbstractKeyword(): string {
        const result: string = "abstract";
        return(result);
    }
    getAbstractClassKeyword(): string {
        const result: string = this.getAbstractKeyword();
        return(result);
    }
    getAbstractMemberKeyword(): string {
        const result: string = this.getAbstractKeyword();
        return(result);
    }
    getAbstractMethodKeyword(): string {
        const result: string = this.getAbstractKeyword();
        return(result);
    }

    getClassKeyword(): string {
        const result: string = "class";
        return(result);
    }

}