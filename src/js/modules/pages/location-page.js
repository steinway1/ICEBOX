export default class LocationPage {
  constructor() {
    this.attachEvents = {
      toggleStoresVisibility: () => {
        let headArr = [...$('.store-row__head')];
        $.each(headArr, i => {
          $(headArr[i]).click(function () {
            let rows = $('.store-row'),
              thisRow = $(this).closest(rows);
            if (elemDisplayed(thisRow.find('.store-row__body'))) {
              return false;
            } else {
              rows.find('.store-row__body').show();
              rows.not(thisRow).find('.store-row__body').hide();
            }
          });
        });
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
