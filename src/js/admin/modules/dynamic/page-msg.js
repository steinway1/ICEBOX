import { createElem, getTransitionTime } from "../general/utils";

export default class PageMsg {
  constructor(settings = {}) {
    this.heading = settings.heading || "Something went wrong";
    this.msg = settings.msg || "Undefined message";
    this.timeout = settings.timeout || 5000;
    this.keep = settings.keep || false;
    this.callback = settings.callback || null;
    this.hideCallback = settings.hideCallback || null;
    this.type = settings.type || "";
    this.id = settings.id || null;
    this.zIndex = settings.zIndex || null;
    this.msgElem = null;
    this.closeBtn = null;

    this.init();
  }

  hide() {
    this.msgElem.style.transform = "translateY(calc(100% + 20px))";
    this.msgElem.style.opacity = 0;
    setTimeout(() => {
      this.msgElem.remove();
    }, this.getTransitionTime(this.msgElem));
    if (this.hideCallback) {
      this.hideCallback();
    }
  }

  getTransitionTime(element) {
    return getTransitionTime(element);
  }

  init() {
    const html = `
      <h4>${this.heading}</h4>
      <p>${this.msg}</p>
    `;

    this.msgElem = createElem("div", {
      className: `page-msg ${this.type}`,
      innerHTML: html,
      style: {
        transform: "translateY(calc(100% + 20px))",
        opacity: 0,
      },
    });

    this.closeBtn = createElem("button", {});
    this.closeBtn.onclick = () => this.hide();

    this.msgElem.prepend(this.closeBtn);
    document.body.appendChild(this.msgElem);

    setTimeout(() => {
      this.msgElem.style.transform = "translateY(0)";
      this.msgElem.style.opacity = 1;
    }, 10);

    if (!this.keep) {
      setTimeout(() => {
        if (document.body.contains(this.msgElem)) {
          this.hide();
        }
      }, this.timeout);
    }

    if (this.callback) {
      this.callback();
    }

    if (this.zIndex) {
      this.msgElem.style.zIndex = this.zIndex;
    }
  }
}
