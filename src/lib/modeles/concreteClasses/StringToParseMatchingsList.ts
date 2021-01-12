import { GenericList } from '@ric-ng/ts-general';
import { IStringToParseMatching, IStringToParseMatchingsList } from './../interfaces';


export class StringToParseMatchingsList 
    extends GenericList<IStringToParseMatching> 
    implements IStringToParseMatchingsList {

    constructor(elements: Array<IStringToParseMatching> = []) {
        super(elements);

        this.setAllowNullElement(false);
    }

    getTotalLength(): number {
        let result: number = 0;

        this.each<void>(

            (element: IStringToParseMatching): void => {
                const stringToParseMatchingLength: number = element.getStringToParseMatchingLength();
                result += stringToParseMatchingLength;
            }

        );

        return(result);
    }
    
}