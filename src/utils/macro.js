const axios = require('axios')

const app_id = '5390fb84'
const app_key = '56f13df16a461fbd7acd6a545ecb7892'
const nutrientLink = `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${app_id}&app_key=${app_key}`
const parserLink = `https://api.edamam.com/api/food-database/v2/parser?`

const getResults = async (name, unit, amount, callback) => {
    try {
        const res = await axios(`${parserLink}ingr=${encodeURIComponent(name)}&app_id=${app_id}&app_key=${app_key}`)
        if (res.data.parsed.length === 0) {
            return callback({
                data: 'ERROR: Invalid ingredient!'
            })
        }

        const nutrition = await axios.post(nutrientLink, {
            "ingredients": [{
                "quantity": amount,
                "measureURI": `http://www.edamam.com/ontologies/edamam.owl#Measure_${unit}`,
                "foodId": res.data.parsed[0].food.foodId
            }]
        })

        callback(nutrition.data.totalNutrients)

    } catch (error) {
        console.log(error)
    }
}

module.exports = getResults