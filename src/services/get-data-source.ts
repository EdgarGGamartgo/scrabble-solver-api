import fs from "fs"

export const GetDataSource = async (): Promise<String[]> => {
    return new Promise((resolve, reject) => {
        const text = fs.readFileSync("./src/dataSource.txt", "utf-8");
        const list = text.split("\n")
        const sanitizedList = list.map((e: string) => e.slice(0, -1))
        const noEmptyString = sanitizedList.filter((e: string) => e !== '')
        if (noEmptyString) {
            resolve(noEmptyString)
        } else {
            reject([])
        }
    })
}
