const heroSplide = {
  init: function () {
    try {
      this.initSplide();
      this.initHeroSplide();
      this.initShortsSplide();
      this.initReviewsSplide();
    } catch (err) {
      console.log(err.message);
    }
  },
  initSplide: function () {
    const heroSplide = [...document.querySelectorAll('.hero_splide')];
    if (heroSplide.length !== 0) {
      heroSplide.forEach(slide => {
        let slider = new Splide(slide, {
          type: 'slider',
          perPage: 4,
          perMove: 2,
          autoplay: 0,
          gap: '12px',
          arrows: 1,
          pagination: 0,
          speed: 750,
          breakpoints: {
            991: { perPage: 2.5 },
            767: { perPage: 2, perMove: 1 },
            478: { perPage: 1.4, perMove: 1, gap: 8 },
          },
        });
        slider.mount();
      });
    }
  },
  initHeroSplide: function () {
    const heroSplide = [...document.querySelectorAll('.splide--hero')];
    for (const slide of heroSplide) {
      let slider = new Splide(slide, {
        type: 'loop',
        perPage: 4,
        perMove: 1,
        gap: 16,
        pagination: 0,
        breakpoints: {
          1280: {
            perPage: 3,
          },
          991: {
            perPage: 2,
            gap: 8,
            grid: {
              rows: 2,
              cols: 2,
              gap: {
                row: 24,
                col: 8,
              },
            },
          },
        },
      });
      slider.mount();
      //   slider.mount(window.splide.Extensions);
    }
  },
  initShortsSplide: function () {
    const shortsSplide = [...document.querySelectorAll('.splide--shorts')];
    for (const slide of shortsSplide) {
      let slider = new Splide(slide, {
        type: 'slider',
        perPage: 5,
        perMove: 1,
        gap: 16,
        pagination: 0,
        breakpoints: {
          1320: {
            perPage: 4,
          },
          991: {
            perPage: 3,
          },
          767: {
            perPage: 2,
          },
          478: {
            perPage: 2,
            perMove: 1,
            gap: 16,
          },
        },
      });
      slider.mount();
    }
  },
  initReviewsSplide: function () {
    const reviewsSplide = [...document.querySelectorAll('.splide--reviews')];
    for (const slide of reviewsSplide) {
      let slider = new Splide(slide, {
        type: 'loop',
        perPage: 4,
        perMove: 1,
        gap: 16,
        pagination: 0,
        breakpoints: {
          1320: {
            perPage: 3,
          },
          991: {
            perPage: 2,
          },
          767: {
            perPage: 1,
          },
          478: {
            gap: 8,
            perPage: 1,
          },
        },
      });
      slider.mount();
    }
  },
};

module.exports = heroSplide;
