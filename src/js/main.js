var $ = require('jquery');
window.$ = window.jQuery = $;
require('./jquery.crs.min');
require('./jQuery-zoom');
require('./parsley.min');

window.popper = require('./popper');
window.tippy = require('./tippy');
window.Splide = require('./splide');
require('./splide-grid');
window.intlTelInput = require('./intlTelInput');
window.zenscroll = require('./zenscroll');
window.fancybox = require('./fancybox.min');

/** -- Globals */
/** Constants / Variables / Utils / Ajax */
const constants = require('./modules/constants');
const variables = require('./modules/variables');
const utils = require('./modules/utils');
const ajax = require('./modules/ajax');
Object.assign(window, constants, variables, utils, ajax);

/** -- Append Elements */
/* Page Tips */
window.PageTip = require('./modules/dynamic/pageTip');
/* Backdrop */
window.Backdrop = require('./modules/dynamic/backdrop');
/* Page Confetti */
window.PageConfetti = require('./modules/dynamic/page-confetti');
/* Ask Modal */
window.AskModal = require('./modules/dynamic/ask-modal');
/* Loader Root */
window.rootLoader = require('./modules/dynamic/root-loader');
/* Sign Up price alerts */
require('./modules/dynamic/price-modal');

/** -- Page Elements */
// Login
require('./modules/login');

/** Header / Footer
 * @type Objects
 */
window.header = require('./modules/elements/header');
window.footer = require('./modules/elements/footer');

/** Page Elements
 * @type Object
 */
window.pageEls = require('./modules/elements/page-elements');
window.pageReviews = require('./modules/elements/page-reviews');
window.heroSplide = require('./modules/elements/hero-splide');
window.pageAlerts = require('./modules/elements/page-alerts');
window.sirvCards = require('./modules/elements/sirv');

/** Modals
 * Currency / Cart / Menu / Mail / Quiz / Sign / Menu
 * @type Obejcts
 */
window.currencyModal = require('./modules/modals/currency-modal');
window.cartModal = require('./modules/modals/cart-modal');
// window.bookModal = require('./modules/modals/book-modal')
window.mailModal = require('./modules/modals/mail-modal');
window.quizModal = require('./modules/modals/quiz-modal');
window.salesModal = require('./modules/modals/sales-modal');
const noticeModal = require('./modules/modals/notice-modal');
const Menu = require('./modules/modals/menu');
const AddCartModal = require('./modules/dynamic/add-cart-modal');
const Search = require('./modules/modals/search');
// const ShareButtons = require('./modules/elements/share-buttons')

/** PG Filters/Select/Modal
 * @type Objects
 */
window.pgSelect = require('./modules/elements/pg-select');
window.pgModal = require('./modules/elements/pg-modal');

/** -- Pages */
const /* Loan App : /financing */
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
  NoPage = require('./modules/pages/no-page'),
  SellPage = require('./modules/pages/sell-page'),
  /* My Bag : /cart */
  myBag = require('./modules/pages/my-bag'),
  /* Account Profile : /account */
  account = require('./modules/pages/account-page'),
  /* Locations : /locations */
  locationPage = require('./modules/pages/location-page'),
  /* Pass Reset : /pass-reset */
  passReset = require('./modules/pages/pass-reset'),
  /* Blog : /blog */
  blogPage = require('./modules/pages/blog-page'),
  /* Form Page : /form */
  formPage = require('./modules/pages/form-page'),
  /* Tag Preview : /tag */
  tagPreview = require('./modules/pages/tag-preview');
const sirvCards = require('./modules/elements/sirv');

const CheckoutPage = require('./modules/pages/checkout');

// Product Cards media loader
document.addEventListener('DOMContentLoaded', () => {
  initLazyLoadForProductCards();
});

/** -- Initialize Page Objects */
const pageObjectsArr = [
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
  // bookModal,
  passReset,
  pageReviews,
  blogPage,
  heroSplide,
  mailModal,
  quizModal,
  salesModal,
  formPage,
  tagPreview,
];
const initPageObjects = () => {
  for (const obj of pageObjectsArr) {
    try {
      if (typeof obj.init === 'function') {
        obj.init();
      } else {
        console.log(obj);
        console.log('No init function');
      }
    } catch (err) {
      console.error(`Error initializing ${obj}:`, err);
    }
  }
};

/** -- Init Page Objects */
document.addEventListener('DOMContentLoaded', function () {
  initPageObjects();
  window.pageTip = new PageTip();

  // Loan App
  const loanCaseHolder = document.querySelector('[data-id="loan-apply"]');
  if (loanCaseHolder) {
    window.loanApp = new LoanApp(loanCaseHolder);
  }

  // Job Apply
  const jobCaseHolder = document.querySelector('[data-id="job-apply"]');
  if (jobCaseHolder) {
    window.jobApp = new JobApp(jobCaseHolder);
  }

  // Form Page
  const form = document.querySelector('form#sell_my_watch');
  if (form) {
    window.sellMyWatch = new SellWatch();
  }

  // Loose Diamonds
  const looseDiamondsMain = document.querySelector('.loose_diamonds');
  if (looseDiamondsMain) {
    window.loose = new LooseDiamonds();
  }

  // Menu
  const menuElem = document.querySelector('.menu');
  if (menuElem) {
    window.menu = new Menu('.menu');
  }

  // Homepage
  new Homepage();

  // Results
  const resultsMain = document.querySelector('.main_results');
  if (resultsMain) {
    new ResultsPage();
  }

  const productMain = document.querySelector('.main_product');
  if (productMain) {
    window.productPage = new ProductPage();
  }

  // Notice modal
  window.noticeModal = new noticeModal();

  // Add to cart Modal
  window.addCartModal = new AddCartModal();

  // No Page / Made Order page
  new NoPage();

  // Search
  window.Search = new Search();

  // Checkout Page
  const checkoutMain = document.querySelector('.checkout-main');
  const checkoutBody = document.querySelector('.body_checkout');
  if (checkoutMain || checkoutBody) {
    new CheckoutPage();
  }

  // Sell Page
  const sellPageRoot = document.querySelector('.body_sell');
  if (sellPageRoot) {
    new SellPage(sellPageRoot);
  }
});
