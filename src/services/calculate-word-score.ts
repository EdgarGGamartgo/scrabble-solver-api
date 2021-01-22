import { ScoreValues } from './score-values'

export const CalculateWordScore = (anagrams: String[]) => {
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