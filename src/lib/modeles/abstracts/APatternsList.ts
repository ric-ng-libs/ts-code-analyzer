import { GenericList } from "@ric-ng/ts-general";

import { IStringToParseMatchingsListOrNull } from './../types';
import { IPattern, IPatternsList, IStringToParseMatchingsList, IStringToParse, IPatternDebugInfos } from "./../interfaces";

import { APattern } from "./APattern";



export abstract class APatternsList extends APattern implements IPatternsList {

    protected list: GenericList<IPattern>;

    protected stringToParseNextMatchingsListOrNull: IStringToParseMatchingsListOrNull;

    getDebugInfos(): IPatternDebugInfos {
        const result: IPatternDebugInfos = super.getDebugInfos();
        Object.assign(result, {
            'patterns List': `'${this.list.getElements()}' (Length:${this.list.getElementsNumber()})`
        });
        return(result);
    } 

    constructor(patterns: Array<IPattern> = []) {
        super();

        this.createList();
        this.definePatterns(patterns);
    }
    
    private createList(): void {
        this.list = new GenericList<IPattern>();
        this.list.setAllowNullElement(false);
        
    }
    
    definePatterns(patterns: Array<IPattern>): IPatternsList {
        if (patterns !== null) {
            this.list.clear();
            this.addPatterns(patterns);
        }
        return(this);
    }

    definePattern(pattern: IPattern): IPatternsList {
        if (pattern !== null) {
            this.definePatterns(Array(pattern));
        }
        return(this);         
    }

    addPatterns(patterns: Array<IPattern>): IPatternsList {
        if (patterns !== null) {
            let index: number = this.list.getElementsNumber();
            for(const pattern of patterns) {
                pattern.getDebugInfos().index = index++;
            }
            this.list.addElements(patterns);
        }
        return(this);        
    }

    addPattern(pattern: IPattern): IPatternsList {
        if (pattern !== null) {
            this.addPatterns(Array(pattern));
        }
        return(this); 
    }


    protected onPatternElementMatchingSuccess(
        patternElement: IPattern,
        stringToParseMatchingsList: IStringToParseMatchingsList,
        stringToParse: IStringToParse
    ): void {
        this.addStringToParseMatchingsList(stringToParseMatchingsList);

    }

    protected onPatternElementMatchingFail(): void {

    }


    protected onBeforeSearchMatchings(stringToParse: IStringToParse): void {
    }

    protected onAfterSearchMatchings(stringToParse: IStringToParse): void {
    } 
    
    
    private addStringToParseMatchingsList(
        stringToParseMatchingsList: IStringToParseMatchingsList
    ): void {
        this.defineStringToParseNextMatchingsListIfNotDefined();
        console.log(`addStringToParseMatching de`, stringToParseMatchingsList, 'à', this.stringToParseNextMatchingsListOrNull);        
        this.stringToParseNextMatchingsListOrNull.addStringToParseMatching( stringToParseMatchingsList );      

    }

    private defineStringToParseNextMatchingsListIfNotDefined(): void {
        if (this.stringToParseNextMatchingsListOrNull === null) {
            this.stringToParseNextMatchingsListOrNull = this.createStringToParseMatchingsList(this);
        }

    }     

}