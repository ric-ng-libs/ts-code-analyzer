import { StringOrNull, TypesTester } from '@ric-ng/ts-general';
import { ISimplePattern, IStringToParse, IStringToParseMatching } from "./../interfaces";
import { StringToParseMatchingsOrNull } from "./../types";

import { AChildablePattern } from "./AChildablePattern";

import { StringToParseMatching } from "./../concreteClasses/StringToParseMatching";


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
        
    public debugString(indent: number = 0): string {
        let indentString: string;
        indentString=" ".repeat(indent);
        return(
            super.debugString(indent)+"  /  "+
            `: '${this.getString()}'(${this.getString().length})  /  caseSensitivity: ${this.isCaseSensitivity()}`
        );
    }

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

    listStringToParseNextMatchings(stringToParse: IStringToParse): StringToParseMatchingsOrNull {

        const string: string = this.getString();
        console.log(`\n\n       **** stringPattern: '${string}' (Length: ${string.length});  caseSensitivity: ${this.isCaseSensitivity()}`);
        const stringToParseAsString: string = stringToParse.getRemainingStringToParse();
        let stringToCompare: string;
        let stringToParseMatching: StringOrNull;
        if ((string !== "") && (stringToParseAsString.length >= this.getStringToParseMinimalLength())) {
            console.log(`       stringToParseAsString: '${stringToParseAsString}'   (${stringToParseAsString.length})`);
            
            stringToCompare = this.getStringToCompare(stringToParseAsString);
            console.log(`       stringToCompare: '${stringToCompare}'  (${stringToCompare.length})`);
            stringToParseMatching = this.getStringToParseMatching(stringToCompare);
            console.log(`       >>> stringToParseMatching: '${stringToParseMatching}'`, "<<<\n\n");
            if ((stringToParseMatching !== null) /*&& (stringToParseMatching.length>0)*/) {
                console.log(`       >>> stringToParseMatching not null: '${stringToParseMatching}' (${stringToParseMatching.length})`, "<<<\n\n");
                console.log(`       onMatchingSuccess ASimplePattern !! true`);
                this.onMatchingSuccess(stringToParseMatching, stringToParse);
                
            }  else {
                console.log(`       onMatchingFAIL ASimplePattern !`);
                this.onMatchingFail();
            }

        }

        return (this.stringToParseNextMatchingsOrNull);
    }

    
    private onMatchingSuccess(
        stringToParseMatchingAsString: string,
        stringToParse: IStringToParse
    ): void {
        this.stringToParseNextMatchingsOrNull = this.createStringToParseMatchingObject(
            stringToParseMatchingAsString,
            stringToParse.getPointerPosition()
        );

        // this.assignStringToParseMatchingsList(stringToParseMatching);

    }


    private onMatchingFail(): void {
    }
    

    // private assignStringToParseMatchingsList(stringToParseMatching: IStringToParseMatching): void {
    //     this.defineStringToParseNextMatchingsListIfNotDefined();        
    //     this.stringToParseNextMatchingsOrNull = this.createStringToParseMatchingObject();
    // }
    
    
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