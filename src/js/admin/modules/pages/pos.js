import $ from 'jquery'
import { formatAsCurrency, toArray, createElem, allowInputDigits, allowInputSum, onContentLoaded } from '../general/utils'
import ContentSearch from '../../modules/dynamic/content-search'
import { __BLANK, __FILLED, __ADDED } from '../general/constants'

export default class PosPage {
  constructor(rootEl) {
    this.rootEl = rootEl
    if (!this.rootEl) return

    this.main = this.rootEl
    this.details = this.main.querySelector('[data-pos="details"]')
    this.billTo = this.main.querySelector('#bill_to')
    this.billFrom = this.main.querySelector('#bill_from')
    this.items = this.main.querySelector('[data-pos="items"]')
    this.data = {}
  }

  init() {
    if (this.main) {
      // Attach events
      this.attachDocumentClick()
      this.attachRemovableElements()
      this.attachAddElements()
      this.attachToggleBlankInput()
      this.attachEditableElements()
      this.attachAllowElements()
      this.attachChangeCurrency()
      this.attachChangeBillFrom()
      this.attachSave()

      // Input
      this.setupListSearchEvent()
      this.setupCustomerSearchEvent()

      // Attach calculations
      this.attachItemInputChange()

      // Starters
      this.updateCurrency()
      this.updateBillFrom()
      this.updateValues()
    }
  }
  setupListSearchEvent() {
    const input = document.querySelector('[data-search="pos-list"]')
    if (input) {

      const fakeObj = {
        0: {
          invoice_number: '54025',
          billTo: {
            company: "Swisswatches.com"
          },
          date: '8 May, 2024',
          dueDate: '24 May, 2024',
          totalItems: '3',
          balanceDue: '$24,250.00'
        },
        1: {
          invoice_number: '54025',
          billTo: {
            company: "Swisswatches.com"
          },
          date: '8 May, 2024',
          dueDate: '24 May, 2024',
          totalItems: '3',
          balanceDue: '$24,250.00'
        }
      }
      const fakeAjax = () => {
        return fakeObj
      }
      const renderMethod = (data) => {
        let obj = data, html = ''
        if (obj) {
          for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
              const item = obj[key]
              html += `
              <div class="search-item">
                <div class="search-item__wrapper">
                  <div class="search-item__row">
                    <div class="typo_up">#${item.invoice_number}</div>
                    <div class="typo_up">To: ${item.billTo.company}</div>
                  </div>
                  <div class="search-item__row">
                    <div class="typo_xs">
                      <span>Date</span>: ${item.date}
                    </div>
                    <div class="typo_xs">
                      <span>Due Date:</span>
                      ${item.dueDate}
                    </div>
                    <div class="typo_xs">${item.totalItems} Items Total</div>
                  </div>
                  <div class="typo_bold">Balance Due:
                    <span>${item.balanceDue}</span>
                  </div>
               </div>
             </div>
              `
            }
          }
        }
        return html
      }


      const POSListSearch = new ContentSearch(input, {
        ajaxCall: fakeAjax,
        renderMethod: renderMethod
      })
      POSListSearch.init()
    }
  }
  setupCustomerSearchEvent() {
    const input = document.querySelector('[data-search="pos-customer"]')
    if (input) {

      const fakeObj = {
        0: {
          full_name: "Andrew Brownie",
          address: {
            address_1: {
              label: "Address 1",
              value: "123 Main Street"
            },
            address_2: {
              label: "Address 2",
              value: "Suite 100"
            },
            city: {
              label: "City",
              value: "San Diego"
            },
            zip_code: {
              label: "Zip Code",
              value: "92101"
            },
            country: {
              label: "Country",
              value: "USA"
            }
          }
        }
      }
      const fakeAjax = () => {
        return fakeObj
      }
      const renderMethod = (data) => {
        let obj = data, html = ''

        const renderDetails = (customer_address_obj) => {
          let html = ``
          for (const key in customer_address_obj) {
            if (customer_address_obj.hasOwnProperty(key)) {
              const address = customer_address_obj[key]
              html += `
                <div class="typo_xs">
                  <span>${address.label}</span>: ${address.value}
                </div>
              `
            }
          }
          return html
        }

        if (obj) {
          for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
              const customer = obj[key]
              html += `
              <div class="search-item">
                <div class="search-item__wrapper">
                  <div class="search-item__row">
                    <div class="typo_up">${customer.full_name}</div>
                  </div>
                  <div class="search-item__row">
                    ${renderDetails(customer.address)}
                  </div>
               </div>
             </div>
              `
            }
          }
        }
        return html
      }


      const POSCustomerSearch = new ContentSearch(input, {
        ajaxCall: fakeAjax,
        renderMethod: renderMethod
      })
      POSCustomerSearch.init()
    }
  }

  get getNotesValue() {
    let value = null
    const notes = this.main.querySelector('[data-pos-input="notes"]')
    if (notes) {
      value = notes.value
    }
    return value
  }

  get getTermsValue() {
    let value = null
    const terms = this.main.querySelector('[data-pos-input="terms"]')
    if (terms) {
      value = terms.value
    }
    return value
  }

  get getItemsAsObj() {
    const items = [...this.main.querySelectorAll('[data-pos-item]')]
    const obj = Object.create(null)
    items.forEach((item, index) => {
      const nameInput = item.querySelector('[data-pos-input="item_name"]')
      const qtyInput = item.querySelector('[data-pos-input="item_qty"]')
      const rateInput = item.querySelector('[data-pos-input="item_rate"]')
      const amountInput = item.querySelector('[data-pos-input="item_amount"]')
      if (nameInput && qtyInput && rateInput && amountInput) {
        obj[index + 1] = {
          name: nameInput.textContent || 'Name is not found',
          qty: qtyInput.value || 0,
          rate: rateInput.value || 0,
          amount: amountInput.value.replace(/[^0-9.]/g, '')
        }
      } else {
        console.warn(`${item} - Item has no data-pos-input="item_name" or data-pos-input="item_qty" or data-pos-input="item_rate" or data-pos-input="item_amount"`)
      }
    })
    return obj
  }

  get getAllItemsAmount() {
    let value
    const items = [...this.main.querySelectorAll('[data-pos-item]')]
    for (const item of items) {
      const amount = item.querySelector('[data-item-amount]')
      if (amount) {
        value = (value || 0) + Number(amount.value.replace(/[^0-9.]/g, ''))
      }
    }
    return value
  }

  get dueValue() {
    let value
    value = this.getAllItemsAmount
    return value
  }

  get getActiveCurrencyText() {
    const select = this.main.querySelector('[data-pos-select="currency"]')
    let text = select.options[select.selectedIndex].innerHTML
    const hasBrackets = text.includes('(') && text.includes(')')
    if (hasBrackets) {
      text = text.substring(text.indexOf('(') + 1, text.indexOf(')'))
    }
    return text
  }

  get getActiveCurrencyValue() {
    const select = this.main.querySelector('[data-pos-select="currency"]')
    return select.options[select.selectedIndex].value
  }

  get getCurrency() {
    let obj = Object.create(null)
    obj.text = this.getActiveCurrencyText
    obj.value = this.getActiveCurrencyValue
    return obj
  }

  get getTaxValue() {
    const input = this.main.querySelector('[data-tax]')
    if (input) {
      return Number(input.value)
    } else {
      return undefined
    }
  }

  get getDiscountValue() {
    const input = this.main.querySelector('[data-discount]')
    if (input) {
      return Number(input.value)
    } else {
      return undefined
    }
  }

  get getShippingValue() {
    const input = this.main.querySelector('[data-shipping]')
    if (input) {
      return Number(input.value)
    } else {
      return undefined
    }
  }

  get getSubtotalValue() {
    return this.getAllItemsAmount
  }

  get getAmountPaid() {
    const input = this.main.querySelector('[data-paid-amount]')
    if (input) {
      return Number(input.value)
    }
  }

  get getTotalValue() {
    let value = 0 + this.getSubtotalValue,
      taxValue = 0, discountValue = 0, shippingValue = 0
    if (this.getTaxValue) {
      taxValue = (this.getSubtotalValue * this.getTaxValue) / 100
    }
    if (this.getDiscountValue) {
      discountValue = value * (this.getDiscountValue / 100)
    }
    if (this.getShippingValue) {
      shippingValue = this.getShippingValue
    }
    value = value + taxValue - discountValue + shippingValue
    return value
  }

  get getDueValue() {
    return this.getTotalValue - this.getAmountPaid
  }

  get getBillTo() {
    if (!this.billTo) return undefined
    let obj = Object.create(null)
    const inputs = [...this.billTo.querySelectorAll('input:not([data-title])')]
    for (const input of inputs) {
      const val = input.value
      if (val.length) {
        const inputName = input.getAttribute('name')
        obj[inputName] = val
      }
    }
    return obj
  }

  get getDetails() {
    if (!this.details) return undefined
    let obj = Object.create(null)
    const detailsArr = [...this.details.querySelectorAll('.pos-doc__details-box:not([data-prevent])')]
    detailsArr.forEach((details, index) => {
      const inputs = [...details.querySelectorAll('input:not([data-title])')]
      if (inputs.length > 1) {
        obj[index] = {
          title: inputs[0].value,
          value: inputs[1].value
        }
      }
    })
    return obj
  }

  get getBillFrom() {
    const select = document.querySelector('[data-pos-select="bill_from"]')
    if (!select) console.warn('No data-pos-select="bill_from"')
    let store
    const value = select.options[select.selectedIndex].value
    switch (value) {
      case 'icebox':
        store = 'Icebox'
        break;
      case 'swisswatches':
        store = 'Swisswatches'
        break
    }
    return store
  }

  get getInvoiceNumber() {
    const input = this.main.querySelector('[data-pos-input="invoice_number"]')
    if (input) {
      return input.value
    }
    return undefined
  }

  /**
   * Change Invoice From
   */
  toggleSwisswatches() {
    this.main.classList.add('--swisswatches')
    this.changeInvoiceFrom('swisswatches')
  }
  toggleIcebox() {
    this.main.classList.remove('--swisswatches')
    this.changeInvoiceFrom('icebox')
  }
  changeInvoiceFrom(store = 'icebox') {
    store = store.toLowerCase()
    const holder = this.main.querySelector('#bill_from')
    if (holder) {
      [...holder.querySelectorAll('*')].forEach(el => el.remove())
      switch (store) {
        case 'swisswatches':
          holder.insertAdjacentHTML('beforeend', this.renderBillFromHTML('swisswatches'))
          break;
        case 'icebox':
          holder.insertAdjacentHTML('beforeend', this.renderBillFromHTML('icebox'))
          break;
        default:
          holder.insertAdjacentHTML('beforeend', this.renderBillFromHTML('icebox'))
          break;
      }
    }
  }

  /**
   * Calculation Methods
   */
  updateValues() {
    this.updateItemsPrice()
    this.updateSubtotal()
    this.updateTotal()
    this.updateDue()
  }
  updateItemsPrice(item) {
    const itemsArr = item ? toArray(item) : [...this.main.querySelectorAll('[data-pos-item]')]
    for (const item of itemsArr) {
      const
        qty = item.querySelector('[data-item-qty]'),
        rate = item.querySelector('[data-item-rate]'),
        amount = item.querySelector('[data-item-amount]')

      if (qty && rate && amount) {
        if (qty.value && rate.value) {
          let totalAmount = parseInt(qty.value) * parseFloat(rate.value)
          if (totalAmount > 0) {
            amount.value = `${this.getActiveCurrencyText} ${formatAsCurrency(totalAmount)}`
          } else {
            amount.value = `${this.getActiveCurrencyText} 0.00`
          }
        } else {
          amount.value = `${this.getActiveCurrencyText} 0.00`
        }
      } else {
        console.warn(`${item} - Item has no data-item-qty or data-item-rate or data-item-amount`)
      }
    }
    this.updateSubtotal()
  }
  updateSubtotal() {
    const subtotalArr = [...this.main.querySelectorAll('[data-subtotal]')]
    for (const elem of subtotalArr) {
      elem.textContent = `${formatAsCurrency(this.getSubtotalValue)}`
    }
  }
  updateTotal() {
    const totalArr = [...this.main.querySelectorAll('[data-total]')]
    for (const elem of totalArr) {
      if (elem.tagName === 'INPUT') {
        elem.value = `${this.getActiveCurrencyText} ${formatAsCurrency(this.getTotalValue)}`
      } else {
        elem.textContent = `${formatAsCurrency(this.getTotalValue)}`
      }
    }
  }
  updateDue() {
    const totalArr = [...this.main.querySelectorAll('[data-due]')]
    for (const elem of totalArr) {
      if (elem.tagName === 'INPUT') {
        elem.value = `${this.getActiveCurrencyText} ${formatAsCurrency(this.getDueValue)}`
      } else {
        elem.textContent = `${formatAsCurrency(this.getDueValue)}`
      }
    }
  }


  /**
   * Utils
   */
  updateCurrency(select) {
    select = select ? select : this.main.querySelector('[data-pos-select="currency"]')
    const currency = select.value
    let text = select.options[select.selectedIndex].innerHTML
    const hasBrackets = text.includes('(') && text.includes(')')
    if (hasBrackets) {
      text = text.substring(text.indexOf('(') + 1, text.indexOf(')'))
    }

    const currencyArr = [...this.main.querySelectorAll('[data-currency]')]
    for (const elem of currencyArr) {
      if (elem.tagName === 'INPUT') {
        if (elem.value && elem.value.trim() !== '') {
          const valueWords = elem.value.trim().split(' ')
          const value = valueWords[1]
          elem.value = `${text} ${value}`
        }
      } else {
        elem.textContent = text
      }
    }
    this.data.currency = {
      text: text,
      value: currency
    }
  }
  updateBillFrom(select) {
    select = select ? select : this.main.querySelector('[data-pos-select="bill_from"]')
    const store = select.value
    switch (store) {
      case 'swisswatches':
        this.toggleSwisswatches()
        break;
      case 'icebox':
        this.toggleIcebox()
        break;
      default:
        this.toggleIcebox()
        break;
    }
  }
  createDetailsBox() {
    const elem = createElem('div', {
      className: 'pos-doc__details-box',
      attributes: {
        'data-removable': true
      },
      innerHTML: `
      <div class="pos-input-group --blank">
        <input type="text" class="pos-input --dim" value="Title">
      </div>
      <div class="pos-input-group">
        <input type="text" class="pos-input --md">
      </div>
      `
    })
    this.extendRemovableEl(elem)
    // this.extendToggleBlankInput(elem.querySelector('input.--md'))
    return elem
  }
  createBillSmLine() {
    const elem = createElem('div', {
      className: 'pos-input-group',
      attributes: {
        'data-removable': true
      },
      innerHTML: `
      <input data-input-toggle type="text" class="pos-input --sm" value="" placeholder="Line">
      `
    })
    this.extendRemovableEl(elem)
    this.extendToggleBlankInput(elem.querySelector('input'))
    return elem
  }
  createItemLine() {
    const elem = createElem('div', {
      className: 'pos-doc-item',
      attributes: {
        'data-removable': true,
        'data-pos-item': true
      },
      innerHTML: `
      <div class="pos-doc-item__title">
      <h5 data-pos-input="item_name" class="pos-doc-title" contenteditable spellcheck="false"></h5>
    </div>
    <div class="pos-doc-item__details">
      <div>
        <div class="pos-input-group">
          <input data-pos-input="item_qty" data-item-qty data-allow="digits" type="text" class="pos-input" value="" placeholder="">
        </div>
      </div>
      <div>
        <div class="pos-input-group">
          <div data-currency class="pos-input-spot">${this.getActiveCurrencyText}</div>
          <input data-pos-input="item_rate" data-item-rate data-allow="sum" type="text" class="pos-input" value="" placeholder="0.00">
        </div>
      </div>
      <div>
        <div class="pos-input-group --blank" data-locked>
          <input data-pos-input="item_amount" data-item-amount data-currency type="text" class="pos-input" value="${this.getActiveCurrencyText} 0.00" placeholder="">
        </div>
      </div>
    </div>
      `
    })
    this.extendRemovableEl(elem)
    const editableEls = [...elem.querySelectorAll('[contenteditable]')]
    const allowEls = [...elem.querySelectorAll('[data-allow]')]
    const inputEls = [...elem.querySelectorAll('input')]
    for (const editableEl of editableEls) {
      this.extendEditableEl(editableEl)
    }
    for (const allowEl of allowEls) {
      this.extendAllowEl(allowEl)
    }
    for (const inputEl of inputEls) {
      this.extendUpdateInput(inputEl)
    }
    return elem
  }
  createShippingLine() {
    const span = createElem('span', {
      innerHTML: 'Shipping'
    })
    const inputGroup = createElem('div', {
      className: 'pos-input-group',
      innerHTML: `
      <div data-currency class="pos-input-spot">${this.getActiveCurrencyText}</div>
      <input data-shipping data-allow="sum" type="text" class="pos-input" value="" placeholder="">
      `
    })
    const allowEls = [...inputGroup.querySelectorAll('[data-allow]')]
    const inputEls = [...inputGroup.querySelectorAll('input')]
    for (const allowEl of allowEls) {
      this.extendAllowEl(allowEl)
    }
    for (const inputEl of inputEls) {
      this.extendUpdateInput(inputEl)
    }
    return [span, inputGroup]
  }
  createTaxLine() {
    const span = createElem('span', {
      innerHTML: 'Tax'
    })
    const inputGroup = createElem('div', {
      className: 'pos-input-group',
      innerHTML: `
      <div class="pos-input-spot">%</div>
      <input data-tax type="text" class="pos-input" value="8.9" placeholder="">
      `
    })
    const allowEls = [...inputGroup.querySelectorAll('[data-allow]')]
    const inputEls = [...inputGroup.querySelectorAll('input')]
    allowEls.forEach(allowEl => this.extendAllowEl(allowEl))
    inputEls.forEach(inputEl => this.extendUpdateInput(inputEl))
    return [span, inputGroup]
  }
  createDiscountLine() {
    const span = createElem('span', {
      innerHTML: 'Discount'
    })
    const inputGroup = createElem('div', {
      className: 'pos-input-group',
      innerHTML: `
      <div class="pos-input-spot">%</div>
      <input data-discount type="text" class="pos-input" value="" placeholder="">
      `
    })
    const allowEls = [...inputGroup.querySelectorAll('[data-allow]')]
    const inputEls = [...inputGroup.querySelectorAll('input')]
    allowEls.forEach(allowEl => this.extendAllowEl(allowEl))
    inputEls.forEach(inputEl => this.extendUpdateInput(inputEl))
    return [span, inputGroup]
  }
  renderBillFromHTML(store = 'icebox') {
    store = store.toLowerCase()
    let html
    switch (store) {
      case 'swisswatches':
        html = `
        <div class="pos-input-group --blank">
          <input data-title type="text" class="pos-input" value="Bill From:">
        </div>
        <div class="pos-input-group --blank">
          <input type="text" class="pos-input --lg" value="SwissWatches.com">
        </div>
        <div class="pos-input-group --blank">
          <input type="text" class="pos-input --sm" value="3255 Peachtree Road NE Ste 3">
        </div>
        <div class="pos-input-group --blank">
          <input type="text" class="pos-input --sm" value="Atlanta, GA 30305">
        </div>
        <div class="pos-input-group --blank">
          <input type="text" class="pos-input --sm" value="404-842-0266">
        </div>
       `
        break;
      case 'icebox':
        html = `
        <div class="pos-input-group --blank">
          <input data-title type="text" class="pos-input" value="Bill From:">
        </div>
        <div class="pos-input-group --blank">
          <input type="text" class="pos-input --lg" value="Icebox Diamonds &amp; Watches">
        </div>
        <div class="pos-input-group --blank">
          <input type="text" class="pos-input --sm" value="3255 Peachtree Road NE Ste 2">
        </div>
        <div class="pos-input-group --blank">
          <input type="text" class="pos-input --sm" value="Atlanta, GA 30305">
        </div>
        <div class="pos-input-group --blank">
          <input type="text" class="pos-input --sm" value="404-842-0266">
        </div>
       `
        break;
    }
    return html
  }


  /**
   * Extenders
   */
  extendRemovableEl(target) {
    target.addEventListener('mouseover', () => {
      if (target.querySelector('.remove-btn')) return
      const removeBtn = createElem('button', {
        className: 'remove-btn',
        attributes: {
          'data-pos-remove': true,
          'data-pos-update': true
        }
      })
      target.appendChild(removeBtn)
    })
    target.addEventListener('mouseleave', () => {
      const removeBtn = target.querySelector('.remove-btn')
      if (removeBtn) {
        removeBtn.remove()
      }
    })
  }
  extendToggleBlankInput(input) {
    input.addEventListener('blur', () => {
      const group = input.parentNode.closest('.pos-input-group')
      const value = input.value
      if (group && value.length !== 0) {
        group.classList.add(__BLANK)
      }
    })
    input.addEventListener('focus', () => {
      const group = input.parentNode.closest('.pos-input-group')
      if (group) {
        group.classList.remove(__BLANK)
      }
    })
    input.addEventListener('keydown', (e) => {
      const isEnter = e.key === 'Enter' || e.keyCode === 13
      if (isEnter) {
        e.preventDefault()
        input.blur()
      }
    })
  }
  extendEditableEl(target) {
    target.addEventListener('input', (e) => {
      const text = e.target.textContent
      if (text.length === 0) {
        target.classList.remove(__FILLED)
      } else {
        target.classList.add(__FILLED)
      }
    })
  }
  extendAllowEl(target) {
    const attr = target.getAttribute('data-allow')
    if (attr) {
      switch (attr) {
        case 'digits':
          allowInputDigits(target)
          break;
        case 'sum':
          allowInputSum(target)
          break;
        default:
          throw new Error(`Unknown allow attribute: ${attr}`)
      }
    }
  }
  extendUpdateInput(input) {
    input.addEventListener('input', () => {
      this.updateValues()
    })
  }

  /**
   * Attach Events
   */
  attachRemovableElements() {
    const arr = [...this.main.querySelectorAll('[data-removable]')]
    for (const elem of arr) {
      this.extendRemovableEl(elem)
    }
  }
  attachAddElements() {
    const arr = [...this.main.querySelectorAll('[data-pos-add]')]
    for (const elem of arr) {
      elem.addEventListener('click', () => {
        const addAttr = elem.dataset.posAdd
        let elemToAdd, holder
        switch (addAttr) {
          case 'details_box':
            holder = this.details
            elemToAdd = this.createDetailsBox()
            break;
          case 'bill_line_sm':
            holder = this.billTo
            elemToAdd = this.createBillSmLine()
            break;
          case 'item_line':
            holder = this.items
            elemToAdd = this.createItemLine()
            break;
          case 'sum_line_tax':
          case 'sum_line_shipping':
          case 'sum_line_discount':
            holder = elem.parentNode.closest('.pos-doc-sum__line')
            if (!holder) throw new Error('PosPage : Add Elements : Holder not found')
            holder.classList.add(__ADDED)
            holder.setAttribute('data-removable', true)
            this.extendRemovableEl(holder)
            elemToAdd = addAttr == 'sum_line_shipping' ? this.createShippingLine() : addAttr == 'sum_line_tax' ? this.createTaxLine() : this.createDiscountLine()
            break;
          default:
            elemToAdd = undefined
            holder = undefined
            throw new Error('Unknown element to add')
        }
        if (!holder) throw new Error('PosPage : Add Elements : Holder not found')
        if (!elemToAdd) throw new Error('PosPage : Add Elements : Element is undefined')
        toArray(elemToAdd).forEach((el) => holder.appendChild(el))
        this.updateCurrency()
      })
    }
  }
  attachToggleBlankInput() {
    const arr = [...document.querySelectorAll('[data-input-toggle]')]
    for (const input of arr) {
      this.extendToggleBlankInput(input)
    }
  }
  attachEditableElements() {
    const arr = [...this.main.querySelectorAll('[contenteditable]')]
    for (const elem of arr) {
      this.extendEditableEl(elem)
    }
  }
  attachAllowElements() {
    const arr = [...this.main.querySelectorAll('[data-allow]')]
    for (const elem of arr) {
      this.extendAllowEl(elem)
    }
  }
  attachChangeCurrency() {
    const selectArr = [...this.main.querySelectorAll('[data-pos-select="currency"]')]
    for (const select of selectArr) {
      select.onchange = () => {
        this.updateCurrency(select)
      }
    }
  }
  attachChangeBillFrom() {
    const selectArr = [...this.main.querySelectorAll('[data-pos-select="bill_from"]')]
    for (const select of selectArr) {
      select.onchange = () => {
        this.updateBillFrom(select)
      }
    }
  }
  attachDocumentClick() {
    document.addEventListener('click', (e) => {
      const target = e.target
      // Remove elements
      if (target.matches('[data-pos-remove]')) {
        const parent = target.closest('[data-removable]')
        if (parent.classList.contains('pos-doc-sum__line')) {
          parent.classList.remove(__ADDED)
          parent.removeAttribute('data-removable')
          const elemToRemove = [...parent.querySelectorAll('span'), ...parent.querySelectorAll('.pos-input-group')]
          elemToRemove.forEach((el) => el.remove())
        } else {
          target.closest('[data-removable]').remove()
        }
      }
      // Update Value
      if (target.matches('[data-pos-update]')) {
        this.updateValues()
      }
    })
  }
  attachSave() {
    const saveEvtArr = [...this.main.querySelectorAll('[data-pos-save]')]
    for (const elem of saveEvtArr) {
      elem.addEventListener('click', () => {
        this.save()
      })
    }
  }

  /**
   * Attach Calculations
   */
  attachItemInputChange() {
    const inputArr = [...this.main.querySelectorAll('input[data-item-qty], input[data-item-rate], input[data-paid-amount]')]
    for (const input of inputArr) {
      input.addEventListener('input', (e) => {
        this.updateValues()
      })
    }
  }

  /**
   * Save event
   */
  save() {
    this.data = Object.create(null)
    let data = this.data
    data.billTo = this.getBillTo
    data.billFrom = this.getBillFrom
    data.currency = this.getCurrency
    data.details = this.getDetails
    data.invoice_number = this.getInvoiceNumber
    data.items = this.getItemsAsObj
    data.notes = this.getNotesValue
    data.terms = this.getTermsValue
    data.itemsAmount = this.getAllItemsAmount
    data.subtotal = this.getSubtotalValue
    data.total = this.getTotalValue
    data.tax = this.getTaxValue || 0
    data.shipping = this.getShippingValue || 0
    data.discount = this.getDiscountValue || 0
    data.balanceDue = this.getDueValue
    data.store = $('#store_select').val()
    data.salesperson = $('#salesperson_select').val()

    $.ajax({
      url: '/admin/json/save-pos',
      type: 'POST',
      data: { "object": JSON.stringify(data) },
      success: function (data) {
        var r = $.parseJSON(data);
        if (!r.error) {
          new PageMsg({
            type: 'success',
            heading: 'Invoice Saved',
            msg: 'Invoice saved successfully',
            timeout: 1400
          })
        } else {
          new PageMsg({
            type: 'error',
            heading: 'Error',
            msg: r.msg,
            timeout: 1400
          });
        }
      }
    });
  }
}