import { IPattern } from './IPattern';
import { IPatternsList } from './IPatternsList';
import { ILanguageStringToParseMatchingInterpreter } from './ILanguageStringToParseMatchingInterpreter';


export interface IChildablePattern extends IPattern {

    debugString(indent?: number): string;
    setDebugInfo(debugInfo: string): IChildablePattern;
    getDebugInfo(): string;

    setParentPattern(parentPattern: IPatternsList): IChildablePattern;

    getParentPattern(): (IPatternsList | null);


    setLanguageStringToParseMatchingInterpreter(languageStringToParseMatchingInterpreter: ILanguageStringToParseMatchingInterpreter)
        : IChildablePattern;

    getLanguageStringToParseMatchingInterpreter(): ILanguageStringToParseMatchingInterpreter | null;


    
}
