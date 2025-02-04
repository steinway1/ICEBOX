const Backdrop = require("../dynamic/backdrop")
const PageMsg = require("../dynamic/page-msg")

class Search {
  constructor() {
    this.rootEl = document.querySelector('.ib-search')
    if (!this.rootEl) return

    this.abortSearchController = null
    this.backdropInstance = null
    this.isActive = false
    this.closeCallback = this.close.bind(this)

    this.input = this.rootEl.querySelector('[data-search-input]')
    this.resultsEl = this.rootEl.querySelector('[data-search-results]')
    this.clearBtn = this.rootEl.querySelector('[data-search-clear]')

    this.searchDelay = 500
    this.searchTimeout = null

    this.init()
  }
  #appendResults(searchData) {
    this.resultsEl.innerHTML = this.#renderResultsHTML(searchData)
  }
  #appendEmptyResults(query) {
    this.resultsEl.innerHTML = this.#renderEmptyHTML(query)
  }
  #renderResultsHTML(searchData) {
    const { query, resultsCount, itemsArr } = searchData
    return `
      <div class="ib-search__results-header">
        <span class="ib-search__typo">Showing for: <span data-search-term>${query}</span></span>
        <span class="ib-search__dim-typo">Found <span data-search-count>${resultsCount}</span> results</span>
      </div>
      <div class="ib-search__results-wrapper">
        <div class="ib-search__results-grid">
        ${this.#renderItemsHTML(itemsArr)}
        </div>
      </div>
      <a href="https://www.icebox.com/search-products?keyword=${query}" class="ib-search__sticky-btn">Show All Results</a>
      <!--<div class="ib-search__footer">
        <a href="https://www.icebox.com/search-products?keyword=${query}" class="border-btn">Show All Results</a>
      </div>-->
    `
  }
  #renderItemsHTML(itemsArr) {
    let html = ''
    for (const item of itemsArr) {
      const { name, price, salePrice, img_src, href } = item
      const renderPrice = () => {
        if (salePrice) {
          return `
            <span class="ib-search__item-price">${salePrice}</span>
            <span class="ib-search__item-price is-sale">${price}</span>
          `
        }
        return `
          <span class="ib-search__item-price">${price}</span>
        `
      }

      html += `
        <div class="ib-search__item">
          <div class="product-card__media">
            <a href="${href}">
              <img src="${img_src}" alt="" class="product-card__img">
            </a>
          </div>
          <div class="ib-search__item-details">
            <a href="${href}" class="ib-search__item-title">${name}</a>
            <div class="ib-search__item-price-wrap">${renderPrice()}</div>
          </div>
        </div>
      `
    }
    return html
  }
  #renderEmptyHTML(query) {
    return `
      <div class="ib-search__empty">
        <span>No results were found for "${query}".<br>Try to change keywords or search by category.</span>
      </div>
    `
  }

  init() {
    this.#bindInput()
    this.#bindClearBtn()
    this.#bindDocumentEvents()
  }

  // Methods
  open() {
    lockScroll()
    this.reset()
    this.input.value = ''
    this.isActive = true
    this.rootEl.style.display = 'block'
    const closeCallback = () => { this.close() }
    this.backdropInstance = new Backdrop({ half: true, callback: closeCallback })
    if (window.innerWidth > 991) this.input.focus()

    requestAnimationFrame(() => {
      this.rootEl.style.transform = 'translateY(0px)'
      this.rootEl.style.opacity = '1'
    })
  }
  close() {
    unlockScroll()
    this.isActive = false
    this.rootEl.style.transform = 'translateY(-18px)'
    this.rootEl.style.opacity = '0'

    setTimeout(() => {
      this.rootEl.style.display = 'none'
    }, getTransitionTime(this.rootEl));
  }
  toggle() {
    if (this.isActive) this.close()
    else this.open()
  }
  reset() {
    this.resultsEl.innerHTML = ''
    this.rootEl.className = 'ib-search'
    if (this.searchTimeout) clearTimeout(this.searchTimeout)
    if (this.abortSearchController) this.abortSearchController.abort()
  }
  resetResults() {
    this.resultsEl.innerHTML = ''
  }
  toggleState(type) {
    this.rootEl.className = `ib-search --${type}`
  }

  // Events
  #bindInput() {
    this.input.addEventListener('input', () => {
      if (this.searchTimeout) clearTimeout(this.searchTimeout)
      if (this.abortSearchController) this.abortSearchController.abort()
      this.resetResults()

      const value = this.input.value
      if (value) {
        this.searchTimeout = setTimeout(() => {
          this.performSearch(value)
        }, this.searchDelay)
        return
      }

      this.reset()
    })
  }
  #bindClearBtn() {
    this.clearBtn.addEventListener('click', () => {
      this.input.value = ''
      this.reset()
    })
  }
  #bindDocumentEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-evt="toggleSearch"]')) {
        this.toggle()
      }
    })
  }
  async performSearch(query) {
    this.toggleState('loading')
    this.abortSearchController = new AbortController()
    const signal = this.abortSearchController.signal

    try {
      /**
       * @CHOU Replace Here
       * @param {string} query
       * @param {AbortSignal} signal
       * Esnure to include signal in the fetch options
       * We abort request on every new input event @see {#bindInput}
       * Kindly don't remove my fake ajax request {@link #_fakeAjaxRequest} & {@link #_getFakeSearchData}
       */
      const searchData = await this._AjaxRequest(query, signal)
      if (signal.aborted) {
        return
      }

      if (!searchData) {
        new PageMsg({ type: 'error', heading: 'Something went wrong', text: 'Please try again', autodelete: true })
        this.toggleState('')
        return
      }

      const { query, resultsCount, itemsArr } = searchData

      if (!query || !query.length) {
        this.reset()
        return
      }

      if (!itemsArr.length) {
        this.reset()
        this.#appendEmptyResults(query)
        return
      }

      this.reset()
      this.#appendResults(searchData)
      this.toggleState('results')

    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Search error:', err)
        this.toggleState('')
      }
    }
  }
}
Search.prototype._getSearchData = function (query) {
  $.ajax({
    url:'/ajax/search-suggestions?query='+query,
    type:'GET',
    success:function(data){
      return data;
    }
  });

};
Search.prototype._getFakeSearchData = function (query) {
  return {
    query: 'heart pendant',
    resultsCount: 17,
    itemsArr: [
      {
        name: "Baguette Cross Diamond Pendant 14k Solid Gold 4.00ctw",
        img_src: "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/51676333113ac8e9940c6d4813ff7cb8.jpg",
        price: "$11,250",
        salePrice: "$6,550",
        href: "#"
      },
      {
        name: "Baguette Cross Diamond Pendant 14k Solid Gold 4.00ctw",
        img_src: "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/51676333113ac8e9940c6d4813ff7cb8.jpg",
        price: "$11,250",
        href: "#"
      },
      {
        name: "Baguette Cross Diamond Pendant 14k Solid Gold 4.00ctw",
        img_src: "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/51676333113ac8e9940c6d4813ff7cb8.jpg",
        price: "$11,250",
        salePrice: "$6,550",
        href: "#"
      },
      {
        name: "Baguette Cross Diamond Pendant 14k Solid Gold 4.00ctw",
        img_src: "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/51676333113ac8e9940c6d4813ff7cb8.jpg",
        price: "$11,250",
        href: "#"
      },
      {
        name: "Baguette Cross Diamond Pendant 14k Solid Gold 4.00ctw",
        img_src: "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/51676333113ac8e9940c6d4813ff7cb8.jpg",
        price: "$11,250",
        salePrice: "$6,550",
        href: "#"
      },
      {
        name: "Baguette Cross Diamond Pendant 14k Solid Gold 4.00ctw",
        img_src: "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/51676333113ac8e9940c6d4813ff7cb8.jpg",
        price: "$11,250",
        href: "#"
      },
      {
        name: "Baguette Cross Diamond Pendant 14k Solid Gold 4.00ctw",
        img_src: "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/51676333113ac8e9940c6d4813ff7cb8.jpg",
        price: "$11,250",
        salePrice: "$6,550",
        href: "#"
      },
      {
        name: "Baguette Cross Diamond Pendant 14k Solid Gold 4.00ctw",
        img_src: "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/51676333113ac8e9940c6d4813ff7cb8.jpg",
        price: "$11,250",
        href: "#"
      },
      {
        name: "Baguette Cross Diamond Pendant 14k Solid Gold 4.00ctw",
        img_src: "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/51676333113ac8e9940c6d4813ff7cb8.jpg",
        price: "$11,250",
        salePrice: "$6,550",
        href: "#"
      },
      {
        name: "Baguette Cross Diamond Pendant 14k Solid Gold 4.00ctw",
        img_src: "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/51676333113ac8e9940c6d4813ff7cb8.jpg",
        price: "$11,250",
        href: "#"
      },
      {
        name: "Baguette Cross Diamond Pendant 14k Solid Gold 4.00ctw",
        img_src: "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/51676333113ac8e9940c6d4813ff7cb8.jpg",
        price: "$11,250",
        salePrice: "$6,550",
        href: "#"
      },
      {
        name: "Baguette Cross Diamond Pendant 14k Solid Gold 4.00ctw",
        img_src: "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/51676333113ac8e9940c6d4813ff7cb8.jpg",
        price: "$11,250",
        href: "#"
      },
      {
        name: "Baguette Cross Diamond Pendant 14k Solid Gold 4.00ctw",
        img_src: "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/51676333113ac8e9940c6d4813ff7cb8.jpg",
        price: "$11,250",
        salePrice: "$6,550",
        href: "#"
      },
      {
        name: "Baguette Cross Diamond Pendant 14k Solid Gold 4.00ctw",
        img_src: "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/51676333113ac8e9940c6d4813ff7cb8.jpg",
        price: "$11,250",
        href: "#"
      }
    ]
  }
};
Search.prototype._AjaxRequest = function (query, signal) {
  console.log(query);
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'))
      return
    }

    const timeoutId = setTimeout(() => {
      if (signal?.aborted) {
        reject(new DOMException('Aborted', 'AbortError'))
        return
      }

      let searchData = this._getSearchData(query)
      // searchData.itemsArr = []
      // const searchData = false
      resolve(searchData)
    }, 1500)

    signal?.addEventListener('abort', () => {
      clearTimeout(timeoutId)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })
}
Search.prototype._fakeAjaxRequest = function (query, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'))
      return
    }

    const timeoutId = setTimeout(() => {
      if (signal?.aborted) {
        reject(new DOMException('Aborted', 'AbortError'))
        return
      }

      let searchData = this._getFakeSearchData(query)
      // searchData.itemsArr = []
      // const searchData = false
      resolve(searchData)
    }, 1500)

    signal?.addEventListener('abort', () => {
      clearTimeout(timeoutId)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })
}

module.exports = Search