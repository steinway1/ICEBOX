class CareModal {
  constructor() {
    this.elem = document.querySelector('.care-modal')
    this.openArr = [...document.querySelectorAll('[data-care-open]')]
    this.closeArr = [...document.querySelectorAll('[data-care-close]')]
    this.contentArr = [...document.querySelectorAll('[data-care-content]')]
    this.activeSection = undefined
    this.opened = false
    this.init()
  }
  init() {
    this.bindEvents()
    this.setSoapOverlay()
  }

  // Utils
  reset() {
    this.contentArr.forEach(e => e.style.display = 'none')
    this.contentArr[0].style.display = 'block'
  }

  // Events
  bindEvents() {
    // Open
    for (const elem of this.openArr) {
      elem.addEventListener('click', () => {
        this.switchContent(elem.dataset.careOpen)
        this.show()
      })
    }
    // Hide
    for (const elem of this.closeArr) {
      elem.addEventListener('click', () => {
        this.hide()
      })
    }
    document.addEventListener('click', (e) => {
      const target = e.target
      if (this.opened && !target.closest('.care-modal') && !target.closest('[data-care-open]')) {
        this.hide()
      }
    })
  }

  // Toggle view
  hide() {
    if (window.careBackdrop) {
      window.careBackdrop.hide(true)
    }

    this.opened = false
    unlockScroll()
    this.elem.classList.remove(__VISIBLE)
    setTimeout(() => {
      this.elem.style.display = 'none'
      this.reset()
    }, getTransitionTime(this.elem));
  }
  show() {

    window.careBackdrop = new window.Backdrop({
      half: true,
      callback: () => {
        this.hide()
      }
    })

    this.opened = true
    lockScroll()
    this.elem.style.display = 'block'

    if (this.activeSection) {
      const body = this.activeSection.querySelector('.care-modal__body')
      if (body) {
        body.scrollTop = 0
      }
    }

    requestAnimationFrame(() => {
      this.elem.classList.add(__VISIBLE)
    })
  }
  switchContent(type) {
    const sectionToShow = this.contentArr.find(e => e.dataset.careContent === type) || this.contentArr[0]
    this.activeSection = sectionToShow

    this.contentArr.forEach(e => e.style.display = 'none')
    sectionToShow.style.display = 'block'
  }

  // Animation Background
  setSoapOverlay() {
    const isMobile = () => {
      return window.innerWidth < 992
    }

    var canvas = document.querySelector('#soap_overlay');
    var ctx = canvas.getContext('2d');
    var bubbles = [];
    var bubbleCount = isMobile() ? 20 : 35;
    var bubbleSpeed = isMobile() ? 1.6 : 2.2;
    var popLines = 6;
    var popDistance = 10;
    var strokeColor = '#fffffff8';

    // Переменные для размеров пузырьков
    var minBubbleSize = 4; // Минимальный размер пузырька
    var maxBubbleSize = isMobile() ? 28 : 46; // Максимальный размер пузырька
    var randomBubbleSize = true; // true для случайных размеров, false для фиксированного размера

    // Переменные для контроля прозрачности пузырьков (от 0 до 1)
    var bubbleOpacity = 1;    // Максимальная прозрачность пузырьков
    var minimalOpacity = 1;   // Минимальная прозрачность пузырьков
    var randomOpacity = false;   // true для случайной прозрачности, false для фиксированной

    // Переменная для процента пузырьков, которые будут лопаться сами по себе
    var popPercentage = 98; // Процент пузырьков, которые будут лопаться (от 0 до 100)

    // Переменная для управления плавным исчезновением пузырьков
    var fadeOut = true; // true для включения эффекта плавного исчезновения, false для отключения

    // Функция для установки размеров canvas
    function setCanvasSize() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }

    // Устанавливаем размеры canvas при загрузке страницы
    setCanvasSize();

    // --------------
    // Цикл анимации
    // --------------

    function animate() {

      // Очистка Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Рисуем пузырьки
      ctx.beginPath();
      for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].position.x = Math.sin(bubbles[i].count / bubbles[i].distanceBetweenWaves) * 50 + bubbles[i].xOff;
        bubbles[i].position.y = bubbles[i].count;
        bubbles[i].render();

        if (bubbles[i].count < 0 - bubbles[i].radius) {
          bubbles[i].count = canvas.height + bubbles[i].yOff;
          bubbles[i].resetProperties();
        } else {
          bubbles[i].count -= bubbleSpeed;
        }

        // Логика автономного лопания пузырька
        if (!bubbles[i].popping && bubbles[i].shouldPop()) {
          bubbles[i].initiatePop();
        }
      }

      window.requestAnimationFrame(animate);
    }

    window.requestAnimationFrame(animate);

    // ------------------
    // Конструктор пузырька
    // ------------------

    var createBubble = function () {
      this.position = { x: 0, y: 0 };
      this.radius = getBubbleRadius();
      this.xOff = Math.random() * canvas.width - this.radius;
      this.yOff = Math.random() * canvas.height;
      this.distanceBetweenWaves = 50 + Math.random() * 40;
      this.count = canvas.height + this.yOff;
      this.color = strokeColor;
      this.lines = [];
      this.popping = false;
      this.maxRotation = 140;
      this.rotation = Math.floor(Math.random() * (this.maxRotation * 2)) - this.maxRotation;
      this.rotationDirection = 'forward';
      this.opacity = getBubbleOpacity(); // Устанавливаем начальную прозрачность

      // Добавляем линии для анимации лопания
      for (var i = 0; i < popLines; i++) {
        var tempLine = new createLine();
        tempLine.bubble = this;
        tempLine.index = i;

        this.lines.push(tempLine);
      }

      // Флаг, указывающий, должен ли пузырек лопнуть
      this.willPop = Math.random() < popPercentage / 100;
      // Точка, в которой пузырек лопнет (случайная позиция по Y)
      this.popPoint = Math.random() * canvas.height;

      this.resetProperties = function () {
        this.radius = getBubbleRadius();
        this.xOff = Math.random() * canvas.width - this.radius;
        this.yOff = Math.random() * canvas.height;
        this.distanceBetweenWaves = 50 + Math.random() * 40;
        this.popping = false;
        this.willPop = Math.random() < popPercentage / 100;
        this.popPoint = Math.random() * canvas.height;
        this.opacity = getBubbleOpacity(); // Сбрасываем прозрачность

        // Сбрасываем состояния линий
        for (var i = 0; i < this.lines.length; i++) {
          this.lines[i].resetValues();
        }
      }

      // Проверяем, должен ли пузырек лопнуть в текущей позиции
      this.shouldPop = function () {
        return this.willPop && this.position.y <= this.popPoint;
      }

      // Инициализируем процесс лопания
      this.initiatePop = function () {
        this.popping = true;
        for (var a = 0; a < this.lines.length; a++) {
          this.lines[a].popping = true;
        }
      }

      // Рендеринг пузырька
      this.render = function () {
        if (this.rotationDirection === 'forward') {
          if (this.rotation < this.maxRotation) {
            this.rotation++;
          } else {
            this.rotationDirection = 'backward';
          }
        } else {
          if (this.rotation > -this.maxRotation) {
            this.rotation--;
          } else {
            this.rotationDirection = 'forward';
          }
        }

        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation * Math.PI / 180);

        // Обновляем прозрачность, если включен эффект fadeOut
        if (fadeOut && !this.popping) {
          var distanceRemaining = this.position.y + this.radius;
          var totalDistance = canvas.height + this.radius;
          var fadeOpacity = this.opacity * (distanceRemaining / totalDistance);
          ctx.globalAlpha = fadeOpacity < 0 ? 0 : fadeOpacity; // Обеспечиваем, что прозрачность не отрицательная
        } else {
          ctx.globalAlpha = this.opacity;
        }

        if (!this.popping) {
          // Рисуем внешний контур пузырька
          ctx.beginPath();
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 1;
          ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
          ctx.stroke();

          // Рисуем блик
          ctx.beginPath();
          var gradient = ctx.createRadialGradient(-this.radius / 3, -this.radius / 3, 0, -this.radius / 3, -this.radius / 3, this.radius);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.arc(-this.radius / 3, -this.radius / 3, this.radius, 0, Math.PI * 2, false);
          ctx.fill();
        }

        ctx.restore();
        ctx.globalAlpha = 1; // Сбрасываем прозрачность для других элементов

        // Рисуем линии при лопании
        for (var a = 0; a < this.lines.length; a++) {
          if (this.lines[a].popping) {
            if (this.lines[a].lineLength < popDistance && !this.lines[a].inversePop) {
              this.lines[a].popDistance += 0.06;
            } else {
              if (this.lines[a].popDistance >= 0) {
                this.lines[a].inversePop = true;
                this.lines[a].popDistanceReturn += 1;
                this.lines[a].popDistance -= 0.03;
              } else {
                this.lines[a].resetValues();
                this.resetProperties();
                // Перезапускаем пузырек после лопания
                this.count = canvas.height + this.yOff;
              }
            }

            this.lines[a].updateValues();
            this.lines[a].render();
          }
        }
      }
    }

    // Функция для определения радиуса пузырька
    function getBubbleRadius() {
      if (randomBubbleSize) {
        // Случайный размер между минимальным и максимальным
        return minBubbleSize + Math.random() * (maxBubbleSize - minBubbleSize);
      } else {
        // Фиксированный размер (среднее значение между минимальным и максимальным)
        return (minBubbleSize + maxBubbleSize) / 2;
      }
    }

    // Функция для определения прозрачности пузырька
    function getBubbleOpacity() {
      if (randomOpacity) {
        // Случайная прозрачность между минимальной и максимальной
        return minimalOpacity + Math.random() * (bubbleOpacity - minimalOpacity);
      } else {
        // Фиксированная прозрачность
        return bubbleOpacity;
      }
    }

    // ----------------
    // Создаем пузырьки
    // ----------------

    for (var i = 0; i < bubbleCount; i++) {
      var tempBubble = new createBubble();

      bubbles.push(tempBubble);
    }

    // ----------------
    // Конструктор линии
    // ----------------

    function createLine() {
      this.lineLength = 0;
      this.popDistance = 0;
      this.popDistanceReturn = 0;
      this.inversePop = false;
      this.popping = false;

      this.resetValues = function () {
        this.lineLength = 0;
        this.popDistance = 0;
        this.popDistanceReturn = 0;
        this.inversePop = false;
        this.popping = false;

        this.updateValues();
      }

      this.updateValues = function () {
        this.x = this.bubble.position.x + (this.bubble.radius + this.popDistanceReturn) * Math.cos(2 * Math.PI * this.index / this.bubble.lines.length);
        this.y = this.bubble.position.y + (this.bubble.radius + this.popDistanceReturn) * Math.sin(2 * Math.PI * this.index / this.bubble.lines.length);
        this.lineLength = this.bubble.radius * this.popDistance;
        this.endX = this.lineLength;
        this.endY = this.lineLength;
      }

      this.render = function () {
        this.updateValues();

        ctx.beginPath();
        ctx.strokeStyle = this.bubble.color;
        ctx.lineWidth = 2;
        ctx.moveTo(this.x, this.y);
        if (this.x < this.bubble.position.x) {
          this.endX = this.lineLength * -1;
        }
        if (this.y < this.bubble.position.y) {
          this.endY = this.lineLength * -1;
        }
        if (this.y === this.bubble.position.y) {
          this.endY = 0;
        }
        if (this.x === this.bubble.position.x) {
          this.endX = 0;
        }
        ctx.lineTo(this.x + this.endX, this.y + this.endY);
        ctx.stroke();
      };
    }

    // ---------------
    // Обработчики событий
    // ---------------

    // Функция для обновления размеров canvas при изменении размера окна
    window.addEventListener('resize', function () {
      setCanvasSize();
    });
  }
}

module.exports = CareModal