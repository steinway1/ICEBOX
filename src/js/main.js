var $ = require('jquery')
window.$ = window.jQuery = $
require('./jquery.crs.min')
require('./jQuery-zoom')
require('./parsley.min')

window.popper = require('./popper')
window.tippy = require('./tippy')
window.Splide = require('./splide')
require('./splide-grid')
window.intlTelInput = require('./intlTelInput')
window.zenscroll = require('./zenscroll')
window.fancybox = require('./fancybox.min')

/** -- Globals */
/** Constants / Variables / Utils / Ajax */
const constants = require('./modules/constants')
const variables = require('./modules/variables')
const utils = require('./modules/utils')
const ajax = require('./modules/ajax')
Object.assign(window, constants, variables, utils, ajax)

/** -- Append Elements */
/* Page Tips */
window.PageTip = require('./modules/dynamic/pageTip')
/* Backdrop */
window.Backdrop = require('./modules/dynamic/backdrop')
/* Page Confetti */
window.PageConfetti = require('./modules/dynamic/page-confetti')
/* Ask Modal */
window.AskModal = require('./modules/dynamic/ask-modal')
/* Loader Root */
window.rootLoader = require('./modules/dynamic/root-loader')
/* Sign Up price alerts */
require('./modules/dynamic/price-modal')

/** -- Page Elements */
// Login
require('./modules/login')

/** Header / Footer
 * @type Objects
 */
window.header = require('./modules/elements/header')
window.footer = require('./modules/elements/footer')

/** Page Elements
 * @type Object
 */
window.pageEls = require('./modules/elements/page-elements')
window.pageReviews = require('./modules/elements/page-reviews')
window.heroSplide = require('./modules/elements/hero-splide')
window.pageAlerts = require('./modules/elements/page-alerts')
window.sirvCards = require('./modules/elements/sirv')

/** Modals
 * Currency / Cart / Menu / Mail / Quiz / Sign / Menu
 * @type Obejcts
 */
window.currencyModal = require('./modules/modals/currency-modal')
window.cartModal = require('./modules/modals/cart-modal')
// window.bookModal = require('./modules/modals/book-modal')
window.mailModal = require('./modules/modals/mail-modal')
window.quizModal = require('./modules/modals/quiz-modal')
window.salesModal = require('./modules/modals/sales-modal')
const noticeModal = require('./modules/modals/notice-modal')
const Menu = require('./modules/modals/menu')
const AddCartModal = require('./modules/dynamic/add-cart-modal')
// const ShareButtons = require('./modules/elements/share-buttons')

/** PG Filters/Select/Modal
 * @type Objects
 */
window.pgSelect = require('./modules/elements/pg-select')
window.pgModal = require('./modules/elements/pg-modal')


/** -- Pages */
const
  /* Loan App : /financing */
  LoanApp = require('./modules/pages/loan-app'),
  /* Job Apply : /apply-job */
  JobApp = require('./modules/pages/job-app'),
  /* Sell Watch : /sell-my-watch */
  SellWatch = require('./modules/pages/sell-watch'),
  /* Loose Diamonds : /loose-diamonds */
  LooseDiamonds = require('./modules/pages/loose-diamonds'),
  /* Homepage : /index */
  Homepage = require('./modules/pages/homepage'),
  ResultsPage = require('./modules/pages/results'),
  ProductPage = require('./modules/pages/product'),
  /* My Bag : /cart */
  myBag = require('./modules/pages/my-bag'),
  /* Account Profile : /account */
  account = require('./modules/pages/account-page'),
  /* Locations : /locations */
  locationPage = require('./modules/pages/location-page'),
  /* Sell Pages : /sell */
  sellPage = require('./modules/pages/sell-page'),
  /* Pass Reset : /pass-reset */
  passReset = require('./modules/pages/pass-reset'),
  /* Blog : /blog */
  blogPage = require('./modules/pages/blog-page'),
  /* Form Page : /form */
  formPage = require('./modules/pages/form-page'),
  /* Tag Preview : /tag */
  tagPreview = require('./modules/pages/tag-preview')
const sirvCards = require('./modules/elements/sirv')


// Product Cards media loader
document.addEventListener('DOMContentLoaded', () => {
  initLazyLoadForProductCards()
})


/** -- Initialize Page Objects */
const
  pageObjectsArr = [
    header,
    cartModal,
    currencyModal,
    pgModal,
    footer,
    pageEls,
    myBag,
    account,
    locationPage,
    pageAlerts,
    sirvCards,
    sellPage,
    // bookModal,
    passReset,
    pageReviews,
    blogPage,
    heroSplide,
    mailModal,
    quizModal,
    salesModal,
    formPage,
    tagPreview
  ]
const initPageObjects = () => {
  for (const obj of pageObjectsArr) {
    try {
      if (typeof obj.init === "function") {
        obj.init()
      } else {
        console.log(obj)
        console.log('No init function')
      }
    } catch (err) {
      console.error(`Error initializing ${obj}:`, err)
    }
  }
}


/** -- Init Page Objects */
document.addEventListener("DOMContentLoaded", function () {
  initPageObjects()
  window.pageTip = new PageTip()

  // Loan App
  const loanCaseHolder = document.querySelector('[data-id="loan-apply"]')
  if (loanCaseHolder) {
    window.loanApp = new LoanApp(loanCaseHolder)
  }

  // Job Apply
  const jobCaseHolder = document.querySelector('[data-id="job-apply"]')
  if (jobCaseHolder) {
    window.jobApp = new JobApp(jobCaseHolder)
  }

  // Form Page
  const form = document.querySelector('form#sell_my_watch')
  if (form) {
    window.sellMyWatch = new SellWatch()
  }

  // Loose Diamonds
  const looseDiamondsMain = document.querySelector('.loose_diamonds')
  if (looseDiamondsMain) {
    window.loose = new LooseDiamonds()
  }

  // Menu
  const menuElem = document.querySelector('.menu')
  if (menuElem) {
    window.menu = new Menu('.menu')
  }

  // Homepage
  new Homepage()

  // Results
  const resultsMain = document.querySelector('.main_results')
  if (resultsMain) {
    new ResultsPage()
  }

  const productMain = document.querySelector('.main_product')
  if (productMain) {
    window.productPage = new ProductPage()
  }

  // Notice modal
  window.noticeModal = new noticeModal()

  // Add to cart Modal
  window.addCartModal = new AddCartModal()

  // Share Buttons
  // const shareButtons = new ShareButtons()
})

document.addEventListener('DOMContentLoaded', function () {
  return
  let text = document.querySelector('#item_name')?.textContent
})

class NoPage {
  constructor() {
    this.grid = document.querySelector('.nopage__categories')
    this.linksArr = [...document.querySelectorAll('.nopage-link[data-id])')]
    if (!this.grid || !this.linksArr.length) return

    this.addEvtArr = [...document.querySelectorAll('[data-evt="addNewTabLink"]')]

    this.init()
  }
  init() {
    this.bindDraggable()
    this.bindInputEvents()
  }
  bindDraggable() {
    const container = this.grid
    let draggedItem = null
    let dragClone = null
    let placeholder = null
    let isDragging = false

    container.addEventListener('mousedown', function (e) {
      const target = e.target.closest('.nopage-link:not(.--add)')
      const main = e.target.closest('.nopage-link__main')

      if (!target || e.button !== 0) return
      if (!main) return

      draggedItem = target;
      isDragging = false;

      dragClone = draggedItem.cloneNode(true);
      dragClone.classList.add('dragging-clone');
      document.body.appendChild(dragClone);

      const rect = draggedItem.getBoundingClientRect();
      dragClone.style.width = `${rect.width}px`;
      dragClone.style.height = `${rect.height}px`;
      dragClone.style.left = `${e.pageX - rect.width / 2}px`;
      dragClone.style.top = `${e.pageY - rect.height / 2}px`;


      draggedItem.style.display = 'none';
      container.classList.add('--dragging');

      placeholder = document.createElement('div');
      placeholder.className = 'nopage-link-placeholder';
      draggedItem.parentNode.insertBefore(placeholder, draggedItem);

      document.addEventListener('mousemove', onDragStart);
      document.addEventListener('mouseup', stopDrag);
    });

    function onDragStart(e) {
      if (!isDragging) {
        isDragging = true;
        document.removeEventListener('mousemove', onDragStart);
        document.addEventListener('mousemove', onDrag);
      }
    }

    function onDrag(e) {
      if (!draggedItem) return;

      const rect = dragClone.getBoundingClientRect();
      dragClone.style.left = `${e.pageX - rect.width / 2}px`;
      dragClone.style.top = `${e.pageY - rect.height / 2}px`;

      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      const targetItem = elements.find(
        (el) =>
          el.classList.contains('nopage-link') &&
          el !== draggedItem &&
          el !== placeholder &&
          !el.classList.contains('--add')
      );
      if (targetItem) {
        const rect = targetItem.getBoundingClientRect();
        const middleY = rect.top + rect.height / 2;

        if (e.clientY > middleY) {
          container.insertBefore(placeholder, targetItem.nextSibling);
        } else {
          container.insertBefore(placeholder, targetItem);
        }
      }
    }

    function stopDrag() {
      if (!draggedItem) return;

      container.insertBefore(draggedItem, placeholder);
      placeholder.remove();
      dragClone.remove();

      draggedItem.style.display = 'flex';
      container.classList.remove('--dragging');
      draggedItem = null;
      placeholder = null;
      dragClone = null;
      isDragging = false;

      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
    }
  }
  bindInputEvents() {
    const linksArr = [...document.querySelectorAll('.nopage-link')]
    for (const link of linksArr) {
      if (link.isInitialized) return

      link.isInitialized = true
      this._bindInputs(link)
    }
  }
  bindAddNewLink() {
    for (const link of this.addEvtArr) {
      link.addEventListener('click', () => {
        this.addNewLink(link)
      })
    }
  }

  // input Events
  _bindInputs(linkElem) {
    const inputArr = [...linkElem.querySelectorAll('input[data-for]')]

    for (const input of inputArr) {
      input.addEventListener('input', () => {
        const setFor = input.getAttribute('data-for')
        const target = linkElem.querySelector(`[data-${setFor}]`)

        if (setFor === 'heading') {
          target.textContent = input.value ? input.value : 'Empty Heading'
        } else if (setFor === 'src') {
          target.src = input.value ? input.value : ''
        }
      })
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new NoPage()
})