export class ProductCard {
  private listingArr: HTMLElement[] = [];

  constructor() {
    this.listingArr = [...document.querySelectorAll<HTMLElement>(".listing")];
    this.init();
  }

  private init() {
    this.bindToggleVideoOnHover();
  }

  /**
   * Handle toggle video on hover and stop video on mouseleave
   */
  private bindToggleVideoOnHover() {
    this.listingArr.forEach((listing) => {
      // Play video on mouseenter
      listing.addEventListener(
        "mouseenter",
        (e) => {
          const target = e.target as HTMLElement;
          const productCard = target.closest(
            ".product-card__media",
          ) as HTMLElement | null;
          if (productCard) {
            const video = productCard.querySelector(
              "video",
            ) as HTMLVideoElement | null;
            if (video) {
              video.play();
            }
          }
        },
        true,
      );

      // Pause and reset video on mouseleave
      listing.addEventListener(
        "mouseleave",
        (e) => {
          const target = e.target as HTMLElement;
          const productCard = target.closest(
            ".product-card__media",
          ) as HTMLElement | null;
          if (productCard) {
            const video = productCard.querySelector(
              "video",
            ) as HTMLVideoElement | null;
            if (video) {
              video.pause();
            }
          }
        },
        true,
      );
    });
  }
}
