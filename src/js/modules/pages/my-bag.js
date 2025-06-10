export default class CartPage {
  constructor() {
    this.init();
  }

  init() {
    Object.values(this.attachEvents).forEach(fn => {
      if (fn !== undefined && typeof fn === 'function') fn.call(this);
    });
  }

  attachEvents = {
    bindCartSummaryToggle() {
      if (document.body.classList.contains('body_cart')) {
        const triggerArr = [...document.querySelectorAll('[data-evt="toggleCartSummary"]')];
        const cssClass = 'mybag-summary-open';

        if (triggerArr.length) {
          for (const trigger of triggerArr) {
            trigger.addEventListener('click', () => {
              if (document.body.classList.contains(cssClass)) {
                document.body.classList.remove(cssClass);
                unlockScroll();
                if (window.cartSummaryBackdrop) {
                  window.cartSummaryBackdrop.hide(true);
                }
              } else {
                document.body.classList.add(cssClass);
                lockScroll();
                window.cartSummaryBackdrop = new Backdrop({
                  half: true,
                  zIndex: 20,
                  callback: () => {
                    document.body.classList.remove(cssClass);
                    unlockScroll();
                  },
                });
              }
            });
          }
        }
      }
    },
    formatSummaryPrice: () => {
      const lines = [...document.querySelectorAll('.summary-price')];
      for (const line of lines) {
        const span = line.querySelector('span:last-child');
        if (span) {
          const text = span.innerText;
          let num = Number(text.replace(/[^0-9.-]/g, ''));
          if (num !== 0) {
            num = num.toFixed(2);
            num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            span.innerText = `$ ${num}`;
          }
        }
      }
    },

    setSalePercentValues: () => {
      const cards = [...document.querySelectorAll('.mybag-card')];
      for (const card of cards) {
        const newPrice = card.querySelector('.card-price_new');
        const oldPrice = card.querySelector('.card-price_old');
        const saleElem = card.querySelector('.mybag-card-sale');
        if (newPrice && oldPrice && saleElem) {
          const newPriceNum = Number(newPrice.innerText.replace(/[^0-9]/g, ''));
          const oldPriceNum = Number(oldPrice.innerText.replace(/[^0-9]/g, ''));
          let sale = ((oldPriceNum - newPriceNum) / oldPriceNum) * 100;
          sale = Math.round(sale / 10) * 10;
          if (sale % 10 >= 5) {
            sale = Math.ceil(sale / 10) * 10;
          } else {
            sale = Math.floor(sale / 10) * 10;
          }
          saleElem.innerText = `${sale}% OFF`;
        }
      }
    },

    setCapitalizeCheckoutBtn: () => {
      const btnArr = [...document.querySelectorAll('.checkout__main-btn')];
      for (const btn of btnArr) {
        const text = btn.innerText.split(' ').reduce((acc, el) => {
          acc.push(el.charAt(0).toUpperCase() + el.slice(1).toLowerCase());
          return acc;
        }, []);
        btn.innerText = text.join(' ');
      }
    },
  };
}
