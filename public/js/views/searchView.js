import { elements } from './base.js'

export const getInput = () => {
    return {
        name: elements.nameInput.value,
        amount: elements.amountInput.value,
        unit: elements.unitInput.value
    }
}

export const clearFields = () => {
    elements.nameInput.value = ''
    elements.amountInput.value = ''
}

export const renderInfo = (results) => {
    if (Object.keys(results).length == 1) {
        const markup = `
        <div class="food_info">
            <h3>${results.data}</h3>
        </div>
        `
        return document.querySelector('.food_content').insertAdjacentHTML('afterbegin', markup)
    }
    const markup = `
    <div class="food_info">
        <h2>${Math.round(results.ENERC_KCAL.quantity * 10) / 10} Calories</h2>
        <div class="macro_container">
                <div class="spacing"><span class="tab">Carb</span>${Math.round(results.CHOCDF.quantity * 10) / 10}g</div>
                <div class="spacing"><span class="tab">Fat</span>${Math.round(results.FAT.quantity * 10) / 10}g</div>
                <div class="spacing"><span class="tab">Protein</span>${Math.round(results.PROCNT.quantity * 10) / 10}g</div>
        </div>
    </div>
    <div class="add_button">
        <i class="fas fa-plus-square"></i>
    </div>
    `
    elements.infoSection.insertAdjacentHTML('afterbegin', markup)
}

export const clearInfo = () => {
    elements.infoSection.innerHTML = ''
}