import { StringOrNull, TypesTester } from '@ric-ng/ts-general';

import { IStringToParseSimpleMatchingOrNull, IStringToParseMatchingOrNull } from "./../types";
import { ISimplePattern, IStringToParse, IStringToParseSimpleMatching } from "./../interfaces";

import { AChildablePattern } from "./AChildablePattern";

import { StringToParseSimpleMatching } from "./../concreteClasses/StringToParseSimpleMatching";


export abstract class ASimplePattern extends AChildablePattern implements ISimplePattern {

    private static defaultCaseSensitivity: boolean = true;

    private string: string;
    private caseSensitivity: boolean;

    private stringToParseNextSimpleMatchingOrNull: IStringToParseSimpleMatchingOrNull;

    
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

    
    getStringToParseNextMatching(stringToParse: IStringToParse): IStringToParseMatchingOrNull {
        this.stringToParseNextSimpleMatchingOrNull = null;

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
console.log(`       >>> stringToParseMatching not null: '${stringToParseMatching}' `
                            +`(${stringToParseMatching.length})`, "<<<\n\n");
console.log(`       onMatchingSuccess ASimplePattern !! true`);
                this.onMatchingSuccess(stringToParseMatching, stringToParse);
                
            }  else {
console.log(`       onMatchingFAIL ASimplePattern !`);
                this.onMatchingFail();
            }

        }

        return (this.stringToParseNextSimpleMatchingOrNull);
    }

    
    private onMatchingSuccess(
        stringToParseMatchingAsString: string,
        stringToParse: IStringToParse
    ): void {
        this.stringToParseNextSimpleMatchingOrNull = this.createStringToParseSimpleMatching(
            stringToParseMatchingAsString,
            stringToParse.getPointerPosition()
        );

    }


    private onMatchingFail(): void {
    }
    
    private createStringToParseSimpleMatching(
        stringToParseMatchingAsString: string,
        stringToParsePointerPosition: number, 
    ): IStringToParseSimpleMatching {
        const result: IStringToParseSimpleMatching = new StringToParseSimpleMatching(
            this, 
            stringToParseMatchingAsString,
            stringToParsePointerPosition
        );
        return(result);
    }     
   
}