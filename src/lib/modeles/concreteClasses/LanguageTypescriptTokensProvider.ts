import { ILanguageTokensProvider } from "./../interfaces";
import { ALanguageTokensProvider } from "./../abstracts";


export class LanguageTypescriptTokensProvider extends ALanguageTokensProvider
 implements ILanguageTokensProvider {

    getExport(): string {
        const result: string = "export";
        return(result);
    }

    getClass(): string {
        const result: string = "class";
        return(result);
    }    

    private getAbstract(): string {
        const result: string = "abstract";
        return(result);
    }
    getAbstractClass(): string {
        const result: string = this.getAbstract();
        return(result);
    }
    getAbstractMember(): string {
        const result: string = this.getAbstract();
        return(result);
    }
    getAbstractMethod(): string {
        const result: string = this.getAbstract();
        return(result);
    }


}