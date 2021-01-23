import { ScoreValues } from '../score-values'

/**
 * ScrabbleSortingService.
 *
 * @remarks
 * This is our ScrabbleSortingService service which purpose is to return a list of words sorted by Scrabble score.
 * From highest Scrabble score to lowest Scrabble score.
 * 
 * @param anagrams - The first and only service parameter must be an array of strings which represent the result
 * of scrabble words.
 * 
 * @returns a list of words sorted by Scrabble score.
 */
export const ScrabbleSortingService = (anagrams: String[]) => {
    let score: number
    return anagrams.map((anagram: String) => {
        score = 0;
        [...anagram].forEach(letter => {
            for (const value in ScoreValues) {
                if (value.includes(letter.toUpperCase())) {
                    score += Number(ScoreValues[value])
                }
            }
        })
        return {
            anagram,
            score
        }
    }).sort((a: any, b: any) => b.score - a.score).map((e) => {
        return e.anagram
    })
}