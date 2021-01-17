import { GenericList } from "@ric-ng/ts-general";
import { IChildablePattern, IPatternsList } from "./../interfaces";
import { AChildablePattern } from "./AChildablePattern";


export abstract class APatternsList extends AChildablePattern implements IPatternsList {

    protected list: GenericList<IChildablePattern>;

    constructor(patterns: Array<IChildablePattern> = []) {
        super();

        this.list = new GenericList<IChildablePattern>();
        this.list.setAllowNullElement(false);
        this.definePatterns(patterns);
    }
    
    definePatterns(patterns: Array<IChildablePattern>): IPatternsList {
        if (patterns !== null) {
            this.list.clear();
            this.addPatterns(patterns);
        }
        return(this);
    }

    definePattern(pattern: IChildablePattern): IPatternsList {
        if (pattern !== null) {
            this.definePatterns(Array(pattern));
        }
        return(this);         
    }

    addPatterns(patterns: Array<IChildablePattern>): IPatternsList {
        if (patterns !== null) {
            this.list.addElements(patterns);
            this.setParentPatternTo(patterns);
        }
        return(this);        
    }

    addPattern(pattern: IChildablePattern): IPatternsList {
        if (pattern !== null) {
            this.list.addElement(pattern);
            this.setParentPatternTo(Array(pattern));
        }
        return(this); 
    }

    setParentPatternTo(patterns: Array<IChildablePattern>): IPatternsList {
        for(const pattern of patterns) {
            pattern.setParentPattern(this);
        }
        return(this);
    }

}