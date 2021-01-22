import { 
    IPatternsList, 
    IChildablePattern, 
    IStringToParseMatching, 
    IStringToParseMatchingsList, 
    ILanguageStringToParseMatchingInterpreter 
} from './../interfaces';

import { APattern } from './APattern';

import { StringToParseMatchingsList } from './../concreteClasses/StringToParseMatchingsList';


export abstract class AChildablePattern extends APattern implements IChildablePattern {
    
    private parentPattern: IPatternsList = null;
    private languageStringToParseMatchingInterpreter: ILanguageStringToParseMatchingInterpreter = null;

    private debugInfo: string = "";
    

    setParentPattern(parentPattern: IPatternsList): IChildablePattern {
        this.parentPattern = parentPattern;
        return(this);
    }

    getParentPattern(): (IPatternsList | null) {
        return(this.parentPattern);
    }

    setLanguageStringToParseMatchingInterpreter(languageStringToParseMatchingInterpreter: ILanguageStringToParseMatchingInterpreter)
    : IChildablePattern {
        if (languageStringToParseMatchingInterpreter !== null) {
            this.languageStringToParseMatchingInterpreter = languageStringToParseMatchingInterpreter;
        }
        return(this);
    }
    getLanguageStringToParseMatchingInterpreter(): ILanguageStringToParseMatchingInterpreter | null {
        return(this.languageStringToParseMatchingInterpreter);
    }    

    protected createStringToParseMatchingsList(stringToParseMatchings: Array<IStringToParseMatching> = [])
        : IStringToParseMatchingsList {

        const result: IStringToParseMatchingsList = new StringToParseMatchingsList(this, stringToParseMatchings);
        return(result);

    }  
    
    
    setDebugInfo(debugInfo: string): IChildablePattern {
        this.debugInfo = debugInfo;
        return(this);
    } 
    getDebugInfo(): string {
        return(this.debugInfo);
    }   

}
