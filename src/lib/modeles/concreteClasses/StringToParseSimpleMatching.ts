import { NumberOrNull, StringOrNull } from '@ric-ng/ts-general';

import { IChildablePattern, IStringToParseSimpleMatching } from "./../interfaces";

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


}