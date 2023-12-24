const newYear = {
  init: function () {
    Object.values(this.initFn).forEach((fn) => {
      if (typeof fn === "function") fn();
    });
  },
  initFn: {
    pushSnowParticles: () => {
      const holder = $('#nyParticlesSnow')
      if (holder.length) {
        const count = $(window).width() > 479 ? 1100 : 1000,
          size = $(window).width() > 479 ? 2.8 : 3.6
        particlesJS("nyParticlesSnow", {
          "particles": {
            "number": { "value": count, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#fff" },
            "shape": {
              "type": "circle", "stroke": { "width": 0, "color": "#000000" },
              "polygon": { "nb_sides": 5 },
              "image": { "src": "img/github.svg", "width": 100, "height": 100 }
            }, "opacity": { "value": 1, "random": true, "anim": { "enable": false, "speed": 0.5, "opacity_min": 0.1, "sync": false } },
            "size": { "value": size, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
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
    },
    pushFireworks: () => {
      const canvas = document.getElementById('nyFirework')

      if (document.contains(canvas)) {
        const limitGo = $(window).width() > 479 ? 70 : 120
        const fric = $(window).width() > 479 ? 0.95 : 0.95

        function goFirework() {
          window.requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              function (callback) {
                window.setTimeout(callback, 1000 / 60);
              };
          })();

          var ctx = canvas.getContext('2d'),
            cw = window.innerWidth,
            ch = window.innerHeight,
            fireworks = [],
            particles = [],
            hue = 32,
            limiterTotal = 150,
            limiterTick = 0,
            timerTotal = limitGo,
            timerTick = 0,
            mousedown = false,
            mx,
            my;

          canvas.width = cw;
          canvas.height = ch;

          function random(min, max) {
            return Math.random() * (max - min) + min;
          }

          function calculateDistance(p1x, p1y, p2x, p2y) {
            var xDistance = p1x - p2x,
              yDistance = p1y - p2y;
            return Math.sqrt(Math.pow(xDistance, 1) + Math.pow(yDistance, 1));
          }

          function Firework(sx, sy, tx, ty) {
            this.x = sx;
            this.y = sy;
            this.sx = sx;
            this.sy = sy;
            this.tx = tx;
            this.ty = ty;
            this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
            this.distanceTraveled = 0;
            this.coordinates = [];
            this.coordinateCount = 1;
            while (this.coordinateCount--) {
              this.coordinates.push([this.x, this.y]);
            }
            this.angle = Math.atan2(ty - sy, tx - sx);
            this.speed = 2;
            this.acceleration = 1.04;
            this.brightness = random(40, 50);
            this.targetRadius = 1;
          }

          Firework.prototype.update = function (index) {
            this.coordinates.pop();
            this.coordinates.unshift([this.x, this.y]);

            if (this.targetRadius < 8) {
              this.targetRadius += 0.3;
            } else {
              this.targetRadius = 1;
            }

            this.speed *= this.acceleration;

            var vx = Math.cos(this.angle) * this.speed,
              vy = Math.sin(this.angle) * this.speed;
            this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + 0, this.y + 0);

            if (this.distanceTraveled >= this.distanceToTarget) {
              createParticles(this.tx, this.ty);
              fireworks.splice(index, 1);
            } else {
              this.x += vx;
              this.y += vy;
            }
          }

          Firework.prototype.draw = function () {
            ctx.beginPath();
            ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
            ctx.lineTo(this.x, this.y);
            ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
            ctx.stroke();
            ctx.beginPath();
            ctx.stroke();
          }

          function Particle(x, y) {
            this.x = x;
            this.y = y;
            this.coordinates = [];
            this.coordinateCount = 7;

            while (this.coordinateCount--) {
              this.coordinates.push([this.x, this.y]);
            }
            this.angle = random(0, Math.PI * 2);
            this.speed = random(1, 10);
            this.friction = fric;
            this.gravity = 0.9;
            this.hue = random(hue - 20, hue + 20);
            this.brightness = random(50, 80);
            this.alpha = 1;
            this.decay = random(0.0095, 0.009);
          }

          Particle.prototype.update = function (index) {
            this.coordinates.pop();
            this.coordinates.unshift([this.x, this.y]);
            this.speed *= this.friction;
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed + this.gravity;
            this.alpha -= this.decay;

            if (this.alpha <= this.decay) {
              particles.splice(index, 1);
            }
          }

          Particle.prototype.draw = function () {
            ctx.beginPath();
            ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
            ctx.lineTo(this.x, this.y);
            ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';

            ctx.stroke();
          }

          function createParticles(x, y) {
            var particleCount = 20;
            while (particleCount--) {
              particles.push(new Particle(x, y));
            }
          }


          function loop() {
            requestAnimFrame(loop);
            hue += 0;
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, cw, ch);
            ctx.globalCompositeOperation = 'lighter';

            var i = fireworks.length;
            while (i--) {
              fireworks[i].draw();
              fireworks[i].update(i);
            }

            var i = particles.length;
            while (i--) {
              particles[i].draw();
              particles[i].update(i);

            }

            if (timerTick >= timerTotal) {
              timerTick = 0;
            } else {
              var temp = timerTick % 400;
              if (temp <= 15) {
                fireworks.push(new Firework(100, ch, random(190, 200), random(90, 100)));
                fireworks.push(new Firework(cw - 100, ch, random(cw - 200, cw - 190), random(90, 100)));
              }

              var temp3 = temp / 10;

              if (temp > 319) {
                fireworks.push(new Firework(300 + (temp3 - 31) * 100, ch, 300 + (temp3 - 31) * 100, 200));
              }

              timerTick++;
            }

            if (limiterTick >= limiterTotal) {
              if (mousedown) {
                fireworks.push(new Firework(cw / 2, ch, mx, my));
                limiterTick = 0;
              }
            } else {
              limiterTick++;
            }
          }

          canvas.addEventListener('mousemove', function (e) {
            mx = e.pageX - canvas.offsetLeft;
            my = e.pageY - canvas.offsetTop;
          });

          canvas.addEventListener('mousedown', function (e) {
            e.preventDefault();
            mousedown = true;
          });

          canvas.addEventListener('mouseup', function (e) {
            e.preventDefault();
            mousedown = false;
          });

          window.onload = loop;
        }

        goFirework()
      }
    },
    xmasAdjustStickyEls: () => {
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
    setBannerTimer: () => {
      let timer
      const compare = new Date(2024, 0, 5, 24, 0o0, 0o0)

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
  }
}

newYear.init()