import { IClass, IInterface } from './../../interfaces';

export class Class implements IClass {
    
    private privacy: string = "";
    private abstract: boolean = false;
    private name: string = "";

    private implementedInterfaces: Array<IInterface> = [];
    private directParentClasses: Array<IClass> = [];


    setPrivacy(privacy: string): IClass {
        this.privacy = privacy;
        return(this);
    }
    getPrivacy(): string {
        return(this.privacy);
    }

    setAbstract(abstract: boolean): IClass {
        this.abstract = abstract;
        return(this);
    }
    getAbstract(): boolean {
        return(this.abstract);
    }

    setName(name: string): IClass {
        this.name = name;
        return(this);
    }
    getName(): string {
        return(this.name);
    }

    setImplementedInterfaces(implementedInterfaces: Array<IInterface>): IClass {
        this.implementedInterfaces = implementedInterfaces;
        return(this);
    }
    getImplementedInterfaces(): Array<IInterface> {
        return(this.implementedInterfaces)
    }

    setDirectParentClasses(directParentClasses: Array<IClass>): IClass {
        this.directParentClasses = directParentClasses;
        return(this);
    }
    getDirectParentClasses(): Array<IClass> {
        return(this.directParentClasses);
    }     

}