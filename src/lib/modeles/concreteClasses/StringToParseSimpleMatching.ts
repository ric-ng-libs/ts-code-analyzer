import { StringOrNull, NumberOrNull } from '@ric-ng/ts-general';

import { 
    IPattern, 
    IStringToParseSimpleMatching, 
} from "./../interfaces";

import { AStringToParseMatching } from './../abstracts/AStringToParseMatching';


export class StringToParseSimpleMatching
    extends  AStringToParseMatching
    implements IStringToParseSimpleMatching {
    
    private pointerPosition: NumberOrNull = null;


    constructor(
        pattern: IPattern, 
        stringToParseMatching: string,
        pointerPosition: number
    ) {
        super(pattern);

        this.setAsString(stringToParseMatching);
        this.setPointerPosition(pointerPosition);
    }
   

    getAsString(): StringOrNull {
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
        if (pointerPosition !== null) {
            this.pointerPosition = pointerPosition;
        }
    }

}