import { IStringToParse } from "./../interfaces";


export class StringToParse implements IStringToParse {
    private string: string;

    private pointerPosition: number;
    private savedPointerPositions: Array<number> = [];
    private minPointerPosition: number = 0;
    private maxPointerPosition: number;


    constructor(string: string = "") {
        this.setString(string);
    }

    setString(string: string): IStringToParse {
        this.string = string;
        this.setMaxPointerPosition();
        this.resetPointerPosition();
        return (this);
    }

    getRemainingStringToParse(): string {
        const result: string = this.string.substr(this.pointerPosition);
        return(result);
    }

    getStringFromPointerPosition(lengthToRead: number): string {
        const result: string = this.string.substr(this.pointerPosition, lengthToRead);
        return(result);
    }    

    savePointerPosition(): IStringToParse {
        this.savedPointerPositions.push(this.pointerPosition);
        return(this);
    }
    cancelLastSavedPointerPosition(): IStringToParse {
        if (this.savedPointerPositions.length) {
           this.savedPointerPositions.pop();
        }
        return(this);
    }    
    restoreLastSavedPointerPosition(): IStringToParse {
        if (this.savedPointerPositions.length) {
            this.pointerPosition = this.savedPointerPositions.pop();
        }
        return(this);
    }    

    private setMaxPointerPosition(): IStringToParse {
        this.maxPointerPosition = this.string.length - 1;
        return (this);
    }

    private resetPointerPosition(): IStringToParse {
        this.setPointerPosition(0);
        return (this);
    }

    setPointerPosition(pointerPosition: number): IStringToParse {
        this.pointerPosition = pointerPosition;
        this.checkValidPointerPosition();
        return (this);
    }
    getPointerPosition(): number {
        return(this.pointerPosition);
    }

    incrementPointerPosition(increment: number): StringToParse {
        this.setPointerPosition(this.pointerPosition + increment);
        return (this);
    }

    isPointerAtTheEnd(): boolean {
        const result: boolean = (this.pointerPosition === this.maxPointerPosition);
        return (result);
    }

    private checkValidPointerPosition(): void {
        if (this.pointerPosition > this.maxPointerPosition) {
            throw new Error(this.getPointerPositionOverflowMessage());

        } else if (this.pointerPosition < this.minPointerPosition) {
            throw new Error(this.getPointerPositionOverflowMessage());
        }
    }

    private getPointerPositionOverflowMessage(): string {
        const result: string = `Impossible de pointer en position ${this.pointerPosition} ; Intervalle autorisé : ` +
            `[ ${this.minPointerPosition}, ${this.maxPointerPosition} ].`;
        return (result);
    }

}