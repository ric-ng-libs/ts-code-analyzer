import { StringOrNull, TypesTester } from '@ric-ng/ts-general';
import { ISimplePattern, IStringToParse, IStringToParseMatching } from "./../interfaces";
import { StringToParseMatchingsListOrNull } from "./../types";

import { AChildablePattern } from "./AChildablePattern";

import { StringToParseMatching } from "./../concreteClasses";


export abstract class ASimplePattern extends AChildablePattern implements ISimplePattern {

    private static defaultCaseSensitivity: boolean = true;

    private string: string;
    private caseSensitivity: boolean;

    
    static setDefaultCaseSensitivity(caseSensitivity: boolean): void {
        this.defaultCaseSensitivity = caseSensitivity;
    }

    protected abstract getStringToParseMinimalLength(): number;

    protected abstract getStringToCompare(stringToParseAsString: string): string;

    protected abstract getStringToParseMatching(stringToCompare: string): StringOrNull;
        
    
    constructor(string: string, caseSensitivity: boolean = ASimplePattern.defaultCaseSensitivity) {
        super();

        this.setString(string);
        this.setCaseSensitivity(caseSensitivity);
    }
    
    setString(string: string): ISimplePattern {
        if (string !== null && TypesTester.isNotEmptyString(string)) {
            this.string = string;
        } else throw new Error("Not empty string expected.");
        return(this);
    }
    getString(): string {
        return(this.string);
    }

    setCaseSensitivity(caseSensitivity: boolean): ISimplePattern {
        this.caseSensitivity = caseSensitivity;
        return(this);
    }
    isCaseSensitivity(): boolean {
        return(this.caseSensitivity);
    }

    listStringToParseNextMatchings(stringToParse: IStringToParse): StringToParseMatchingsListOrNull {

        const string: string = this.getString();
        console.log(`\n\n**** stringPattern: '${string}' (Length: ${string.length});  caseSensitivity: ${this.isCaseSensitivity()}`);
        const stringToParseAsString: string = stringToParse.getRemainingStringToParse();
        let stringToCompare: string;
        let stringToParseMatching: StringOrNull;
        if ((string !== "") && (stringToParseAsString.length >= this.getStringToParseMinimalLength())) {
            console.log(`stringToParseAsString: '${stringToParseAsString}'   (${stringToParseAsString.length})`);
            
            stringToCompare = this.getStringToCompare(stringToParseAsString);
            console.log(`stringToCompare: '${stringToCompare}'  (${stringToCompare.length})`);
            stringToParseMatching = this.getStringToParseMatching(stringToCompare);
            console.log(`>>> stringToParseMatching: '${stringToParseMatching}'`, "<<<\n\n");
            if ((stringToParseMatching !== null) /*&& (stringToParseMatching.length>0)*/) {
                console.log(`>>> stringToParseMatching not null: '${stringToParseMatching}' (${stringToParseMatching.length})`, "<<<\n\n");
                console.log(`onMatchingSuccess !! true`);
                this.onMatchingSuccess(stringToParseMatching, stringToParse);
                
            }  else {
                console.log(`onMatchingFAIL !`);
                this.onMatchingFail();
            }

        }

        return (this.stringToParseNextMatchingsListOrNull);
    }

    
    protected onMatchingSuccess(
        stringToParseMatchingAsString: string,
        stringToParse: IStringToParse
    ): void {
        const stringToParseMatching: IStringToParseMatching = this.createStringToParseMatchingObject(
            stringToParseMatchingAsString,
            stringToParse.getPointerPosition()
        );

        this.assignStringToParseMatchingsList(stringToParseMatching);

    }


    protected onMatchingFail(): void {
    }
    

    private assignStringToParseMatchingsList(stringToParseMatching: IStringToParseMatching): void {
        this.defineStringToParseNextMatchingsListIfNotDefined();        
        this.stringToParseNextMatchingsListOrNull = this.createStringToParseMatchingsList(
            Array(stringToParseMatching)
        );
    }
    
    
    private createStringToParseMatchingObject(
        stringToParseMatching: string,
        stringToParsePointerPosition: number, 
    ): IStringToParseMatching {
        const result: IStringToParseMatching = new StringToParseMatching(
            this, 
            stringToParseMatching,
            stringToParsePointerPosition
        );
        return(result);
    }     
   
}