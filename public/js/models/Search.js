export default class Search {
    constructor() {}

    async getResults(name, unit, amount) {
        const result = await fetch(`/macros?name=${name}&unit=${unit}&amount=${amount}`)
        const data = await result.json()
        this.results = data
    }
}