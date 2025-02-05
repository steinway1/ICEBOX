class WhaleCards {
  constructor() {
    this.init();
  }

  init() {
    const main = document.querySelector('.main_whales');
    if (main) {
      this.updateRadioQuiz();
      Object.values(this.initFn).forEach((fn) => {
        if (typeof fn === 'function') {
          try {
            fn.call(this);
          } catch (err) {
            console.log(`whales cards init fn err : ${err.message}`);
          }
        }
      });
    }
  }

  updateNotesCount(cards = [...document.querySelectorAll('.whale-card')]) {
    cards = Array.isArray(cards) ? cards : [cards];
    cards.forEach((card) => {
      const noteCount = card.querySelector('.whale-notes-count');
      const notes = card.querySelectorAll('.whale-card__note');
      if (noteCount) {
        let count = notes.length || 0;
        noteCount.innerHTML = count;
      }
    });
  }

  appendNote(parent, author, text) {
    let date = new Date(Date.now()).toLocaleString();
    const html = `
      <div class="whale-card__note">
        <div class="whale-card__note-date">${date}</div>
        <div class="whale-card__note-text">
          <span class="whale-card__note-author">${author}</span>: ${text}
        </div>
      </div>
    `;
    parent.insertAdjacentHTML('beforeend', html);
  }

  updateRadioQuiz() {
    const inputs = [...document.querySelectorAll('#grid_view input[type="radio"]')];
    for (const input of inputs) {
      if (input.checked) {
        input.checked = !input.checked;
        setTimeout(() => {
          input.checked = !input.checked;
        }, 1);
      }
    }
  }

  initFn = {
    setInitialStats: () => {
      this.updateNotesCount();
    },

    attachNotes: () => {
      const cls = '--notes_visible';

      // Mouseover Avatar
      document.addEventListener('mouseover', (e) => {
        const target = e.target;
        if (target.closest('.whale-card__avatar') && !target.closest('.whale-more-wrap')) {
          const card = target.closest('.whale-card');
          if (card && !card.classList.contains(cls)) {
            card.classList.add(cls);
          }
        }
      });

      // Mouseout Avatar
      document.addEventListener('mouseout', (e) => {
        const target = e.target;
        if (target.closest('.whale-card__avatar')) {
          const card = target.closest('.whale-card');
          if (card && card.classList.contains(cls)) {
            card.classList.remove(cls);
          }
        }
      });

      // Input Focus
      document.querySelectorAll('.whale-card').forEach((card) => {
        const input = card.querySelector('.am-note-input');
        if (input) {
          input.addEventListener('focus', () => {
            if (!card.classList.contains(cls)) {
              card.classList.add(cls);
            }
          });
        }
      });

      // Button Click
      document.addEventListener('click', (e) => {
        const target = e.target;
        if (target.dataset.evt === 'toggleWhaleNotes' || target.closest('[data-evt="toggleWhaleNotes"]')) {
          const btn = target.closest('[data-evt="toggleWhaleNotes"]') || target;
          const card = target.closest('.whale-card');
          if (card) {
            card.classList.toggle(cls);
          }
        }
      });
    },

    attachNoteSubmit: () => {
      const inputs = [...document.querySelectorAll('.am-note-input')];
      const buttons = [...document.querySelectorAll('[data-whale-evt="submitNote"]')];

      inputs.forEach((input) => {
        input.submit = () => {
          const val = input.value.trim();
          if (val) {
            const holder = input.closest('.whale-card__notes')?.querySelector('.whale-card__notes-scroll');
            if (holder) {
              input.value = '';
              this.appendNote(holder, 'Zahir', val);
              holder.scrollTop = holder.scrollHeight;
            }
          }
        };

        input.onkeydown = (e) => {
          if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault();
            input.submit();
          }
        };
      });

      buttons.forEach((btn) => {
        btn.onclick = () => {
          const input = btn.closest('.whale-card')?.querySelector('.am-note-input');
          if (input) {
            input.submit();
          }
        };
      });
    },

    attachContractSearch: () => {
      return; // Функция отключена, как и в оригинале
      const evtArr = [...document.querySelectorAll('[data-evt="contractGoogleSearch"]')];
      const googleContract = (name) => {
        const query = `${name} contract`;
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(url, '_blank');
      };

      evtArr.forEach((btn) => {
        btn.onclick = () => {
          const card = btn.closest('.whale-card');
          if (card) {
            const name = card.querySelector('.whale-card__name')?.textContent;
            if (name) {
              googleContract(name);
            }
          }
        };
      });
    },
  };
}

export function initWhaleCards() {
  new WhaleCards()
}