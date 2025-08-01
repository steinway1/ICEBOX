const blogPage = {
  init: function () {
    Object.values(this.initFn).forEach(fn => {
      if (typeof fn === 'function') {
        try {
          fn();
        } catch {
          console.log('blog JS ERR');
        }
      }
    });
  },
  initFn: {
    attachCommentSubmit: () => {
      const commentArea = document.querySelector('[data-article="commentArea"]');
      const commentSubmit = document.querySelector('[data-article="commentSubmit"]');
      const holder = document.querySelector('.article__comments-wrap');

      if (commentArea !== null && commentSubmit !== null) {
        const submit = () => {
          const val = commentArea.value;
          if (val.length !== 0) {
            const user = 'Guets',
              date = new Date().toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' }),
              html = `
              <div class="article-comment"><span>${user}</span><span>${val}</span><span>${date}</span></div>
              `;

            holder.insertAdjacentHTML('beforeend', html);
            commentArea.value = '';
          }
        };

        commentSubmit.onclick = () => {
          submit();
        };

        commentArea.onkeydown = e => {
          const isEnter = e.key === 'Enter' || e.keyCode === 13;
          if (isEnter) {
            e.preventDefault();
            submit();
          }
        };
      }
    },
    createProgressBar: () => {
      const readContent = document.querySelector('.article__read-content');
      if (!readContent) return;
      let y = 0;
      let fullHeight = readContent.getBoundingClientRect().bottom + 120 - window.innerHeight * 0.7;
      const calculatePercentage = (number, total) => {
        return (number / total) * 100;
      };
      const setElementWidthPercent = (el, percent) => {
        el.style.width = `${percent}%`;
      };

      const bar = document.createElement('div'),
        progress = document.createElement('div');

      bar.className = 'blog-progress';
      bar.appendChild(progress);

      document.body.appendChild(bar);

      window.onscroll = () => {
        y = window.scrollY;
        let f = calculatePercentage(y, fullHeight);
        setElementWidthPercent(progress, f);
      };
    },
    setReadingTime: () => {
      const readContent = document.querySelector('.article__read-content'),
        timeEl = document.querySelector('.read-time');
      if (!readContent || !timeEl) return;

      const wordsPerMinute = 200,
        textContent = readContent.textContent,
        wordCount = textContent.split(/\s/g).length,
        readingTime = Math.ceil(wordCount / wordsPerMinute);

      timeEl.textContent = `${readingTime} min reading`;
    },
    attachScroll: () => {
      return;
      const img = document.querySelector('.article-top-cover img');
      if (img !== null) {
        let max = img.offsetHeight + 100;
        window.onscroll = () => {
          let y = window.scrollY;
          if (max > y) {
            let f = 1 - ((y * 100) / max) * 0.01;
            img.style.marginTop = `-${y * 0.08}px`;
            img.style.opacity = f;
          }
        };
      }
    },
    initSliders: () => {
      const sliders = [...document.querySelectorAll('.splide_blog')];
      for (const slider of sliders) {
        const splide = new Splide(slider, {
          type: 'loop',
          perPage: 3,
          perMove: 1,
          arrows: false,
          pagination: false,
          gap: 8,
          breakpoints: {
            497: {
              perPage: 1,
            },
          },
        });
        splide.mount();
      }
    },
  },
};

module.exports = blogPage;
