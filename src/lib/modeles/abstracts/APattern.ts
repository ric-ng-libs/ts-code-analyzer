import { IPattern, IStringToParse, IStringToParseMatching, IStringToParseMatchingsList } from "./../interfaces";
import { StringToParseMatchingsListOrNull } from "./../types";

import { StringToParseMatching } from "./../concreteClasses/StringToParseMatching";
import { StringToParseMatchingsList } from "./../concreteClasses/StringToParseMatchingsList";


export abstract class APattern implements IPattern {

    private static readonly PATTERN_MAX_OCCURENCES_NUMBER: number = 50;
    private static readonly PATTERN_MAX_OCCURENCES_NUMBER_NOT_DEFINED: number = null;

    private minOccurencesNumber: number = 1;
    private maxOccurencesNumber: number = APattern.PATTERN_MAX_OCCURENCES_NUMBER_NOT_DEFINED;

    protected stringToParseMatchingsListOrNull: StringToParseMatchingsListOrNull = null;


    constructor() {
    }

    abstract getStringToParseMatchings(stringToParse: IStringToParse): StringToParseMatchingsListOrNull;
       

    setMinOccurencesNumber(minOccurencesNumber: number): IPattern {
        this.minOccurencesNumber = minOccurencesNumber;
        this.checkValidNbOccurences();
        return (this);
    }
    getMinOccurencesNumber(): number {
        return (this.minOccurencesNumber);
    }

    setMaxOccurencesNumber(maxOccurencesNumber: number): IPattern {
        this.minOccurencesNumber = maxOccurencesNumber;
        this.checkValidNbOccurences();
        return (this);
    }
    getMaxOccurencesNumber(): number {
        return (this.maxOccurencesNumber);
    }
    setOccurencesNumbers(
        minOccurencesNumber: number, 
        maxOccurencesNumber: number = APattern.PATTERN_MAX_OCCURENCES_NUMBER_NOT_DEFINED
    ): IPattern {
        this.setMinOccurencesNumber(minOccurencesNumber);
        this.setMaxOccurencesNumber(maxOccurencesNumber);
        return (this);
    }


    isDefinedMaxOccurencesNumber(): boolean {
        const result: boolean = (this.maxOccurencesNumber !== APattern.PATTERN_MAX_OCCURENCES_NUMBER_NOT_DEFINED);
        return (result);
    }


    private checkValidNbOccurences(): void {
        const ok: boolean = this.testValidNbOccurences();
        if (!ok) {
            throw new Error(`Nombre d'occurences min=${this.minOccurencesNumber} ou max=${this.maxOccurencesNumber}, invalide.`);
        }
    }
    private testValidNbOccurences(): boolean {
        const result: boolean = (
            (this.minOccurencesNumber >= 0)
            &&
            (this.maxOccurencesNumber <= APattern.PATTERN_MAX_OCCURENCES_NUMBER)
            &&
            (this.maxOccurencesNumber >= this.minOccurencesNumber)
        );
        return (result);
    }

    
    protected createStringToParseMatchingsList(elements: Array<IStringToParseMatching> = [])
        : IStringToParseMatchingsList {

        const result: IStringToParseMatchingsList = new StringToParseMatchingsList(elements);
        return(result);

    }
    
    protected defineStringToParseMatchingsListIfNotDefined(): void {
        if (this.stringToParseMatchingsListOrNull === null) {
            this.stringToParseMatchingsListOrNull =this.createStringToParseMatchingsList();
        }

    }      

    protected createStringToParseMatchingObject(
        pattern: IPattern, 
        stringToParseMatching: string,
        stringToParsePointerPosition: number, 
    ): IStringToParseMatching {
        const masterPattern: IPattern = (pattern === this)? null : this;
        const result: IStringToParseMatching = new StringToParseMatching(
            masterPattern,
            pattern, 
            stringToParseMatching,
            stringToParsePointerPosition
        );
        return(result);
    }  

}