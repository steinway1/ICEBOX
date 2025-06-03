const footer = new Object({
  bindEvents: function () {
    const toggleArr = [...document.querySelectorAll('.footer-nav__col-head')];
    for (const elem of toggleArr) {
      elem.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 991px)').matches) {
          const list = elem.parentElement.querySelector('.footer-nav__list');
          const icon = elem.querySelector('.footer__toggle-icon');
          list.classList.toggle('--active');
          icon.classList.toggle('--active');
        }
      });
    }
  },
  init: function () {
    this.bindEvents();
  },
});

module.exports = footer;
