function pushConfetti(holder) {
  var bfs_promo = false;
  var $window = $(window)
    , random = Math.random
    , cos = Math.cos
    , sin = Math.sin
    , PI = Math.PI
    , PI2 = PI * 2
    , timer = undefined
    , frame = undefined
    , confetti = [];
  var confArr = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
    , pointer = 0;
  var particles = $(window).width() > 479 ? 20 : 10
    , spread = $(window).width() > 479 ? 40 : 70
    , sizeMin = 1.4
    , sizeMax = 12 - sizeMin
    , eccentricity = 10
    , deviation = 100
    , dxThetaMin = -.1
    , dxThetaMax = -dxThetaMin - dxThetaMin
    , dyMin = .16
    , dyMax = .32
    , dThetaMin = .4
    , dThetaMax = .7 - dThetaMin;
  var colorThemes = [
    function () {
      return color(150 * random() | 0, 80 * random() | 128, 110 * random() | 0);
    }, function () {
      return colorThemes[random() < .5 ? 1 : 2]();
    }, function () {
      return colorThemes[random() < .2 ? 3 : 5]();
    }, function () {
      return colorThemes[random() < .2 ? 2 : 4]();
    }
  ];
  function color(r, g, b) {
    return 'rgb(' + 0 + ',' + g + ',' + 230 + ')';
  }
  function interpolation(a, b, t) {
    return (1 - cos(PI * t)) / 2 * (b - a) + a;
  }
  var radius = 1 / eccentricity, radius2 = radius + radius;
  function createPoisson() {
    var domain = [radius, 1 - radius], measure = 1 - radius2, spline = [0, 1];
    while (measure) {
      var dart = measure * random(), i, l, interval, a, b, c, d;
      for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
        a = domain[i], b = domain[i + 1], interval = b - a;
        if (dart < measure + interval) {
          spline.push(dart += a - measure);
          break;
        }
        measure += interval;
      }
      c = dart - radius, d = dart + radius;
      for (i = domain.length - 1; i > 0; i -= 2) {
        l = i - 1, a = domain[l], b = domain[i];
        if (a >= c && a < d)
          if (b > d) domain[l] = d;
          else domain.splice(l, 2);
        else if (a < c && b > c)
          if (b <= d) domain[i] = c;
          else domain.splice(i, 0, c, d);
      }

      for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
        measure += domain[i + 1] - domain[i];
    }

    return spline.sort();
  }

  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '0';
  container.style.overflow = 'visible';
  container.style.zIndex = '9999';
  container.classList.add('confetti-holder')

  function Confetto(theme) {
    this.frame = 0;
    this.outer = document.createElement('div');
    this.inner = document.createElement('div');
    this.outer.appendChild(this.inner);

    var outerStyle = this.outer.style, innerStyle = this.inner.style;
    outerStyle.position = 'absolute';
    outerStyle.width = (sizeMin + sizeMax * random()) + 'px';
    outerStyle.height = (sizeMin + sizeMax * random()) + 'px';
    innerStyle.width = '100%';
    innerStyle.height = '100%';
    innerStyle.backgroundColor = theme();

    outerStyle.perspective = '50px';
    outerStyle.transform = 'rotate(' + (360 * random()) + 'deg)';
    this.axis = 'rotate3D(' +
      cos(360 * random()) + ',' +
      cos(360 * random()) + ',0,';
    this.theta = 360 * random();
    this.dTheta = dThetaMin + dThetaMax * random();
    innerStyle.transform = this.axis + this.theta + 'deg)';

    this.x = $window.width() * random();
    this.y = -deviation;
    this.dx = sin(dxThetaMin + dxThetaMax * random());
    this.dy = dyMin + dyMax * random();
    outerStyle.left = this.x + 'px';
    outerStyle.top = this.y + 'px';

    this.splineX = createPoisson();
    this.splineY = [];
    for (var i = 1, l = this.splineX.length - 1; i < l; ++i)
      this.splineY[i] = deviation * random();
    this.splineY[0] = this.splineY[l] = deviation * random();

    this.update = function (height, delta) {
      this.frame += delta;
      this.x += this.dx * delta;
      this.y += this.dy * delta;
      this.theta += this.dTheta * delta;

      var phi = this.frame % 7777 / 7777, i = 0, j = 1;
      while (phi >= this.splineX[j]) i = j++;
      var rho = interpolation(
        this.splineY[i],
        this.splineY[j],
        (phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i])
      );
      phi *= PI2;

      outerStyle.left = this.x + rho * cos(phi) + 'px';
      outerStyle.top = this.y + rho * sin(phi) + 'px';
      innerStyle.transform = this.axis + this.theta + 'deg)';
      return this.y > height + deviation;
    };
  }

  function poof() {
    if (!frame) {
      holder.append(container)
      var theme = colorThemes[bfs_promo ? colorThemes.length * random() | 0 : 0]
        , count = 0;
      (function addConfetto() {
        if (bfs_promo && ++count > particles)
          return timer = undefined;

        var confetto = new Confetto(theme);
        confetti.push(confetto);
        container.appendChild(confetto.outer);
        timer = setTimeout(addConfetto, spread * random());
      })(0);

      var prev = undefined;
      requestAnimationFrame(function loop(timestamp) {
        var delta = prev ? timestamp - prev : 0;
        prev = timestamp;
        var height = $window.height();

        for (var i = confetti.length - 1; i >= 0; --i) {
          if (confetti[i].update(height, delta)) {
            container.removeChild(confetti[i].outer);
            confetti.splice(i, 1);
          }
        }

        if (timer || confetti.length)
          return frame = requestAnimationFrame(loop);
        document.body.removeChild(container);
        frame = undefined;
      });
    }
  }

  if (!bfs_promo) poof();
}

const blackFriday = {
  init: function () {
    Object.values(this.initFn).forEach((fn) => { if (fn && typeof fn == 'function') fn() })
  },
  initFn: {
    setTimer: () => {
      let timer
      const compare = new Date(2023, 10, 28, 10, 0o0, 0o0)

      const timeBetweenDates = (to) => {
        let entered = to,
          now = new Date(),
          difference = entered.getTime() - now.getTime()

        if (difference <= 0) {
          clearInterval(timer)
        } else {
          let seconds = Math.floor(difference / 1000)
          let minutes = Math.floor(seconds / 60)
          let hours = Math.floor(minutes / 60)
          let days = Math.floor(hours / 24)

          hours %= 24
          minutes %= 60
          seconds %= 60

          $("#bfs_timer_days").attr('data-text-glitch', days).text(days)
          $("#bfs_timer_hours").attr('data-text-glitch', hours).text(hours)
          $("#bfs_timer_min").attr('data-text-glitch', minutes).text(minutes)
          $("#bfs_timer_sec").text(seconds)
        }
      }

      timer = setInterval(function () {
        timeBetweenDates(compare);
      }, 1000);
    },
    adjustStickyEls: () => {
      const elsArr = [...document.querySelectorAll('.filter-sidebar.to-stick'), ...document.querySelectorAll('.sticky-filters')]
      const banner = document.querySelector('.bfs-banner')

      if (elsArr.length && banner) {
        const bannerHeight = parseInt(window.getComputedStyle(banner).getPropertyValue('height'))
        elsArr.forEach((el) => {
          let topValue = parseInt(window.getComputedStyle(el).getPropertyValue('top'))
          Object.assign(el.style, { top: `${bannerHeight + topValue}px` })
        })
      }
    },
    setProductPage: () => {
      let el = $('.product_bfs')
      if (el && el.length) {
        let productName = $('.product__item-title')
        if (productName.length) {
          let txt = productName.text()
          productName.attr('data-text-glitch', txt)
        }
      }
    },
    pushConfettiOnLoad: () => {
      pushConfetti($('body'))
      setTimeout(() => {
        $('.confetti-holder').css({ opacity: 0 })
        setTimeout(() => {
          $('.confetti-holder').remove()
        }, 350);
      }, 6000);
    },
    initVanta: () => {
      let el1 = '#bfsDiamonds', el2 = '#bfsDiamonds2'
      if ($(el1).length && $(el2).length) {
        VANTA.WAVES({
          el: "#bfsDiamonds",
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 340.00,
          minWidth: 340.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x13171e,
          shininess: 330.00,
          waveHeight: 8.00,
          waveSpeed: 1.9,
          zoom: 1.70
        }),
          VANTA.WAVES({
            el: "#bfsDiamonds2",
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: 340.00,
            minWidth: 340.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x13171e,
            shininess: 330.00,
            waveHeight: 8.00,
            waveSpeed: 1.9,
            zoom: 1.70
          })
      }
    }
  }
}

$(function () {
  blackFriday.init()
})