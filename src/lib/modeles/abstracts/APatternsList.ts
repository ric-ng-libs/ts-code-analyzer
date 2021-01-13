import { GenericList } from "@ric-ng/ts-general";
import { IPattern, IPatternsList } from "./../interfaces";
import { APattern } from "./APattern";


export abstract class APatternsList extends APattern implements IPatternsList {

    protected list: GenericList<IPattern>;

    constructor() {
        super();

        this.list = new GenericList<IPattern>();
        this.list.setAllowNullElement(false);
    }
    
    definePatterns(patterns: Array<IPattern>): IPatternsList {
        if (patterns !== null) {
            this.list.clear();
            this.addPatterns(patterns);
        }
        return(this);
    }

    definePattern(pattern: IPattern): IPatternsList {
        if (pattern !== null) {
            this.definePatterns(Array(pattern));
        }
        return(this);         
    }

    addPatterns(patterns: Array<IPattern>): IPatternsList {
        if (patterns !== null) {
            this.list.addElements(patterns);
        }
        return(this);        
    }

    addPattern(pattern: IPattern): IPatternsList {
        if (pattern !== null) {
            this.list.addElement(pattern);
        }
        return(this); 
    }    

}