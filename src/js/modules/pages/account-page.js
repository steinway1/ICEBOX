export default class AccountPage {
  constructor(rootEl) {
    this.rootEl = rootEl;

    this.attachEvents = {
      editAddress: () => {
        const evtEditAddress = Array.from($('[data-edit="address"]'));
        for (let i = 0; i < evtEditAddress.length; i++) {
          const el = evtEditAddress[i];

          $(el).click(function () {
            let details = $(this).closest('.profile-card').find('.profile-card__details'),
              form = details.filter('.form');
            if (elemDisplayed(form)) {
              details.hide().not(form).show();
            } else {
              details.show().not(form).hide();
            }
          });
        }
      },
      toggleInvoiceHeight: () => {
        const invoiceArr = [...document.querySelectorAll('.order__invoice')];
        for (const invoice of invoiceArr) {
          const header = invoice.querySelector('.order__invoice-header');
          const body = invoice.querySelector('.order__invoice-body');

          header.onclick = () => {
            const toClose = invoice.classList.contains(__ACTIVE);
            if (toClose) {
              invoice.classList.remove(__ACTIVE);
              body.style.height = `80px`;
            } else {
              invoice.classList.add(__ACTIVE);
              const scrollHeight = body.scrollHeight;
              body.style.height = `${scrollHeight}px`;
            }
          };
        }
      },
    };

    this.init();
  }

  init() {
    Object.values(this.attachEvents).forEach(fn => {
      if (fn !== undefined && typeof fn == 'function') fn();
    });
  }
}
