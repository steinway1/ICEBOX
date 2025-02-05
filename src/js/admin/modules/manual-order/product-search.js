import { AjaxGetItemsArray } from '../general/ajax'
import { fakeAjaxGetItemsArray } from '../general/fake-ajax'
import PageMsg from '../dynamic/page-msg'

export default class ManualOrderProductSearch {
  /**
   * @param {HTMLElement} container — Root element contains input & list container
   * @returns
   */
  constructor(container, formInstance) {
    this.container = container
    this.input = document.querySelector('#itemSearchInput')
    this.resultsList = this.container.querySelector('.m-popup__search-list')
    this.msgElement = this.container.querySelector('.m-popup__msg')
    this.formInstance = formInstance
    if (!this.resultsList || !this.input) {
      console.warn('ERR: MPS01. Results list or input not found')
      return
    }

    this.selectedItem = null

    this.searchDelay = 1000
    this.searchTimeout = null
    this.init()
  }

  init() {
    this.bindEvents()
  }
  bindEvents() {
    this.input.addEventListener('focus', () => {
      if (this.formInstance) {
        this.formInstance.clearMsg()
      }
    })
    this.input.addEventListener('input', (e) => {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }

      if (this.formInstance) {
        this.formInstance.clearMsg()
      }

      const val = e.target.value.trim()

      this.resultsList.classList.add('--o-loading')
      this.resultsList.classList.remove('--filled')
      this.resultsList.classList.remove('--empty')

      if (!val) {
        this.resultsList.classList.remove('--o-loading')
        this.clearResults()
        return
      }

      this.searchTimeout = setTimeout(() => {
        this.performSearch(val)
      }, this.searchDelay)
    })
  }

  async performSearch(query) {
    this.disable()
    try {

      const results = await AjaxGetItemsArray(query)
      // const results = await fakeAjaxGetItemsArray(query)

      if (Array.isArray(results) && !results.length) {
        this.showEmptyResult()
        return
      }

      if (!results) {
        this.formInstance.showMsg('error', 'Something went wrong...')
        this.clearResults()
        return
      }

      this.renderResults(results);
      this.resultsList.classList.add('--filled');
    } catch (error) {
      console.warn('ERR: MPS03. Search error', error);
    } finally {
      this.enable()
      this.formInstance.clearMsg()
      this.resultsList.classList.remove('--o-loading');
    }
  }

  renderResults(items) {
    this.resultsList.innerHTML = items.map(item => `
      <div data-evt="setupManualItem" data-id="${item.id}" class="m-popup__list-item">
        <img src="${item.img_src}" alt="">
        <h6>${item.title}</h6>
      </div>
    `).join('')
  }
  clearResults() {
    this.resultsList.innerHTML = ''
    this.resultsList.className = 'm-popup__search-list'
  }
  disable() {
    this.input.disabled = true
    this.container.classList.add('--disabled')
  }
  enable() {
    this.input.disabled = false
    this.container.classList.remove('--disabled')
  }
  showEmptyResult() {
    this.resultsList.className = 'm-popup__search-list --empty'
  }
  reset() {
    this.clearResults()
    this.input.value = ''
  }
}