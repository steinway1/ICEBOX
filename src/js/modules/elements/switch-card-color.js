export default class SwitchCardColor {
  #mockData = {
    150: {
      YellowSrc:
        'https://image.icebox.com/unsafe/600x0/icebox-jewelry.s3.amazonaws.com/products/a865d3552002730a248fdedf0721b331.jpg',
      RoseSrc: undefined,
      WhiteSrc:
        'https://image.icebox.com/unsafe/600x0/icebox-jewelry.s3.amazonaws.com/products/da82270d8916c65f626f7e831ab5682a.jpg',
    },
  };
  #fetchProductData(id, color) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/ajax/get-product-color-image',
        type: 'POST',
        data: { product: id, gc: color },
        datatype: 'json',
        success: function (response) {
          resolve(response);
        },
      });
    });
  }
  constructor(cardElement, color) {
    this.card = cardElement;
    this.productId = this.card.dataset.id;
    this.image = this.card.querySelector('.product-card__img');
    this.media = this.card.querySelector('.product-card__media');
    this.colorButtons = this.card.querySelectorAll('[data-switch-color]');
    this.currentColor = this.card.querySelector('[data-switch-color].--active').dataset.switchColor;
    this.color = color;

    this.#switch();
  }
  async #switch() {
    if (this.currentColor === this.color) return;

    try {
      this.media.classList.remove('--loaded');
      this.colorButtons.forEach(btn => btn.classList.add('--disabled'));

      const itemData = await this.#fetchProductData(this.productId, this.color);

      if (!itemData) {
        console.error('Product not found');
        return;
      }

      /**
       * @CHOU Check here that we get the image src
       * It's expected to get the src by color name + Src name . Example:
       * itemData.YellowSrc or itemData.RoseSrc
       */
      const colorImageSrc = itemData.src;
      if (!colorImageSrc) {
        console.error('Color image not found');
        return;
      }

      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = colorImageSrc;
      });

      this.image.src = colorImageSrc;
      this.colorButtons.forEach(btn => {
        btn.classList.toggle('--active', btn.dataset.switchColor === this.color);
      });
    } catch (err) {
      console.warn(err);
    } finally {
      this.media.classList.add('--loaded');
      this.colorButtons.forEach(btn => btn.classList.remove('--disabled'));
    }
  }
}
