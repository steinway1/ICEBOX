import { AjaxGetCustomersArray } from '../general/ajax'
import { fakeAjaxGetCustomers } from '../general/fake-ajax'
import PageMsg from '../dynamic/page-msg'

export default class ManualOrderCustomerSearch {
  /**
   * @param {HTMLElement} container — Root element contains input & list container
   * @returns
   */
  constructor(container, formInstance) {
    this.container = container
    this.input = document.querySelector('#customerSearchInput')
    this.resultsList = this.container.querySelector('.m-popup__search-list')
    this.msgElement = this.container.querySelector('.m-popup__msg')
    this.formInstance = formInstance
    if (!this.resultsList || !this.input) {
      console.warn('ERR: MPS001. Results list or input not found')
      return
    }

    this.selectedCustomer = null

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
    this.toggleCheckboxVisibiltiy(false)
    try {

      const results = await AjaxGetCustomersArray(query)
      // const results = await fakeAjaxGetCustomers(query)
      this.toggleCheckboxVisibiltiy(true)

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
      console.warn('ERR: MPS003. Search error', error);
    } finally {
      this.enable()
      this.formInstance.clearMsg()
      this.resultsList.classList.remove('--o-loading');
    }
  }

  renderResults(customers) {
    this.resultsList.innerHTML = customers.map(customer => `
      <div data-evt="setupManualCustomer" data-id="${customer.id}" class="m-popup__list-item --customer">
      <div class="am_flex8 --def">
        ${customer.img_src ? `<img src="${customer.img_src}" alt="">` : ''}
        <div>
          <h6>${customer.first_name ? `${customer.first_name} ` : ''}${customer.last_name ? `${customer.last_name}` : ''}</h6>
          <div class="am_flex8">
            ${customer.first_name ? `<span>First Name: ${customer.first_name}</span>` : ''}
            ${customer.last_name ? `<span>Last Name: ${customer.last_name}</span>` : ''}
            ${customer.email ? `<span>Email: ${customer.email}</span>` : ''}
            ${customer.phone ? `<span>Phone: ${customer.phone}</span>` : ''}
          </div>
        </div>
      </div>
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
  fullReset() {
    this.formInstance.resetSelectedCustomer()
    this.reset()
    clearTimeout(this.searchTimeout)
    this.clearResults()
  }
  toggleCheckboxVisibiltiy(cond) {
    const elem = document.querySelector('input[value="addCustomerManually"]')
    if (elem) {
      const label = elem.parentElement
      if (cond) {
        label.style.display = 'flex'
        return
      }
      label.style.display = 'none'
    }
  }

}