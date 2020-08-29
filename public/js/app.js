import { elements, renderLoader, clearLoader } from './views/base.js'
import * as searchView from './views/searchView.js'
import * as totalView from './views/totalView.js'
import Search from './models/Search.js'
import Total from './models/Total.js'

const state = {}

const controlSearch = async () => {
    if (state.search) searchView.clearInfo()
    state.search = new Search()
    const { name, amount, unit } = searchView.getInput()
    state.search.name = name
    state.search.amountAbbr = `${amount}${unit == 'gram' ? 'g' : 'oz'}`
    //searchView.clearFields()
    renderLoader()
    await state.search.getResults(name, unit, parseInt(amount))
    clearLoader()
    searchView.renderInfo(state.search.results)
}

const controlAdd = async () => {
    if (!state.total) {
        state.total = new Total()
        totalView.addTitleBlock()
        totalView.addSumBlock()
    }
    const item = await state.total.addFoodItem(state.search.name, state.search.amountAbbr, state.search.results)
    state.total.updateTotal()
    totalView.addItem(item)
    totalView.updateSumBlock(state.total.total, state.total.calcAvgs())
}

const controlRemove = (id) => {
    state.total.removeFoodItem(id)
    state.total.updateTotal()
    totalView.removeItem(id)
    totalView.updateSumBlock(state.total.total, state.total.calcAvgs())

    if (state.total.foods.length === 0) {
        delete state.total
        document.querySelector('.total_title').remove()
        document.querySelector('.totalsum_content').remove()
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault()
    controlSearch()
})

elements.nameInput.addEventListener('focus', () => {
    if (state.search) searchView.clearFields()
})

elements.infoSection.addEventListener('click', e => {
    const target = e.target
    if (target.classList.contains('fa-plus-square')) {
        controlAdd()
    }
})

elements.totalSection.addEventListener('click', e => {
    const target = e.target
    const targetID = target.parentNode.id
    if (e.target.classList.contains('fa-caret-square-down') || e.target.classList.contains('fa-caret-square-up')) {
        totalView.toggleMiniInfo(targetID, e.target)
    } else if (e.target.classList.contains('fa-times')) {
        controlRemove(targetID)
    }
})