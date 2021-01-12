import { IPattern, IStringToParseMatching, IStringToParse } from "./../interfaces";
import { StringToParseMatchingsListOrNull } from "./../types";
import { StringToParseMatchingsList } from "../concreteClasses/StringToParseMatchingsList";


export abstract class AStringParser {

    //@return {Array<IStringToParseMatching> | null} null if matching fails.
    // getPatternMatchingOccurences(centralPattern: IPattern, stringToParse: IStringToParse)
    //     : StringToParseMatchingsListOrNull {

    //     let result: Array<IStringToParseMatching> = [];

    //     stringToParse.savePointerPosition();

    //     const centralPatternPrecedingPatterns: Array<IPattern> = centralPattern.getPrecedingPatterns();
    //     const centralPatternFollowingPatterns: Array<IPattern> = centralPattern.getFollowingPatterns();

    //     const allPatterns: Array<IPattern> = []
    //                                         .concat(centralPatternPrecedingPatterns)
    //                                         .concat(centralPattern)
    //                                         .concat(centralPatternFollowingPatterns)
    //                                         ;
        
    //     let matchingOccurences: Array<IStringToParseMatching>;
    //     for(const pattern of allPatterns) {
    //         matchingOccurences = (pattern === centralPattern) ?
    //                                  this.getPatternStringToParseMatchings(pattern, stringToParse)
    //                              :
    //                                  this.getPatternMatchingOccurences(pattern, stringToParse)
    //                              ;
    //         if ( matchingOccurences === null ) {
    //             break;
    //         }         
    //         result = result.concat( matchingOccurences );
    //     }
        
    //     if ( matchingOccurences === null ) {
    //         result = null;
    //         stringToParse.restoreLastSavedPointerPosition();

    //     } else {
    //         stringToParse.cancelLastSavedPointerPosition();
    //     }

    //     return(result);
    // }

    //@return {Array<IStringToParseMatching> | null} null if matching fails.
    private getPatternStringToParseMatchings(pattern: IPattern, stringToParse: IStringToParse)
        : StringToParseMatchingsListOrNull {

        let result: StringToParseMatchingsListOrNull = null;
        if (!stringToParse.isPointerAtTheEnd()) {
            let isBadMatchingOccurencesNumber: boolean = false;
    
            let stringToParseMatchings: StringToParseMatchingsListOrNull;
            let isStringToParseMatchings: boolean;

            result = new StringToParseMatchingsList();
            stringToParse.savePointerPosition();
            do {
                stringToParseMatchings = pattern.getStringToParseMatchings(
                    stringToParse
                );
                
                isStringToParseMatchings = (stringToParseMatchings !== null);
                if (isStringToParseMatchings)  {

                    result.addElementsFromList( stringToParseMatchings );
                    
                    isBadMatchingOccurencesNumber = this.hasFoundTooManyMatchingOccurences(
                        pattern, 
                        result.getElementsNumber()
                    );
    
                    stringToParse.incrementPointerPosition(stringToParseMatchings.getTotalLength());
                }            
    
            } while(isStringToParseMatchings && !isBadMatchingOccurencesNumber && !stringToParse.isPointerAtTheEnd());
    
    
            if (!isBadMatchingOccurencesNumber) {
                isBadMatchingOccurencesNumber = this.hasFoundNotEnoughMatchingOccurences(
                    pattern, 
                    result.getElementsNumber()
                );
            }
    
            if (isBadMatchingOccurencesNumber) {
                result = null;
                stringToParse.restoreLastSavedPointerPosition();

            } else {
                stringToParse.cancelLastSavedPointerPosition();

            }
        }        

        return(result);
    }
    
    private hasFoundTooManyMatchingOccurences(pattern: IPattern, matchingOccurencesNumber: number): boolean {
        let result: boolean = false;

        if (pattern.isDefinedMaxOccurencesNumber()) {
            result = (matchingOccurencesNumber > pattern.getMaxOccurencesNumber());
        }

        return(result);
    }

    private hasFoundNotEnoughMatchingOccurences(pattern: IPattern, matchingOccurencesNumber: number): boolean {
        const result: boolean =  (matchingOccurencesNumber < pattern.getMinOccurencesNumber());
        return(result);
    }

}