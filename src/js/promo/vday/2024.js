class VDay {
  constructor(root) {
    this.root = root
    if (!root) {
      return
    }
    this.init()
  }
  init() {
    this.setupTimer()
    this.setupCanvas()
  }

  setupTimer() {
    createTimer({
      daySelector: '[data-vday-timer="days"]',
      hourSelector: '[data-vday-timer="hours"]',
      date: '2025-01-24 00:00:00'
    })
  }

  setupCanvas() {
    const canvas = document.getElementById('heartsCanvas');
    const ctx = canvas.getContext('2d');

    // Массив для хранения «сердечек»
    let hearts = [];
    // Количество одновременно анимируемых сердечек
    const HEARTS_COUNT = (() => {
      return window.innerWidth > 991 ? 65 : 45
    })()
    const HEARTS_SIZE = (() => {
      return window.innerWidth > 991 ? 6 : 3
    })()

    // Функция для установки размеров canvas под его фактическую ширину/высоту (в пикселях)
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    // Вызываем при загрузке
    resizeCanvas();
    // Вызываем при любом ресайзе окна/контейнера
    window.addEventListener('resize', resizeCanvas);

    // Класс «Сердечко»
    class Heart {
      constructor() {
        this.reset();
      }

      // Устанавливаем случайные параметры для сердечка
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        // Начальный размер
        this.size = Math.random() * HEARTS_SIZE + HEARTS_SIZE;
        // Скорость «набухания»
        this.growSpeed = 0.1 + Math.random() * 0.2;
        // Начальная прозрачность
        this.opacity = 0.2 + Math.random() * 0.8;
        // Скорость угасания
        this.fadeSpeed = 0.008 + Math.random() * 0.01;

        // Параметры для движения 
        // (вверх + вправо + небольшая кривизна)
        this.vx = 0.1 + Math.random() * 0.15;   // базовая скорость вправо
        this.vy = -0.1 - Math.random() * 0.15;  // базовая скорость вверх

        // Амплитуда «болтанки» (чем больше, тем сильнее кривизна)
        this.amplitude = 0.3 + Math.random() * 0.2;
        // Угол и скорость изменения угла (для sin/cos)
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = 0.01 + Math.random() * 0.02;
      }

      update() {
        // Увеличиваем размер
        this.size += this.growSpeed;
        // Уменьшаем прозрачность
        this.opacity -= this.fadeSpeed;

        // Двигаемся по синусоиде
        this.angle += this.angleSpeed;
        // Основной сдвиг (вправо-вверх)
        this.x += this.vx;
        this.y += this.vy;
        // Сверх того — небольшая кривизна (по синусу/косинусу)
        this.x += this.amplitude * Math.cos(this.angle);
        this.y += this.amplitude * Math.sin(this.angle);

        // Если полностью «исчезли», перезапускаем сердечко
        if (this.opacity <= 0) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        drawHeart(ctx, this.x, this.y, this.size);
        ctx.restore();
      }
    }

    // Функция, рисующая сердечко через bezier-кривые
    function drawHeart(ctx, x, y, size) {
      ctx.beginPath();
      // Немного упростим рисование сердца:
      // Верхняя половина (два закругления) + нижний треугольный «кончик»
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);

      // Левое закругление
      ctx.bezierCurveTo(
        x, y,
        x - size / 2, y,
        x - size / 2, y + topCurveHeight
      );
      // Нижняя часть (кончик сердца)
      ctx.bezierCurveTo(
        x - size / 2, y + (size + topCurveHeight) / 2,
        x, y + (size + topCurveHeight) / 1.2,
        x, y + size
      );
      ctx.bezierCurveTo(
        x, y + (size + topCurveHeight) / 1.2,
        x + size / 2, y + (size + topCurveHeight) / 2,
        x + size / 2, y + topCurveHeight
      );
      // Правое закругление
      ctx.bezierCurveTo(
        x + size / 2, y,
        x, y,
        x, y + topCurveHeight
      );

      ctx.closePath();
      ctx.fillStyle = '#ff6060';
      ctx.fill();
    }

    // Создаём стартовый набор сердечек
    for (let i = 0; i < HEARTS_COUNT; i++) {
      hearts.push(new Heart());
    }

    // Анимация
    function animate() {
      requestAnimationFrame(animate);
      // Очищаем canvas (прозрачно)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Обновляем и рисуем каждое сердечко
      hearts.forEach((heart) => {
        heart.update();
        heart.draw();
      });
    }

    animate();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('body.--vday')
  if (root) {
    new VDay(root)
  }
})