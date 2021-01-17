import { IInterface } from './IInterface';

export interface IClass {
    setPrivacy(privacy: string): IClass;
    getPrivacy(): string;

    setAbstract(abstract: boolean): IClass;
    getAbstract(): boolean;

    setName(name: string): IClass;
    getName(): string;

    setImplementedInterfaces(implementedInterfaces: Array<IInterface>): IClass;
    getImplementedInterfaces(): Array<IInterface>;

    setDirectParentClasses(directParentClasses: Array<IClass>): IClass;
    getDirectParentClasses(): Array<IClass>;    
}
