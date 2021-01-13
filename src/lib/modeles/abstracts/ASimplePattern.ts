import { StringOrNull } from '@ric-ng/ts-general';
import { ISimplePattern, IStringToParse, IStringToParseMatching } from "./../interfaces";
import { StringToParseMatchingsListOrNull } from "./../types";

import { APattern } from "./APattern";


export abstract class ASimplePattern extends APattern implements ISimplePattern {

    private static defaultCaseSensitivity: boolean = true;

    private string: string;
    private caseSensitivity: boolean;

    
    static setDefaultCaseSensitivity(caseSensitivity: boolean): void {
        this.defaultCaseSensitivity = caseSensitivity;
    }

    protected abstract getStringToParseMinimalLength(): number;

    protected abstract getStringToCompare(stringToParseAsString: string): string;

    protected abstract getStringToParseMatching(stringToCompare: string): StringOrNull;
        
    
    constructor(string: string = "", caseSensitivity: boolean = ASimplePattern.defaultCaseSensitivity) {
        super();

        this.setString(string);
        this.setCaseSensitivity(caseSensitivity);
    }
    
    setString(string: string): ISimplePattern {
        if (string !== null) {
            this.string = string;
        }
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

    getStringToParseMatchings(stringToParse: IStringToParse): StringToParseMatchingsListOrNull {

        this.onBeforeSearchMatching(stringToParse);

        const string: string = this.getString();
        console.log(`\n\n*string: ${string} (Length: ${string.length});  caseSensitivity: ${this.isCaseSensitivity()}`);
        const stringToParseAsString: string = stringToParse.getRemainingStringToParse();
        let stringToCompare: string;
        let stringToParseMatching: StringOrNull;
        if ((string !== "") && (stringToParseAsString.length >= this.getStringToParseMinimalLength())) {

            stringToCompare = this.getStringToCompare(stringToParseAsString);
            stringToParseMatching = this.getStringToParseMatching(stringToCompare);
            console.log(`stringToParseAsString: ${stringToParseAsString}`);
            console.log(`stringToCompare: ${stringToCompare}`);
            console.log(`stringToParseMatching: ${stringToParseMatching}`);
            if (stringToParseMatching !== null) {
                this.onMatchingSuccess(stringToParseMatching, stringToParse);
            }  

        }

        this.onAfterSearchMatching(stringToParse);

        return (this.stringToParseMatchingsListOrNull);
    }

    
    protected onMatchingSuccess(
        stringToParseMatchingAsString: string,
        stringToParse: IStringToParse
    ): void {
        const stringToParseMatching: IStringToParseMatching = this.createStringToParseMatchingObject(
            this,
            stringToParseMatchingAsString,
            stringToParse.getPointerPosition()
        );

        this.assignStringToParseMatchingsList(stringToParseMatching);

    }


    protected onBeforeSearchMatching(stringToParse: IStringToParse): void {
        this.stringToParseMatchingsListOrNull = null;
    }
    protected onAfterSearchMatching(stringToParse: IStringToParse): void {
        
    } 


    private assignStringToParseMatchingsList(stringToParseMatching: IStringToParseMatching): void {
        this.defineStringToParseMatchingsListIfNotDefined();        
        this.stringToParseMatchingsListOrNull = this.createStringToParseMatchingsList(
            Array(stringToParseMatching)
        );
    }    
   
}