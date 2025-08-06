import Splide from '@splidejs/splide';

class Homepage {
  constructor() {
    this.init();
  }

  // Splides
  initCategoriesSplide() {
    const categoriesElem = document.querySelector('.home-categories-splide');
    if (categoriesElem) {
      let slider = new Splide(categoriesElem, {
        type: 'loop',
        perPage: 7,
        perMove: 2,
        autoplay: 0,
        gap: '8px',
        arrows: 1,
        pagination: 0,
        speed: 750,
        breakpoints: {
          1680: { perPage: 6 },
          1120: { perPage: 5 },
          767: { perPage: 3, perMove: 2 },
          600: { perPage: 2, gap: 6 },
        },
      });
      slider.mount();
    }
  }

  initSplide() {
    const splideArr = [...document.querySelectorAll('.home-splide')];
    if (splideArr.length) {
      splideArr.forEach(elem => {
        let slider = new Splide(elem, {
          type: 'loop',
          perPage: 5,
          perMove: 1,
          autoplay: 0,
          gap: '8px',
          arrows: 1,
          pagination: 0,
          speed: 750,
          breakpoints: {
            1980: {
              perPage: 5,
            },
            1680: {
              perPage: 4,
            },
            991: {
              perPage: 4,
              perMove: 1,
            },
            767: {
              perPage: 3,
            },
            478: {
              perPage: 2,
            },
          },
        });
        slider.mount();
      });
    }
  }

  init() {
    this.initCategoriesSplide();
    this.initSplide();
  }
}

module.exports = Homepage;
