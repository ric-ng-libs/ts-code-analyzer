import { StringOrNull, TypesTester } from '@ric-ng/ts-general';

import { IStringToParseSimpleMatchingOrNull, IStringToParseMatchingOrNull } from "./../types";
import { ISimplePattern, IStringToParse, IStringToParseSimpleMatching, IPatternDebugInfos } from "./../interfaces";

import { APattern } from "./APattern";

import { StringToParseSimpleMatching } from "./../concreteClasses/StringToParseSimpleMatching";


export abstract class ASimplePattern extends APattern implements ISimplePattern {

    private static defaultCaseSensitivity: boolean = true;

    private string: string;
    private caseSensitivity: boolean;

    private stringToParseNextSimpleMatchingOrNull: IStringToParseSimpleMatchingOrNull;

    static setDefaultCaseSensitivity(caseSensitivity: boolean): void {
        this.defaultCaseSensitivity = caseSensitivity;
    }

    getDebugInfos(): IPatternDebugInfos {
        const oParentDebugInfos: IPatternDebugInfos = super.getDebugInfos();
        const result: IPatternDebugInfos = Object.assign({
            'str pattern': `'${this.getString().replaceCRLFBy()}'(${this.getString().length})`,
            id: oParentDebugInfos.id,
            constructorName: oParentDebugInfos.constructorName
        }, oParentDebugInfos);
        
        return(result);
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

    
    protected getStringToParseNextMatching(stringToParse: IStringToParse): IStringToParseMatchingOrNull {
        this.stringToParseNextSimpleMatchingOrNull = null;

        let stringToCompare: string;
        let stringToParseMatching: StringOrNull;
        const string: string = this.getString();
        const stringToParseAsString: string = stringToParse.getRemainingStringToParse();

        if ((string !== "") && (stringToParseAsString.length >= this.getStringToParseMinimalLength())) {

            stringToCompare = this.getStringToCompare(stringToParseAsString);
            stringToParseMatching = this.getStringToParseMatching(stringToCompare);

            if ((stringToParseMatching !== null) /*&& (stringToParseMatching.length>0)*/) {
                this.onMatchingSuccess(stringToParseMatching, stringToParse);
                
            }  else {
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
        stringToParsePointerPosition: number
    ): IStringToParseSimpleMatching {
        const result: IStringToParseSimpleMatching = new StringToParseSimpleMatching(
            this, 
            stringToParseMatchingAsString,
            stringToParsePointerPosition
        );
        return(result);
    }     
   
}