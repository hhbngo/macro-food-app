import { elements } from './base.js'

export const toggleMiniInfo = (id, targetArrow) => {
    document.getElementById(`summ-${id}`).classList.toggle('toggleSumm')

    if (targetArrow.classList.contains("fa-caret-square-down")) {
        targetArrow.classList = "fas fa-caret-square-up"
    } else {
        targetArrow.classList = "fas fa-caret-square-down"
    }

}

export const addTitleBlock = () => {
    const markup = `
    <div class="total_title">Totals</div>
    `
    elements.totalSection.insertAdjacentHTML('beforebegin', markup)
}

export const addSumBlock = () => {
    const markup = `
    <div class="totalsum_content"></div>
    `
    document.querySelector('.portal').insertAdjacentHTML('beforeend', markup)
}

export const addItem = (obj) => {
    const markup = `
    <div class="summary_container" id="${obj.id}">
        <div class="tab2">
            <div class="label_container">
                <p>${obj.name}</p>
                <p class="marg-l">${obj.amount}</p>
            </div>
        </div>
        <i class="fas fa-caret-square-down"></i>
        <i class="fas fa-times"></i>
    </div>
    <div class="macro_summ-info" id="summ-${obj.id}">
        <p><b>C:</b> ${obj.carb}g</p>
        <p><b>F:</b> ${obj.fat}g</p>
        <p><b>P:</b> ${obj.protein}g</p>
        <p><b>${obj.calories} Calories</b></p>
    </div>
    `
    elements.totalSection.insertAdjacentHTML('afterbegin', markup)
}

export const removeItem = (id) => {
    const elem = document.getElementById(id)
    const elemSumm = document.getElementById(`summ-${id}`)
    elem.parentNode.removeChild(elem)
    elemSumm.parentNode.removeChild(elemSumm)
}


export const updateSumBlock = (totalObj, avgsObj) => {
    const markup = `
        <div class="part">
            <div class="macr_label">Carb(${avgsObj.carb}%)</div>
            <div class="macr_num">${Math.round(totalObj.carb * 10) / 10}g</div>
        </div>
        <div class="part">
            <div class="macr_label">Fat(${avgsObj.fat}%)</div>
            <div class="macr_num">${Math.round(totalObj.fat * 10) / 10}g</div>
        </div>
        <div class="part">
            <div class="macr_label">Protein(${avgsObj.protein}%)</div>
            <div class="macr_num">${Math.round(totalObj.protein * 10) / 10}g</div>
        </div>
        <div class="cal_num">${Math.round(totalObj.calories * 10) / 10}cal</div>
    `
    document.querySelector('.totalsum_content').innerHTML = markup

}
