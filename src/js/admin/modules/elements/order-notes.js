class OrderNotes {
  constructor() {
    this.init();
  }

  init() {
    this.attachEvents();
  }

  appendNote(parent, author, text) {
    let date = new Date(Date.now()).toLocaleString();
    const html = `
      <div class="am-item-note">
        <div>
          <span>${author}</span>: ${text}
        </div>
        <div>${date}</div>
      </div>
    `;
    parent.insertAdjacentHTML('beforeend', html);
  }

  attachEvents() {
    const submitButtons = [...document.querySelectorAll('[data-am-evt="submitNote"]')],
          inputs = [...document.querySelectorAll('.am-note-input')];

    submitButtons.forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        const parent = btn.closest('.am-item__note-wrap');
        if (parent !== null) {
          const input = parent.querySelector('.am-note-input'),
                val = input.value.trim();
          if (val.length !== 0) {
            this.appendNote(parent, 'Author Name', val); // Замените 'Author Name' на актуальное имя автора
            input.value = '';
          } else {
            input.focus();
          }
        }
      };
    });

    inputs.forEach((input) => {
      input.onkeydown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const val = input.value.trim();
          if (val.length !== 0) {
            const parent = input.closest('.am-item__note-wrap');
            this.appendNote(parent, 'Author Name', val); // Замените 'Author Name' на актуальное имя автора
            input.value = '';
          }
        }
      };
    });
  }
}

export function initOrderNotes() {
  new OrderNotes()
}