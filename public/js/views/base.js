export const elements = {
    searchForm: document.querySelector('.form'),
    nameInput: document.querySelector('.food_input'),
    amountInput: document.querySelector('.amount_input'),
    unitInput: document.getElementById('units'),
    searchSection: document.querySelector('.search'),
    infoSection: document.querySelector('.food_content'),
    loader: document.querySelector('.load_container'),
    totalSection: document.querySelector('.total_content'),
    toggleArrowDown: document.querySelector('.fa-caret-square-down'),
    toggleArrowUp: document.querySelector('.fa-caret-square-up')
}

export const renderLoader = () => {
    const markup = `
        <div class="load_container">
            <div class="loading_spinner"></div>
        </div>
    `
    elements.infoSection.insertAdjacentHTML('afterbegin', markup)
}

export const clearLoader = () => {
    document.querySelector('.load_container').remove()
}