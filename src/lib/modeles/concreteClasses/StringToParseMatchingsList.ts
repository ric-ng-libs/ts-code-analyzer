import { IGenericList, GenericList, NumberOrNull, StringOrNull } from '@ric-ng/ts-general';

import { IStringToParseMatching, IStringToParseMatchingsList, IPattern } from './../interfaces';

import { AStringToParseMatching } from './../abstracts/AStringToParseMatching';


export class StringToParseMatchingsList 
    extends  AStringToParseMatching
    implements IStringToParseMatchingsList {

    private list: GenericList<IStringToParseMatching>;

    constructor(
        pattern: IPattern, 
        stringToParseMatchings: Array<IStringToParseMatching> = []
    ) {
        super(pattern);

        this.createList(stringToParseMatchings);
    }        

    private createList(stringToParseMatchings: Array<IStringToParseMatching> = []): void {
        if (stringToParseMatchings !== null) {
            this.list = new GenericList<IStringToParseMatching>(stringToParseMatchings);
            this.list.setAllowNullElement(false);
        }
    }

    getAsString(useCache: boolean = true): StringOrNull {
        if (this.asString === null || !useCache) {
            this.asString = this.computeGetAsString(useCache);
        }
        return(this.asString);
    }

    private computeGetAsString(useCache: boolean): StringOrNull {
        let result: StringOrNull = null;

        this.list.each<void>(

            (stringToParseMatching: IStringToParseMatching): void => {
                const stringToParseMatchingAsString: StringOrNull = stringToParseMatching.getAsString(useCache);
                if (stringToParseMatchingAsString !== null) {

                    if (result === null) {
                        result = "";
                    }
                    result += stringToParseMatchingAsString;

                }
            }

        );

        return(result);        
    }


    getPointerPosition(): NumberOrNull {
        const result: NumberOrNull = (!this.list.isEmpty())? this.list.getElementByIndex(0).getPointerPosition() : null;
        return(result);
    }
    
    
    interpret(): IStringToParseMatchingsList {
        super.interpret();
        this.interpretChildren();
        return(this);
    }
    private interpretChildren(): void {

        this.list.each(
            (stringToParseMatching: IStringToParseMatching) => {
                stringToParseMatching.interpret();
            }
        );
        
    }

    addStringToParseMatching(stringToParseMatching: IStringToParseMatching): IStringToParseMatchingsList {
        this.list.addElement(stringToParseMatching);
        return(this);
    }
    
}