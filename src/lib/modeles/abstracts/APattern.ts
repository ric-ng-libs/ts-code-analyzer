import { IPattern, IStringToParse, IStringToParseMatching, IStringToParseMatchingsList } from "./../interfaces";
import { StringToParseMatchingsListOrNull, StringToParseMatchingsOrNull } from "./../types";


export abstract class APattern implements IPattern {

    private static readonly PATTERN_MAX_CONSECUTIVE_MATCHINGS_NUMBER: number = 50;
    private static readonly PATTERN_MAX_CONSECUTIVE_MATCHINGS_NUMBER_UNDEFINED_VALUE: number = null;

    private consecutiveMatchingsMinNumber: number = 1;
    private consecutiveMatchingsMaxNumber: number = APattern.PATTERN_MAX_CONSECUTIVE_MATCHINGS_NUMBER_UNDEFINED_VALUE;

    protected stringToParseNextMatchingsOrNull: StringToParseMatchingsOrNull = null;
    private stringToParseNextConsecutiveMatchingsListOrNull: StringToParseMatchingsListOrNull = null;


    constructor() {
    }

    //@return { StringToParseMatchingsListOrNull }
    abstract listStringToParseNextMatchings(stringToParse: IStringToParse): StringToParseMatchingsOrNull;

    protected abstract createStringToParseMatchingsList(stringToParseMatchings?: Array<IStringToParseMatching>)
        : IStringToParseMatchingsList
    ;

    public debugString(indent: number = 0): string {
        let indentString: string;
        indentString=" ".repeat(indent+4);
    
        return(
                `${indentString}${this.constructor.name} / [${this.consecutiveMatchingsMinNumber}, ${this.consecutiveMatchingsMaxNumber}]`
            );
    }    
    protected debug(): void {
        console.log(this.debugString());
    }
    

    //@return { StringToParseMatchingsListOrNull } null if fails, id est the consecutive matchings number is out of range ([min, max]).
    listStringToParseNextConsecutiveMatchings(stringToParse: IStringToParse): StringToParseMatchingsListOrNull {
        let stringToParseNextConsecutiveMatchingsNumber: number = 0;
        let fail: boolean = false;
        let match: boolean;
        let matchLength: number = 0;
        
        stringToParse.savePointerPosition();
        
        this.stringToParseNextConsecutiveMatchingsListOrNull = null;
        console.log(`\n\n************ START root ; ${this.constructor.name} : listStringToParseNextConsecutiveMatchings **************************************`);
        this.debug();
        while( !stringToParse.isPointerAtTheEnd() ) {
            this.stringToParseNextMatchingsOrNull = null;
            console.log(`IN loop beginning, calling this.listStringToParseNextMatchings('${stringToParse.getStringFromPointerPosition(50)}.....')`);
            this.listStringToParseNextMatchings(stringToParse);
            match = ( this.stringToParseNextMatchingsOrNull !== null );
            matchLength = undefined;
            console.log(`  *>root match= ${match}; this ; (constructor.name=${this.constructor.name}) :`);
            this.debug();
            if (match) {
                matchLength = this.stringToParseNextMatchingsOrNull.getTotalLength();
                console.log(`  *>root match OK; matchLength = ${matchLength}`);
                stringToParseNextConsecutiveMatchingsNumber++;
    
                console.log(`  >>>ConsecutiveMatchingsNumber: ${stringToParseNextConsecutiveMatchingsNumber} / `+
                `${this.consecutiveMatchingsMaxNumber}`);

                if (this.isDefinedConsecutiveMatchingsMaxNumber()) {
                    fail = ( stringToParseNextConsecutiveMatchingsNumber > this.consecutiveMatchingsMaxNumber );
                    console.log(`isDefinedConsecutiveMatchingsMaxNumber - fail=${fail}`);
                    if (fail) console.log(`FAIL: over match number !! ${stringToParseNextConsecutiveMatchingsNumber} > ${this.consecutiveMatchingsMaxNumber}`);
                    console.log(`::>  ${stringToParseNextConsecutiveMatchingsNumber} / ${this.consecutiveMatchingsMaxNumber} MAX.`);

                }

                if (!fail) {
                    console.log(`** !!!!!!!!! OK ajout à la liste de :`);
                    console.log(this.stringToParseNextMatchingsOrNull.getElements());
                    this.addStringToParseNextMatchingsListToConsecutiveMatchingsList();
                    // incrementValue = Math.min(matchLength,
                    //                           stringToParse.getRemainingStringToParse().length - 1);
                    console.log(`Pointer position = ${stringToParse.getPointerPosition()}/${stringToParse.getMaxPointerPosition()},`+
                                `on veut incrém. de ${matchLength}  ;  `+
                                `avec Remaining stringToParseLength = ${stringToParse.getRemainingStringToParse().length}`
                                );
                    stringToParse.incrementPointerPosition(matchLength);
                    
                    console.log(`\n\n`);
     
    
                }

            } else console.log(`  *>root match NOT ok\n\n`);

            if (fail || !match  ||  (match && matchLength === 0)  ||  stringToParse.isPointerAtTheEnd()) {
                console.log(`SORTIE break DE BOUCLE : match= ${match}; matchLength=${matchLength} ;   fail=${fail};  (stringToParse.isPointerAtTheEnd()=${stringToParse.isPointerAtTheEnd()})\n\n`);
                break;

            }   else {
                console.log(`autorise REBOUCLAGE : match= ${match}; matchLength=${matchLength} ;  ConsecutiveMatchingsNumber=${stringToParseNextConsecutiveMatchingsNumber} ; fail=${fail};  stringToParse.isPointerAtTheEnd()=${stringToParse.isPointerAtTheEnd()}\n\n`);

            }         


        }
console.log(`En sortie de while:  match= ${match}; matchLength=${matchLength} ;  ConsecutiveMatchingsNumber=${stringToParseNextConsecutiveMatchingsNumber} ;  fail=${fail};  stringToParse.isPointerAtTheEnd()=${stringToParse.isPointerAtTheEnd()}`);

        if (!fail) {
            fail = ( stringToParseNextConsecutiveMatchingsNumber < this.consecutiveMatchingsMinNumber );        
            if (fail) console.log(`FAIL: NOT ENOUGH match number !! ${stringToParseNextConsecutiveMatchingsNumber} < ${this.consecutiveMatchingsMinNumber}`);
            console.log(`::>  ${stringToParseNextConsecutiveMatchingsNumber} / ${this.consecutiveMatchingsMinNumber} MIN.`);

            if (!match && this.consecutiveMatchingsMinNumber === 0 && stringToParseNextConsecutiveMatchingsNumber === 0) {
                    console.log(`>>>> MINIMUM à 0 donc on crée un resultat VIDE mais non null !!!!!`); 
                    this.defineStringToParseNextConsecutiveMatchingsListIfNotDefined(); //Empty list, just for a result <> null.
            }
        }

        if (fail) {
            console.log(`FAIL(min ou max)[  ${stringToParseNextConsecutiveMatchingsNumber} / ${this.consecutiveMatchingsMinNumber}   ;   ${stringToParseNextConsecutiveMatchingsNumber} / ${this.consecutiveMatchingsMaxNumber}]   donc --> MISE A NULL du root result`);
            this.stringToParseNextConsecutiveMatchingsListOrNull = null;
        }

        stringToParse.restoreLastSavedPointerPosition();

        console.log(`FINAL root result, for : `);
        this.debug();
        console.log((this.stringToParseNextConsecutiveMatchingsListOrNull)? this.stringToParseNextConsecutiveMatchingsListOrNull.getElements() : this.stringToParseNextConsecutiveMatchingsListOrNull);
        console.log(`\n\n`);
        return(this.stringToParseNextConsecutiveMatchingsListOrNull);
    }


    private addStringToParseNextMatchingsListToConsecutiveMatchingsList(): void {
        this.defineStringToParseNextConsecutiveMatchingsListIfNotDefined();

        this.stringToParseNextConsecutiveMatchingsListOrNull.addStringToParseMatching(
            this.stringToParseNextMatchingsOrNull
        );

    }

    private defineStringToParseNextConsecutiveMatchingsListIfNotDefined(): void {
        if (this.stringToParseNextConsecutiveMatchingsListOrNull === null) {
            this.stringToParseNextConsecutiveMatchingsListOrNull = this.createStringToParseMatchingsList();
        }

    }
    

    setConsecutiveMatchingsMinNumber(consecutiveMatchingsMinNumber: number): IPattern {
        this.consecutiveMatchingsMinNumber = consecutiveMatchingsMinNumber;
        this.checkValidConsecutiveMatchingsMinMaxNumbers();
        return (this);
    }
    getConsecutiveMatchingsMinNumber(): number {
        return (this.consecutiveMatchingsMinNumber);
    }

    setConsecutiveMatchingsMaxNumber(consecutiveMatchingsMaxNumber: number): IPattern {
        this.consecutiveMatchingsMaxNumber = consecutiveMatchingsMaxNumber;
        this.checkValidConsecutiveMatchingsMinMaxNumbers();
        return (this);
    }
    getConsecutiveMatchingsMaxNumber(): number {
        return (this.consecutiveMatchingsMaxNumber);
    }
    isDefinedConsecutiveMatchingsMaxNumber(): boolean {
        const result: boolean = (this.consecutiveMatchingsMaxNumber !== APattern.PATTERN_MAX_CONSECUTIVE_MATCHINGS_NUMBER_UNDEFINED_VALUE);
        return (result);
    }    

    setConsecutiveMatchingsNumbers(
        consecutiveMatchingsMinNumber: number, 
        consecutiveMatchingsMaxNumber: number = APattern.PATTERN_MAX_CONSECUTIVE_MATCHINGS_NUMBER_UNDEFINED_VALUE
    ): IPattern {
        this.setConsecutiveMatchingsMinNumber(consecutiveMatchingsMinNumber);
        this.setConsecutiveMatchingsMaxNumber(consecutiveMatchingsMaxNumber);
        return (this);
    }

    private checkValidConsecutiveMatchingsMinMaxNumbers(): void {
        const ok: boolean = this.testValidConsecutiveMatchingsMinMaxNumbers();
        if (!ok) {
            throw new Error(`Nombre de matchings consécutifs min et/ou max invalide :  `+ 
                            ` min=${this.consecutiveMatchingsMinNumber}  ou  max=${this.consecutiveMatchingsMaxNumber}.`
                           );
        }
    }
    private testValidConsecutiveMatchingsMinMaxNumbers(): boolean {
        let result: boolean = (this.consecutiveMatchingsMinNumber >= 0);

        if (result && this.isDefinedConsecutiveMatchingsMaxNumber()) {
            result = (this.consecutiveMatchingsMaxNumber <= APattern.PATTERN_MAX_CONSECUTIVE_MATCHINGS_NUMBER)
                        &&
                     (this.consecutiveMatchingsMaxNumber >= this.consecutiveMatchingsMinNumber)
                    ;
        }

        return (result);
    }


}