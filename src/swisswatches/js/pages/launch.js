import Splide from "@splidejs/splide";

class LaunchPage {
  constructor(rootSelector) {
    const rootEl = document.querySelector(rootSelector);
    if (!rootEl) {
      throw new Error(`No element found with selector ${rootSelector}`);
    }
    this.rootEl = rootEl;
    this.cardsGrid = this.rootEl.querySelector("#launchCards");
    this.init();
  }
  init() {
    console.log("LaunchPage init");
  }
  #initSplide() {
    const launchSplide = new Splide(this.cardsGrid, {
      type: "loop",
      perPage: 6,
      perMove: 1,
      gap: 12,
      breakpoints: {
        1860: {
          perPage: 5,
        },
        1024: {
          perPage: 4,
        },
        768: {
          perPage: 3,
        },
        620: {
          perPage: 2,
        },
        320: {
          perPage: 1,
        },
      },
    });
    launchSplide.mount();
  }
}

export default LaunchPage;
