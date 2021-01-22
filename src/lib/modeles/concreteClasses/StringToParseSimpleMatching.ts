import { NumberOrNull } from '@ric-ng/ts-general';

import { 
    IChildablePattern, 
    IStringToParseSimpleMatching, 
    IStringToParseMatching, 
    ILanguageStringToParseMatchingInterpreter 
} from "./../interfaces";

import { AStringToParseMatching } from './../abstracts/AStringToParseMatching';


export class StringToParseSimpleMatching
    extends  AStringToParseMatching
    implements IStringToParseSimpleMatching {
    
    private pointerPosition: NumberOrNull = null;


    constructor(
        pattern: IChildablePattern, 
        stringToParseMatching: string,
        pointerPosition: number
    ) {
        super(pattern);

        this.setAsString(stringToParseMatching);
        this.setPointerPosition(pointerPosition);
    }
   

    getAsString(): string {
        return(this.asString);
    }
    private setAsString(asString: string): void {
        if (asString !== null) {
            this.asString = asString;
        }
    }
    
    getPointerPosition(): NumberOrNull {
        return(this.pointerPosition);
    }    
    private setPointerPosition(pointerPosition: number): void {
        this.pointerPosition = pointerPosition;
    }

    interpret(): IStringToParseMatching {
        const languageStringToParseMatchingInterpreter: ILanguageStringToParseMatchingInterpreter = 
            this.getPattern().getLanguageStringToParseMatchingInterpreter();

        if (languageStringToParseMatchingInterpreter !== null) {
            console.log(`\nINTERPRETING FOR `);
            console.log(this);
            languageStringToParseMatchingInterpreter.interpret(this);
        }
        
        return(this);
    }


}