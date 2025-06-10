export default class PageReviews {
  constructor() {
    if (document.querySelector('.page-reviews.splide') !== null) {
      this.initSplide();
    }
  }

  initSplide() {
    try {
      let main = new Splide('.page-reviews', {
        type: 'slider',
        perPage: 3.4,
        perMove: 1,
        autoplay: 0,
        pauseOnHover: 1,
        pauseOnFocus: 1,
        gap: 12,
        arrows: 1,
        pagination: 1,
        speed: 500,
        breakpoints: {
          991: {
            perPage: 2.2,
          },
          620: {
            perPage: 1.3,
          },
        },
      });
      main.mount();
    } catch {
      console.log('Page Review SPLIDE ERR');
    }
  }
}
