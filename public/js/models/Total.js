export default class Total {
    constructor() {
        this.foods = []
        this.total = {
            carb: 0,
            fat: 0,
            protein: 0,
            calories: 0
        }
    }

    async addFoodItem(name, abbr, item) {
        const result = await fetch(`/id?key=${name.charAt(0)}`)
        const newID = await result.json()
        const food = {
            id: newID.id,
            name: name,
            amount: abbr,
            carb: Math.round(item.CHOCDF.quantity * 10) / 10,
            fat: Math.round(item.FAT.quantity * 10) / 10,
            protein: Math.round(item.PROCNT.quantity * 10) / 10,
            calories: Math.round(item.ENERC_KCAL.quantity * 10) / 10
        }
        this.foods.push(food)
        return food
    }

    removeFoodItem(id) {
        const index = this.foods.findIndex(el => el.id === id)
        this.foods.splice(index, 1)
    }

    updateTotal() {
        this.total.carb = sumArray(this.foods.map(el => el.carb))
        this.total.fat = sumArray(this.foods.map(el => el.fat))
        this.total.protein = sumArray(this.foods.map(el => el.protein))
        this.total.calories = sumArray(this.foods.map(el => el.calories))
        // console.log(this.foods)
        // console.log(this.total)
    }

    calcAvgs() {
        const totalGrams = this.total.carb + this.total.fat + this.total.protein

        return {
            carb: Math.round(this.total.carb / totalGrams * 100 * 10) / 10,
            fat: Math.round(this.total.fat / totalGrams * 100 * 10) / 10,
            protein: Math.round(this.total.protein / totalGrams * 100 * 10) / 10,
        }
    }

    persistData() {
        localStorage.setItem('foods', JSON.stringify(this.foods))
        localStorage.setItem('totals', JSON.stringify(this.total))
    }

    getLocalData() {
        const foodStorage = JSON.parse(localStorage.getItem('foods'))
        const totalStorage = JSON.parse(localStorage.getItem('totals'))
        if (foodStorage) this.foods = foodStorage
        if (totalStorage) this.total = totalStorage
    }

}

const sumArray = (arr) => {
    return arr.reduce((a, b) => a + b, 0)
}