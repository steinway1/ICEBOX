// src/js/main.js
var $ = require('jquery');
window.$ = window.jQuery = $;

Object.assign(window, require('./modules/constants'), require('./modules/utils'));

import './modules/login';
import './modules/dynamic/price-modal';

/**
 * Importing initial functions we call ALWAYS on any page
 */
import {
  initLazyLoadForProductCards,
  initTelInput,
  initBannerUploader,
  initCopyButtons,
  observeSmartPictures,
  observeFloatWhatsapp,
  bindYoutubeVideos,
  bindSwitchCardColor,
  initFilterDropdowns,
  initTrackingDateUpdate,
  removeZeroSubheading,
  initPageFilters,
  initFaqList,
  initListingSet,
  initCustomUploads,
  initStickyEls,
  initStickyScroll,
  initToggleInputs,
} from './modules/init';

document.addEventListener('DOMContentLoaded', () => {
  initLazyLoadForProductCards();
  initTelInput();
  initBannerUploader();
  initCopyButtons();
  observeSmartPictures();
  observeFloatWhatsapp();
  bindYoutubeVideos();
  bindSwitchCardColor();
  initFilterDropdowns();
  initTrackingDateUpdate();
  removeZeroSubheading();
  initPageFilters();
  initFaqList();
  initListingSet();
  initCustomUploads();
  initStickyEls();
  initStickyScroll();
  initToggleInputs();
});

/**
 * Importing page elements
 */
document.addEventListener('DOMContentLoaded', () => {
  /**
   * Page Reviews
   */
  const pageReviewsElem = document.querySelector('.page-reviews.splide');
  if (pageReviewsElem) {
    import('./modules/elements/page-reviews')
      .then(({ default: PageReviews }) => new PageReviews())
      .catch(console.error);
  }

  /**
   * Header
   * Footer
   */
  import('./modules/elements/header').then(({ default: Header }) => new Header()).catch(console.error);
  import('./modules/elements/footer').then(({ default: Footer }) => new Footer()).catch(console.error);

  /**
   * Tag Preview
   */
  const tagPreviewRoot = document.querySelector('.main_print-tag');
  if (tagPreviewRoot) {
    import('./modules/pages/tag-preview').then(({ default: TagPreview }) => new TagPreview()).catch(console.error);
  }
});

/**
 * Importing Modals
 */
document.addEventListener('DOMContentLoaded', () => {
  /**
   * ---- DYNAMIC ----
   */

  /**
   * Ask Modal
   */
  import('./modules/dynamic/ask-modal')
    .then(({ default: AskModal }) => (window.AskModal = AskModal))
    .catch(console.error);

  /**
   * Backdrop
   */
  import('./modules/dynamic/backdrop')
    .then(({ default: Backdrop }) => (window.Backdrop = Backdrop))
    .catch(console.error);

  /**
   * Root Loader
   */
  import('./modules/dynamic/root-loader')
    .then(({ default: RootLoader }) => (window.rootLoader = RootLoader))
    .catch(console.error);

  /**
   * Page Alerts
   */
  import('./modules/elements/page-alerts')
    .then(({ default: PageAlerts }) => (window.pageAlerts = new PageAlerts()))
    .catch(console.error);

  /**---- MODALS ---- */
  /**
   * Cart Modal
   */
  import('./modules/modals/cart-modal').then(({ default: CartModal }) => new CartModal()).catch(console.error);

  /**
   * Menu
   */
  const menuElem = document.querySelector('.menu');
  if (menuElem) {
    import('./modules/modals/menu').then(({ default: Menu }) => new Menu('.menu')).catch(console.error);
  }

  /**
   * Mail Modal
   */
  import('./modules/modals/mail-modal')
    .then(({ default: MailModal }) => (window.mailModal = new MailModal()))
    .catch(console.error);

  /**
   * Search
   */
  const searchRootElem = document.querySelector('.ib-search');
  if (searchRootElem) {
    import('./modules/modals/search').then(({ default: Search }) => new Search(searchRootElem)).catch(console.error);
  }

  /**
   * Currency Modal
   */
  const currencyModalRoot = document.querySelector('.cur-modal');
  if (currencyModalRoot) {
    import('./modules/modals/currency-modal')
      .then(({ default: CurrencyModal }) => new CurrencyModal(currencyModalRoot))
      .catch(console.error);
  }

  /**
   * Quiz Modal
   */
  const quizModalRoot = document.querySelector('.quiz-modal');
  if (quizModalRoot) {
    import('./modules/modals/quiz-modal').then(({ default: QuizModal }) => new QuizModal()).catch(console.error);
  }

  /**
   * Sales Modal
   */
  const salesModalRoot = document.querySelector('.sale-history-modal');
  if (salesModalRoot) {
    import('./modules/modals/sales-modal').then(({ default: SalesModal }) => new SalesModal()).catch(console.error);
  }

  /**---- PAGES ---- */
  /** Homepage
   * /index
   */
  const homepageMain = document.querySelector('.main_homepage');
  if (homepageMain) {
    import('./modules/pages/homepage').then(({ default: Homepage }) => new Homepage()).catch(console.error);
  }

  /**
   * Pass Reset
   * /pass-reset
   */
  const passResetRoot = document.querySelector('.pass-reset-page');
  if (passResetRoot) {
    import('./modules/pages/pass-reset').then(({ default: PassReset }) => new PassReset()).catch(console.error);
  }

  /**
   * Product Page
   * /product
   */
  const productMain = document.querySelector('.main_product');
  if (productMain) {
    import('./modules/pages/product').then(({ default: ProductPage }) => new ProductPage()).catch(console.error);
  }

  /** Results Page
   * /results
   */
  const resultsMain = document.querySelector('.main_results');
  if (resultsMain) {
    import('./modules/pages/results').then(({ default: ResultsPage }) => new ResultsPage()).catch(console.error);
  }

  /** Track Page
   * /track
   */
  const trackMain = document.querySelector('.main_track-order');
  if (trackMain) {
    import('./modules/pages/track-page')
      .then(({ default: TrackPage }) => new TrackPage(trackMain))
      .catch(console.error);
  }

  /** My Bag Page
   * My Cart
   * /cart
   */
  const cartRoot = document.querySelector('.body_cart');
  if (cartRoot) {
    import('./modules/pages/my-bag').then(({ default: CartPage }) => new CartPage()).catch(console.error);
  }

  /** Checkout Page
   * /checkout
   * /checkout-step1
   * /checkout-step2
   */
  const checkoutMain = document.querySelector('.checkout-main');
  const checkoutBody = document.querySelector('.body_checkout');
  if (checkoutMain || checkoutBody) {
    import('./modules/pages/checkout').then(({ default: CheckoutPage }) => new CheckoutPage()).catch(console.error);
  }

  /**
   * Blog Page
   * /blog
   */
  const blogPageRoot = document.querySelector('.main_article');
  if (blogPageRoot) {
    import('./modules/pages/blog-page').then(({ default: BlogPage }) => new BlogPage()).catch(console.error);
  }

  /**
   * Form Page
   * /form
   */
  const formPageRoot = document.querySelector('.main_formpage');
  if (formPageRoot) {
    import('./modules/pages/form-page').then(({ default: FormPage }) => new FormPage()).catch(console.error);
  }

  /**
   * Init Hero Splide Elements
   * Hero Splide
   */
  import('./modules/elements/hero-splide').then(({ default: HeroSplide }) => new HeroSplide()).catch(console.error);

  /** Sell Page
   * /sell-watches
   * /sell-diamonds
   * /sell-jewelry
   * /sell-gold
   */
  const sellPageRoot = document.querySelector('.body_sell');
  if (sellPageRoot) {
    import('./modules/pages/sell-page')
      .then(({ default: SellPage }) => new SellPage(sellPageRoot))
      .catch(console.error);
  }

  /** No Page / Made Order page
   * /404
   */
  const noPageRoot = document.querySelector('.nopage__categories');
  const noPageLinksArr = [...document.querySelectorAll('.nopage-link[data-id]')];
  if (noPageRoot || noPageLinksArr.length) {
    import('./modules/pages/no-page').then(({ default: NoPage }) => new NoPage()).catch(console.error);
  }

  /**
   * Sell My Watch
   * /sell-my-watch
   */
  const sellMyWatchForm = document.querySelector('form#sell_my_watch');
  if (sellMyWatchForm) {
    import('./modules/pages/sell-watch')
      .then(({ default: SellWatch }) => {
        window.sellMyWatch = new SellWatch(sellMyWatchForm);
      })
      .catch(console.error);
  }

  /**
   * Loose Diamonds
   * /loose
   */
  const looseDiamondsMain = document.querySelector('.loose_diamonds');
  if (looseDiamondsMain) {
    import('./modules/pages/loose-diamonds')
      .then(({ default: LooseDiamonds }) => {
        window.loose = new LooseDiamonds();
      })
      .catch(console.error);
  }

  /** Job Apply
   * /apply-job
   */
  const jobCaseHolder = document.querySelector('[data-id="job-apply"]');
  if (jobCaseHolder) {
    import('./modules/pages/job-app').then(({ default: JobApp }) => new JobApp(jobCaseHolder)).catch(console.error);
  }

  /**
   * Loan App
   * /finance
   */
  const loanCaseHolder = document.querySelector('.main_finance');
  if (loanCaseHolder) {
    import('./modules/pages/loan-app').then(({ default: LoanApp }) => new LoanApp(loanCaseHolder)).catch(console.error);
  }

  /**
   * Locations Page
   * /locations
   */
  const locationPageRoot = document.querySelector('.main_locations');
  if (locationPageRoot) {
    import('./modules/pages/location-page')
      .then(({ default: LocationPage }) => new LocationPage())
      .catch(console.error);
  }

  /**
   * Account Page
   * /account
   */
  const accountPageRoot = document.querySelector('.main_account');
  if (accountPageRoot) {
    import('./modules/pages/account-page')
      .then(({ default: AccountPage }) => new AccountPage(accountPageRoot))
      .catch(console.error);
  }

  /**
   * ---- MODALS ----
   */

  /**
   * Terms Modal
   */
  const termsModalRoot = document.querySelector('[data-terms-modal]');
  if (termsModalRoot) {
    import('./modules/modals/terms-modal').then(({ default: TermsModal }) => new TermsModal()).catch(console.error);
  }

  /**
   * --- ALWAYS IMPORTED MODULES ---
   * Add cart modal
   */
  /**
   * Add cart modal
   */
  import('./modules/dynamic/add-cart-modal')
    .then(({ default: AddCartModal }) => {
      window.addCartModal = new AddCartModal();
    })
    .catch(console.error);

  /**
   * Notice Information Modal
   */
  import('./modules/modals/notice-modal')
    .then(({ default: NoticeModal }) => {
      window.noticeModal = new NoticeModal();
    })
    .catch(console.error);

  /**
   * Page Tips
   */
  import('./modules/dynamic/pageTip').then(({ default: PageTip }) => {
    window.pageTip = new PageTip();
  });
});

/**
 * Under dispute
 */
document.addEventListener('DOMContentLoaded', () => {
  /**
   * Fancybox
   * /admin
   */
  const adminHeader = document.querySelector('.am-header');
  if (adminHeader) {
    import('./fancybox.min')
      .then(module => {
        window.fancybox = module.default;
      })
      .catch(console.error);
  }
});
