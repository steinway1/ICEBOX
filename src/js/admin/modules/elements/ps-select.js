class PsSelect {
  constructor() {
    this.init()
  }
  init() {
    this.attachPs()
    this.bindClickPs()
  }
  
  // Events
  getArr() {
    return [...document.querySelectorAll('.ps')]
  }
  getOpenedElements() {
    return [...document.querySelectorAll('.ps.--active')]
  }
  // Methods
  attachPs() {
    for (const ps of this.getArr()) {
      const drop = ps.querySelector('.ps-drop')
      const scroller = drop.querySelector('.ps-drop__scroller')
      const current = ps.querySelector('[data-ps-current]')
      const inputArr = [...ps.querySelectorAll('input')]
      const isMultiple = ps.hasAttribute('data-ps-multiple')
      const multipleSelected = ps.querySelector('[data-ps-selected]')

      if (ps.initialized) {
        return
      }

      if (!drop) {
        console.warn('PS SELECT: Drop not found')
        return
      }

      if (!scroller) {
        console.warn('PS SELECT: Scroller not found')
        return
      }

      ps.initialized = true

      ps.open = () => {
        const openedArr = this.getOpenedElements()
        for (const opened of openedArr) {
          opened.close()
        }

        ps.opened = true
        ps.classList.add('--active')
      }

      ps.close = () => {
        ps.opened = false
        ps.classList.remove('--active')
      }

      ps.update = () => {
        if (isMultiple && multipleSelected) {
          const text = [...ps.querySelectorAll('input:checked')]
            .map(input => {
              if (input.dataset.name) {
                return input.dataset.name.trim();
              }

              const label = input.closest('label');
              if (!label) return null;

              const span = label.querySelector('span');
              return span ? span.textContent.trim() : null;
            })
            .filter(item => item && item.trim())
            .join(', ');

          multipleSelected.textContent = text || 'Empty';
        }

        if (inputArr.length && current) {
          for (const input of inputArr) {
            if (input.checked) {
              const label = input.closest('label')
              const caption = label.querySelector('.ps-caption')
              const counter = label.querySelector('.ps-counter')

              let text = ''

              if (caption) {
                text = caption.textContent
              }

              if (counter) {
                text += ` — ${counter.textContent}`
              }

              current.textContent = text
              break
            }
          }
        }
      }

      inputArr.forEach((input) => {
        input.addEventListener('change', () => {
          ps.update()
        })
      })

      ps.update()
    }
  }
  // Attach / Bind
  bindClickPs() {
    for (const ps of this.getArr()) {
      const btn = ps.querySelector('.ps-btn')
      btn.addEventListener('click', () => {
        if (ps.opened) {
          ps.close()
          return
        } else {
          ps.open()
        }
      })
    }

    document.addEventListener('click', (e) => {
      const t = e.target
      if (t.closest('.ps') === null) {
        for (const ps of this.getArr()) {
          if (ps.opened) {
            ps.close()
          }
        }
      }
    })
  }
}

export function initPsSelect() {
  new PsSelect()
}