export interface IStringToParse {
    
    setString(string: string): IStringToParse;
    getStringFromPointerPosition(lengthToRead: number): string;
    getRemainingStringToParse(): string;
    getStringLength(): number;
    
    getMaxPointerPosition(): number;
    isPointerAtTheEnd(): boolean;
    
    savePointerPosition(): IStringToParse;
    cancelLastSavedPointerPosition(): IStringToParse;
    restoreLastSavedPointerPosition(): IStringToParse;

    setPointerPosition(pointerPosition: number): IStringToParse;
    getPointerPosition(): number;
    incrementPointerPosition(increment: number): IStringToParse;
}