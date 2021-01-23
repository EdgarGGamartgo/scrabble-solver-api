import _ from "lodash" 
import { ScrabbleSortingService } from './scrabble-sorting-service'

/**
 * AnagramSolverService.
 *
 * @remarks
 * This is our AnagramSolverService service which purpose is to return all possible words from our dictionary 
 * that can be spelled with the given letters. 
 * 
 * @param letters - The first service parameter must be a string which represent the given letters.
 * 
 * @param dictionary - The second service parameter must be an array of strings which represent the dictionary
 * of words.
 * 
 * @returns a list of all possible words sorted by Scrabble score.
 */
export const AnagramSolverService = (letters: string, dictionary: String[]) => {
    letters = letters.toLowerCase()
    var letters_count = _.countBy(letters)
    var anagrams = new Set()
     for (const word of dictionary) {
        // Check if all the unique letters in word are in the
        // scrambled letters 
        let wordsSet = new Set([...word]);
        let lettersSet = new Set([...letters]);
        let difference = new Set([...wordsSet].filter(x => !lettersSet.has(x)));
        if (difference.size === 0) {
            var check_word = new Set()
            // Check if the count of each letter is less than or equal
            // to the count of that letter in scrambled letter input
            for(const kv in _.countBy(word)) {
                if (_.countBy(word)[kv] <= letters_count[kv]) {
                    check_word.add(kv)
                }
            }
            const isSetsEqual = (a: any, b: any) => a.size === b.size && [...a].every(value => b.has(value));
            // Check if check_words is exactly equal to the unique letters
            // in the word of dictionary
            if (isSetsEqual(check_word, new Set([...word]))) {
                anagrams.add(word)
            }
        }
    }
    // Remove any empty entries in the anagrams set
    anagrams.delete('')
    // Return the result of scrabble words by scrabble score from highest to lowest scoring
    return ScrabbleSortingService([...anagrams] as string[])
}
