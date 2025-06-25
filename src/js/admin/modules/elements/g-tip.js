class GTip {
  constructor() {
    this.card = null;
    this.query = '';

    this.elem = document.querySelector('.g-tip');
    this.input = this.elem?.querySelector('.g-tip__input') ?? null;

    if (this.elem) {
      this.extendElem();
      this.bindEvents();
    }
  }

  extendElem() {
    this.elem.setupLinks = () => {
      if (!this.card) return;
      const linksToHide = ['Contract', 'Sportrac'];
      const links = [...this.elem.querySelectorAll('a')];
      const showContract = this.card.dataset.showContract;

      links.forEach(link => {
        link.style.display = 'block';
        if (!showContract && linksToHide.includes(link.textContent)) {
          link.style.display = 'none';
        }
      });
    };

    this.elem.open = () => {
      if (!this.card) return;
      const anchor = this.card.querySelector('.ext-search');
      if (!anchor) return;

      const rect = anchor.getBoundingClientRect();
      const box = this.elem;
      box.style.display = 'block';

      let left = rect.left > box.offsetWidth / 2 ? rect.left - box.offsetWidth / 2 + anchor.offsetWidth / 2 : rect.left;

      let top =
        window.innerHeight - rect.bottom < box.offsetHeight + 20
          ? window.scrollY + rect.top - box.offsetHeight - 10
          : window.scrollY + rect.top + anchor.offsetHeight + 10;

      if (left < 0) left = 0;
      if (left + box.offsetWidth > window.innerWidth) {
        left = window.innerWidth - box.offsetWidth;
      }

      box.style.left = `${left}px`;
      box.style.top = `${top}px`;
    };

    this.elem.reset = () => {
      this.elem.style.display = 'none';
      this.card = null;
      this.query = '';
    };

    this.elem.submit = () => {
      const url = `https://www.google.com/search?q=${encodeURIComponent(this.query)}`;
      window.open(url, '_blank');
    };
  }

  bindEvents() {
    document.addEventListener('click', e => {
      const target = e.target;
      console.log(target);

      if (target.matches('[data-evt="openGoogleTip"]')) {
        this.card = target.closest('.whale-card');
        this.elem.setupLinks();
        this.elem.open();
        return; // done
      }

      if (target.matches('.g-tip__queries a')) {
        if (this.card) {
          const name = this.card.querySelector('.whale-card__name')?.textContent ?? '';
          this.query = `${name} ${target.textContent}`.trim();
          this.elem.submit();
        }
        return;
      }

      if (target.matches('[data-evt="submitGoogleTip"]')) {
        if (this.card) {
          const name = this.card.querySelector('.whale-card__name')?.textContent ?? '';
          this.query = `${name} ${this.input.value}`.trim();
          this.elem.submit();
        }
        return;
      }

      if (!target.classList.contains('ext-search') && !target.closest('.g-tip')) {
        this.elem.reset();
      }
    });

    if (this.input) {
      this.input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (this.card) {
            const name = this.card.querySelector('.whale-card__name')?.textContent ?? '';
            this.query = `${name} ${this.input.value}`.trim();
            this.elem.submit();
          }
        }
      });
    }

    window.addEventListener('scroll', () => this.elem.reset(), { passive: true });
  }
}

export function initGTip() {
  new GTip();
}
