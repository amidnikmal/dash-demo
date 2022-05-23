export class DataApi {
    static getList() {
        return new Promise((resolve) => {
            resolve([1, 2, 3])
        })
    }
}