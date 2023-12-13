document.addEventListener('DOMContentLoaded', function () {

  const xmasPoster = document.querySelector('.xmas-poster'),
    snowHolder = document.querySelector('#xmasPosterSnow'),
    confettiColors = []

  if ($('body').hasClass('xmas_update')) {
    confettiColors.push(...["#ffe8c3", "#f81721"])
  } else {
    confettiColors.push(...["#ffe8c3", "#34343f"])
  }

  const pushXmasPosterSnow = () => {
    if (xmasPoster !== null && snowHolder !== null) {
      particlesJS("xmasPosterSnow", {
        "particles": {
          "number": { "value": 1400, "density": { "enable": true, "value_area": 800 } },
          "color": { "value": "#fff" },
          "shape": {
            "type": "circle", "stroke": { "width": 0, "color": "#000000" },
            "polygon": { "nb_sides": 5 },
            "image": { "src": "img/github.svg", "width": 100, "height": 100 }
          }, "opacity": { "value": 1, "random": true, "anim": { "enable": false, "speed": 0.5, "opacity_min": 0.1, "sync": false } },
          "size": { "value": 2, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
          "line_linked": { "enable": false, "distance": 500, "color": "#ffffff", "opacity": 0.4, "width": 2 },
          "move": {
            "enable": true, "speed": 3.4, "direction": "bottom", "random": false, "straight": false,
            "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 1200, "rotateY": 1200 }
          }
        },
        "interactivity": {
          "detect_on": "canvas", "events": {
            "onhover": { "enable": true, "mode": "bubble" },
            "onclick": { "enable": true, "mode": "repulse" }, "resize": true
          }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 0.5 } }, "bubble": { "distance": 400, "size": 4, "duration": 0.3, "opacity": 1, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } }
        }, "retina_detect": true
      });
    }
  }

  const pushBuckeyes = () => {
    const end = window.innerWidth > 479 ? Date.now() + 7 * 1000 : Date.now() + 3 * 1000,
      colors = confettiColors,
      count = window.innerWidth > 479 ? 2 : 1.4,
      originY = window.innerWidth > 779 ? 0.7 : 0.9

    const go = () => {
      (function frame() {
        confetti({
          particleCount: count,
          angle: 40,
          spread: 55,
          origin: { x: 0, y: originY },
          colors: colors,
          speed: { min: 5, max: 20 },
          shape: {
            type: ["square", "triangle"]
          },
          size: {
            value: { min: 2, max: 5 },
            animation: {
              count: 1,
              startValue: "min",
              enable: true,
              speed: 5,
              sync: true
            }
          },
          tilt: {
            direction: "random",
            enable: true,
            value: {
              min: 0,
              max: 360
            },
            animation: {
              enable: true,
              speed: 60
            }
          },
        });

        confetti({
          particleCount: count,
          angle: 140,
          spread: 55,
          origin: { x: 1, y: originY },
          colors: colors,
          speed: { min: 5, max: 20 },
          shape: {
            type: ["square", "triangle"]
          },
          size: {
            value: { min: 2, max: 5 },
            animation: {
              count: 1,
              startValue: "min",
              enable: true,
              speed: 5,
              sync: true
            }
          },
          tilt: {
            direction: "random",
            enable: true,
            value: {
              min: 0,
              max: 360
            },
            animation: {
              enable: true,
              speed: 60
            }
          },
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }

    go()
  }

  const intervalFireworks = () => {
    const delay = window.innerWidth > 479 ? 5000 : 2000
    setTimeout(() => {
      function pushFirework() {
        const duration = 1000,
          animationEnd = Date.now() + duration,
          defaults = { startVelocity: 30, spread: 150, ticks: 10, zIndex: 0 };

        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 25 * (timeLeft / duration);

          confetti(
            Object.assign({}, defaults, {
              particleCount,
              colors: confettiColors,
              origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
              shape: {
                type: ["square", "triangle"]
              },
              life: {
                count: 0,
                duration: 0,
                delay: 0.1
              },
            })
          );
          confetti(
            Object.assign({}, defaults, {
              particleCount,
              colors: confettiColors,
              origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
              shape: {
                type: ["square", "triangle"]
              },
              life: {
                count: 0,
                duration: 0,
                delay: 0.1
              },
            })
          );
        }, 250);
      }
      setInterval(() => {
        pushFirework()
      }, 30 * 1000);
    }, delay)
  }

  const xmasConfettiBlow = () => {
    function rng(min, max) {
      return Math.random() * (max - min) + min;
    }
    const count = window.innerWidth > 479 ? 40 : 25
    const settings = (xCoor, yCoor) => {
      return {
        startVelocity: 30,
        colors: confettiColors,
        spread: 120,
        ticks: 400,
        zIndex: 100,
        origin: { x: xCoor, y: yCoor },
        particleCount: count,
        shape: {
          type: ["square", "triangle"]
        }
      }
    }

    confetti(settings(rng(0, 0.3), rng(0.2, 0.8)))
    setTimeout(() => {
      confetti(settings(rng(0.4, 0.7), rng(0.2, 0.8)))
      setTimeout(() => {
        confetti(settings(rng(0.7, 1), rng(0.2, 0.8)))
      }, 200);
    }, 200);
  }

  const setXmasTimer = () => {
    let timer
    const compare = new Date(2023, 11, 23, 24, 0o0, 0o0)

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


        days <= 9 ? $("#bfs_timer_days").text('0' + days) : $("#bfs_timer_days").text(days)
        hours <= 9 ? $("#bfs_timer_hours").text('0' + hours) : $("#bfs_timer_hours").text(hours)
        minutes <= 9 ? $("#bfs_timer_min").text('0' + minutes) : $("#bfs_timer_min").text(minutes)
        seconds <= 9 ? $("#bfs_timer_sec").text('0' + seconds) : $("#bfs_timer_sec").text(seconds)
      }
    }

    timer = setInterval(function () {
      timeBetweenDates(compare);
    }, 1000);
  }

  const xmasAdjustStickyEls = () => {
    const elsArr = [...document.querySelectorAll('.filter-sidebar.to-stick'), ...document.querySelectorAll('.sticky-filters')]
    const banner = document.querySelector('.bfs-banner')

    if (elsArr.length && banner) {
      const bannerHeight = parseInt(window.getComputedStyle(banner).getPropertyValue('height'))
      elsArr.forEach((el) => {
        let topValue = parseInt(window.getComputedStyle(el).getPropertyValue('top'))
        Object.assign(el.style, { top: `${bannerHeight + topValue}px` })
      })
    }
  }

  // const xmasProductCountdown = () => {

  // }

  pushBuckeyes()
  intervalFireworks()
  // xmasConfettiBlow()
  pushXmasPosterSnow()
  setXmasTimer()
  xmasAdjustStickyEls()
  // xmasProductCountdown()
})