import { IPattern } from './IPattern';


export interface ILanguagePatternsFactory {

    getClass(): IPattern;
    
}