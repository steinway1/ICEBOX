/**
 * Page Tips
 */
(function(global) {
  function PageTip() {
    this.tipElem = null;
    this.currentTarget = null;
    this.scrollHandler = this.handleScroll.bind(this); // Привязываем контекст и сохраняем ссылку на функцию
    this.handleHover();
  }

  PageTip.prototype.handleHover = function() {
    document.querySelectorAll('[data-tip]').forEach(elem => {
      elem.addEventListener('mouseenter', e => {
        this.createTip(elem);
        this.tipElem.textContent = elem.dataset.tip;
        this.setTipPosition(elem);

        // Добавляем обработчик события scroll
        window.addEventListener('scroll', this.scrollHandler);
      });

      elem.addEventListener('mouseleave', e => {
        this.destroyTip();

        // Убираем обработчик события scroll
        window.removeEventListener('scroll', this.scrollHandler);
      });
    });
  };

  PageTip.prototype.createTip = function(target) {
    if (!this.tipElem) {
      this.tipElem = document.createElement('div');
      this.tipElem.classList.add('page-tip');
      this.tipElem.style.position = 'absolute'; // Устанавливаем позиционирование на absolute
      this.tipElem.style.opacity = '0'; // Начальная непрозрачность
      this.tipElem.style.transition = 'opacity 0.3s ease, transform 0.3s ease'; // Переходы для анимации
      document.body.append(this.tipElem);

      if (target) {
        const extraClass = target.dataset.tipClass;
        if (extraClass) {
          this.tipElem.classList.add(`--${extraClass}`);
        }
      }

      // Сохраняем текущий целевой элемент
      this.currentTarget = target;
    }
  };

  PageTip.prototype.setTipPosition = function(elem) {
    const rect = elem.getBoundingClientRect();
    const tipRect = this.tipElem.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const elemHeight = elem.offsetHeight;
    const elemWidth = elem.offsetWidth;

    let topPosition = rect.top + scrollTop - tipRect.height - 4;
    let leftPosition = rect.left + scrollLeft + (elemWidth / 2) - (tipRect.width / 2);

    // Сбрасываем классы
    this.tipElem.classList.remove('--top', '--bottom', '--left', '--right');

    // Определяем, сверху или снизу отображать подсказку
    let isBelow = false;
    if (topPosition < scrollTop + 100) { // Учитываем позицию прокрутки
      topPosition = rect.top + scrollTop + elemHeight + 4;
      this.tipElem.classList.add('--bottom');
      isBelow = true;
    } else {
      this.tipElem.classList.add('--top');
    }

    if (leftPosition < 0) {
      leftPosition = rect.left + scrollLeft;
      this.tipElem.classList.add('--left');
    }

    this.tipElem.style.top = `${topPosition}px`;
    this.tipElem.style.left = `${leftPosition}px`;

    // Устанавливаем начальные стили для анимации
    if (isBelow) {
      this.tipElem.style.transform = 'translateY(8px)';
    } else {
      this.tipElem.style.transform = 'translateY(-8px)';
    }

    // Используем requestAnimationFrame для обеспечения правильного применения стилей
    requestAnimationFrame(() => {
      this.tipElem.style.opacity = '1';
      this.tipElem.style.transform = 'translateY(0px)';
    });
  };

  PageTip.prototype.handleScroll = function() {
    this.destroyTip();

    // Убираем обработчик события scroll
    window.removeEventListener('scroll', this.scrollHandler);
  };

  PageTip.prototype.destroyTip = function() {
    if (this.tipElem) {
      this.tipElem.remove();
      this.tipElem = null;
      this.currentTarget = null;
    }
  };

  // Экспортируем класс PageTip
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PageTip;
  } else {
    global.PageTip = PageTip;
  }
})(typeof window !== "undefined" ? window : global);
