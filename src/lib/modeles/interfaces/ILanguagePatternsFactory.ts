import { IChildablePattern } from './IChildablePattern';


export interface ILanguagePatternsFactory {

    getClass(): IChildablePattern;
    
}