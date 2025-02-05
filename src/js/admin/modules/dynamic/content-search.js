import { getTransitionTime, addClasses, removeClasses } from '../general/utils'
import { __EMPTY, __FILLED, __LOADING } from '../general/constants'

export default class ContentSearch {
  constructor(input, settings = {}) {
    this.input = input
    this.holder = input.parentNode.closest('[data-content-search]')
    this.drop = this.holder.querySelector('.search-drop')
    this.container = this.holder.querySelector('.search-drop__container')
    this.list = this.holder.querySelector('.search-drop__list')
    this.ajaxCall = settings.ajaxCall || null
    this.renderMethod = settings.renderMethod || null
    this.timeout = null
  }

  /**
   * Methods
   */
  showDrop() {
    this.drop.style.display = 'block'
    setTimeout(() => {
      this.container.style.opacity = 1
      this.container.style.transform = 'translateY(0)'
    }, 5);
  }
  hideDrop() {
    this.container.style.opacity = 0
    this.container.style.transform = 'translateY(12px)'
    removeClasses(this.drop, __EMPTY, __FILLED, __LOADING)
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    setTimeout(() => {
      this.drop.style.display = 'none'
    }, getTransitionTime(this.container));
  }
  emptyResolve() {
    removeClasses(this.drop, __FILLED, __LOADING)
    addClasses(this.drop, __EMPTY)
    this.clearResults()
  }
  filledResolve() {
    removeClasses(this.drop, __EMPTY, __LOADING)
    addClasses(this.drop, __FILLED)
  }
  appendResultsHTML(html) {
    this.list.innerHTML = html
  }
  clearResults() {
    this.list.innerHTML = ''
  }

  /**
   * Fetch
   */
  fetchData() {
    const data = this.ajaxCall()
    if (data) {
      const resultHTML = this.renderMethod(data)
      if (resultHTML) {
        this.timeout = setTimeout(() => {
          this.appendResultsHTML(resultHTML)
          this.filledResolve()
        }, 1500);
      }
    } else {
      this.timeout = setTimeout(() => {
        this.emptyResolve()
      }, 1000)
    }
  }

  /**
   * Attach Events
   */
  attachToggleDropVisibility() {
    this.input.addEventListener('focus', () => {
      this.showDrop()
    })
    this.input.addEventListener('blur', () => {
      this.hideDrop()
    })
    document.addEventListener('click', (e) => {
      if (!e.target.closest('[data-content-search]')) {
        this.hideDrop()
      }
    })
  }
  attachInputEvents() {
    this.input.addEventListener('input', () => {
      this.clearResults()
      const val = this.input.value
      if (!val.length) {
        removeClasses(this.drop, __EMPTY, __FILLED, __LOADING)
        clearTimeout(this.timeout)
      } else {
        addClasses(this.drop, __LOADING)
        removeClasses(this.drop, __EMPTY, __FILLED)
        if (this.timeout) {
          clearTimeout(this.timeout)
        }

        this.fetchData()
      }
    })
  }


  _initial_state() {
    this.drop.style.display = 'none'
    this.container.style.opacity = 0
    this.container.style.transform = 'translateY(12px)'
  }
  init() {
    this._initial_state()
    this.attachToggleDropVisibility()
    this.attachInputEvents()
  }
}