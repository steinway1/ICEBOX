class CyberWeek {
  constructor(root) {
    if (!root) {
      return
    }
    this.init()
  }

  init() {
    this.setupTimer()
    this.setupMatrixBackground()
  }

  // Timer
  setupTimer() {
    createTimer({
      daySelector: '[data-cyber-timer="days"]',
      hourSelector: '[data-cyber-timer="hours"]',
      minuteSelector: '[data-cyber-timer="minutes"]',
      secondSelector: '[data-cyber-timer="seconds"]',
      date: '2024-12-09 10:00:00'
    })
  }
  // Vanta Background
  setupMatrixBackground() {
    if (document.querySelector('#cm_canvas')) {
      const state = {
        fps: 30,
        color: "#13ddae",
        charset: "SALE SALE SALE",
        size: 14
      };

      const canvas = document.getElementById("cm_canvas");
      const ctx = canvas.getContext("2d");

      let w, h, p;
      const resize = () => {
        w = canvas.width = innerWidth;
        h = canvas.height = innerHeight;

        p = Array(Math.ceil(w / state.size)).fill(0);
      };
      window.addEventListener("resize", resize);
      resize();

      const random = (items) => items[Math.floor(Math.random() * items.length)];

      const draw = () => {
        ctx.fillStyle = "rgba(0,0,0,.05)";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = state.color;

        ctx.font = state.size + "px system-ui";
        for (let i = 0; i < p.length; i++) {
          let v = p[i];
          ctx.fillText(random(state.charset), i * state.size, v);
          p[i] = v >= h || v >= 10000 * Math.random() ? 0 : v + state.size;
        }
      };

      let interval = setInterval(draw, 1000 / state.fps);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('body.--cyber-week')
  if (root) {
    new CyberWeek(root)
  }
})