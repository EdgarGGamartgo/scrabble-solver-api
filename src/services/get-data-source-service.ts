import fs from "fs"

/**
 * 
 * GetDataSourceService.
 * 
 * @remarks
 * This is our GetDataSourceService service which purpose is to serve the list of words 
 * needed for the scrabble solver service.
 * 
 * @returns an array of strings (dictionary of words) if promise is fulfilled, otherwise 
 * it returns an empty array.
 * 
 */
export const GetDataSourceService = async (): Promise<String[]> => {
    return new Promise((resolve, reject) => {
        const text = fs.readFileSync("./src/dataSource.txt", "utf-8");
        const list = text.split("\n")
        const listOfWordsWithNoSlashes = list.map((word: string) => word.slice(0, -1))
        const listOfWordsWithNoEmptyStrings = listOfWordsWithNoSlashes.filter((word: string) => word !== '')
        if (listOfWordsWithNoEmptyStrings) {
            resolve(listOfWordsWithNoEmptyStrings)
        } else {
            reject([])
        }
    })
}
