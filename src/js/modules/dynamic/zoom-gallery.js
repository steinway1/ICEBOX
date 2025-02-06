class ZoomGallery {
  constructor(mediaArr, scrollIndex) {
    this.elem = null;
    this.mediaArr = mediaArr;
    this.zoomMediaArr = [];
    this.scrollIndex = scrollIndex || undefined;
    this.init();
  }
  init() {
    this._create();
    this._bindInnerEvents();
    this.open();
    this.removeLazyLoaders();
  }

  // Render HTML
  _renderMediaHTML() {
    let html = "";
    for (const media of this.mediaArr) {
      const clone = media.cloneNode(true);
      clone.removeAttribute("style");
      clone.className = "product-media --loading";

      const loader = document.createElement("div");
      loader.className = "card-loader";
      loader.innerHTML = `
					<svg viewBox="0 0 40 40" focusable="false" aria-hidden="true">
						<circle stroke-width="3" stroke-linejoin="round" fill="none" cx="20" cy="20" r="18"></circle>
					</svg>
      `;
      clone.append(loader);

      const image = clone.querySelector("img");
      if (image) {
        const src = image.getAttribute("src");
        if (src && src.includes("/600x0/")) {
          image.src = src.replace("/600x0/", "/0x0/");
        }
      }

      html += clone.outerHTML;
      this.zoomMediaArr.push(clone);
    }
    return html;
  }
  _renderInnerHTML() {
    const name = document.querySelector("#item_name");
    return `
    <div class="zoom2__wrapper">
      <div class="zoom2__scroller">
        <div class="zoom2__header">
          <h4>${name.textContent}</h4>
          <button data-zoom-close class="zoom2__close-btn"></button>
        </div>
        ${this._renderMediaHTML()}
      </div>
      <div data-zoom-close class="zoom2__footer">
        <span>Get Back</span>
      </div>
    </div>
    `;
  }
  _create() {
    this.elem = document.createElement("div");
    this.elem.className = "zoom2";
    this.elem.innerHTML = this._renderInnerHTML();
    document.body.append(this.elem);
  }
  _scrollToIndex() {
    if (this.scrollIndex) {
      const scroller = this.elem.querySelector(".zoom2__scroller");
      const mediaHeight =
        this.elem.querySelector(".product-media").offsetHeight;
      scroller.scrollTop = mediaHeight * this.scrollIndex;
    }
  }

  // Methods
  hide() {
    if (this.elem) {
      unlockScroll();
      this.elem.classList.remove(__VISIBLE);
      setTimeout(() => {
        this.elem.style.display = "none";
        this.destroy();
      }, getTransitionTime(this.elem));
    }
  }
  open() {
    if (!this.elem) throw new Error("No element created Zoom2 ZoomGallery");

    lockScroll();
    this.elem.style.display = "block";
    this._scrollToIndex();
    requestAnimationFrame(() => {
      this.elem.classList.add(__VISIBLE);
    });
  }
  removeLazyLoaders() {
    const mediaArr = [...this.elem.querySelectorAll(".product-media")];
    for (const media of mediaArr) {
      const img = media.querySelector("img");
      if (img && img.complete) {
        media.classList.remove("--loading");
      } else if (img) {
        img.onload = () => media.classList.remove("--loading");
      }
    }
  }

  // Events
  _bindInnerEvents() {
    if (this.elem) {
      const closeArr = [...this.elem.querySelectorAll("[data-zoom-close]")];
      closeArr.forEach((closeElem) => {
        closeElem.addEventListener("click", this.hide.bind(this));
      });
    }
  }

  // Init
  destroy() {
    if (this.elem) {
      this.elem.remove();
      this.elem = null;
    }
  }
}

module.exports = ZoomGallery;
