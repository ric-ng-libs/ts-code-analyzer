import { GenericList } from "@ric-ng/ts-general";
import { IChildablePattern, IPatternsList } from "./../interfaces";
import { AChildablePattern } from "./AChildablePattern";


export abstract class APatternsList extends AChildablePattern implements IPatternsList {

    protected list: GenericList<IChildablePattern>;


    public debugString(indent: number = 0): string {
        let index: number = 0;
        let indentString: string;
        indentString=" ".repeat(indent);

        const infos: Array<string> = [];
        infos.push(`${super.debugString()} ; elems: [ (${this.list.getElementsNumber()}) \n`);
        for(const element of this.list.getElements()) {
            infos.push( `    ${indentString}[${index++}]=> ${element.debugString(indent+4)}`  );
        }
        infos.push(`${indentString}]\n\n`);

        return( infos.join("\n") );

    }

    protected debug(): void {
        super.debug();
        // console.log(this.list.getElements());
        console.log(`\n`);
    }     

    constructor(patterns: Array<IChildablePattern> = []) {
        super();

        this.createList();
        this.definePatterns(patterns);
    }
    
    private createList(): void {
        this.list = new GenericList<IChildablePattern>();
        this.list.setAllowNullElement(false);
        
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