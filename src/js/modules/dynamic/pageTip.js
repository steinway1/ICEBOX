/**
 * Page Tips
 */
(function(global) {
  function PageTip() {
    this.tipElem = null;
    this.handleHover();
  }

  PageTip.prototype.handleHover = function() {
    document.querySelectorAll('[data-tip]').forEach(elem => {
      elem.addEventListener('mouseenter', e => {
        this.createTip(elem);
        this.tipElem.textContent = elem.dataset.tip;
        this.setTipPosition(elem);
      });

      elem.addEventListener('mouseleave', e => {
        this.destroyTip();
      });
    });
  };

  PageTip.prototype.createTip = function(target) {
    if (!this.tipElem) {
      this.tipElem = document.createElement('div');
      this.tipElem.classList.add('page-tip');
      document.body.append(this.tipElem);

      if (target) {
        const extraClass = target.dataset.tipClass;
        if (extraClass) {
          this.tipElem.classList.add(`--${extraClass}`);
        }
      }
    }
  };

  PageTip.prototype.setTipPosition = function(elem) {
    const { left, top, width, height } = elem.getBoundingClientRect();
    const tipWidth = this.tipElem.getBoundingClientRect().width;
    const tipHeight = this.tipElem.getBoundingClientRect().height;
    const elemHeight = elem.offsetHeight;
    const elemWidth = elem.offsetWidth;

    let topPosition = top - tipHeight - 8;
    let leftPosition = (left + (elemWidth / 2)) - (tipWidth / 2);

    if (topPosition < 100) {
      topPosition = top + elemHeight + 8;
      this.tipElem.classList.add('--top');
    }

    if (leftPosition < 0) {
      leftPosition = left;
      this.tipElem.classList.add('--left');
    }

    this.tipElem.style.top = `${topPosition}px`;
    this.tipElem.style.left = `${leftPosition}px`;
  };

  PageTip.prototype.destroyTip = function() {
    if (this.tipElem) {
      this.tipElem.remove();
      this.tipElem = null;
    }
  };

  // Экспортируем класс PageTip
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PageTip;
  } else {
    global.PageTip = PageTip;
  }
})(typeof window !== "undefined" ? window : global);