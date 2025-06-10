class TagPreview {
  constructor() {
    if (document.querySelector('.main_print-tag') !== null) {
      this.resetOutput();
      this.attachInput();
      this.attachImageUploader();
      this.attachPreviewControls();
    }
  }

  resetOutput() {
    const outputHolder = document.querySelector('.tag-preview__output'),
      outputImage = document.querySelector('.tag-preview__pic');
    outputHolder.innerHTML = '';
    outputHolder.classList.add(IS_EMPTY);
    outputImage.classList.add(IS_EMPTY);
  }

  attachInput() {
    const outputObj = new Object(),
      inputs = [...document.querySelectorAll('input[type="text"].formpage__input')],
      outputHolder = document.querySelector('.tag-preview__output'),
      updateOutput = () => {
        let filled = 0,
          html = ``;
        for (const key in outputObj) {
          if (outputObj.hasOwnProperty(key)) {
            const obj = outputObj[key];
            if (obj.value.length !== 0) {
              ++filled;
              html += `
                <div id="${obj.id}" class="tag-output-row">
                  <span>${obj.title}</span>
                  <span>${obj.value}</span>
                </div>
                `;
            }
          }
        }
        if (filled !== 0) {
          outputHolder.innerHTML = html;
          outputHolder.classList.remove(IS_EMPTY);
        } else {
          outputHolder.innerHTML = '';
          outputHolder.classList.add(IS_EMPTY);
        }
      };

    inputs.forEach((input, index) => {
      outputObj[index] = {
        id: input.id,
        value: '',
        title: input.closest('.formpage__input-box').querySelector('label').innerHTML,
      };

      input.oninput = () => {
        outputObj[index].value = input.value || '';
        updateOutput();
      };
      input.onkeydown = e => {
        const isEnter = e.key === 'Enter' || e.keyCode === 13,
          isBackspace = e.key === 'Backspace' || e.key === 'Delete',
          isEsc = e.key === 'Escape' || e.key === 'Esc',
          isUp = e.key === 'ArrowUp',
          isDown = e.key === 'ArrowDown',
          next = inputs[index + 1],
          prev = inputs[index - 1];

        if (isEnter || isDown) {
          if (next !== undefined) {
            next.focus();
          }
        }
        if (isBackspace) {
          if (input.value.length == 0 && prev !== undefined) {
            prev.focus();
          }
        }
        if (isEsc) {
          e.preventDefault();
          input.blur();
        }
        if (isUp) {
          if (prev !== undefined) {
            prev.focus();
          }
        }
      };
      ['focus', 'blur'].forEach(ev => {
        if (window.innerWidth <= 479) {
          const label = input.closest('.formpage__input-box').querySelector('label');
          input.addEventListener(ev, function () {
            switch (ev) {
              case 'focus':
                label.style.opacity = 0;
                break;
              case 'blur':
                if (input.value.length !== 0) {
                  label.style.opacity = 0;
                } else {
                  label.style.opacity = 0.5;
                }
                break;
            }
          });
        }
      });
    });
  }

  attachImageUploader() {
    const uploadLabel = document.querySelector('#printTag_uploader'),
      uploadInput = document.querySelector('#image_upload_tag'),
      imgPreview = document.querySelector('.tag-preview__pic');

    // DRAG & DROP
    if (uploadLabel !== null) {
      uploadLabel.ondragover = evt => {
        evt.preventDefault();
        uploadLabel.classList.add(IS_ACTIVE);
      };
      uploadLabel.ondragleave = evt => {
        evt.preventDefault();
        uploadLabel.classList.remove(IS_ACTIVE);
      };
      uploadLabel.ondrop = evt => {
        evt.preventDefault();
        uploadLabel.classList.remove(IS_ACTIVE);
        uploadInput.files = evt.dataTransfer.files;
        const files = [...evt.dataTransfer.items],
          file = files.find(item => {
            if (item.kind === 'file') {
              return item;
            }
          });
        processImage(file.getAsFile());
      };

      // MANUAL
      if (uploadInput !== null) {
        uploadInput.onchange = evt => {
          const file = [...evt.target.files][0];
          processImage(file);
          uploadInput.value = '';
        };
      }

      // PROCESS IMAGE
      function processImage(file) {
        if (file) {
          let reader = new FileReader();
          reader.onload = e => {
            imgPreview.classList.remove(IS_EMPTY);
            imgPreview.style.backgroundImage = `url(${e.target.result})`;
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }

  attachPreviewControls() {
    const modal = document.querySelector('.tag-preview-modal');
    if (modal !== null) {
      const holder = document.querySelector('.tag-preview-modal__wrapper');
      const toggle = () => {
        let displayed = window.getComputedStyle(modal).getPropertyValue('display') !== 'none';
        if (displayed) {
          unlockScroll();
          const preview = holder.querySelector('.formpage__tag-preview');
          if (preview !== null) {
            preview.remove();
          }
          modal.style.display = 'none';
        } else {
          lockScroll();
          const preview = document.querySelector('.formpage__tag-preview');
          holder.appendChild(preview.cloneNode(true));
          modal.style.display = 'block';
        }
      };

      document.addEventListener('click', function (e) {
        const target = e.target;
        if (target.getAttribute('data-evt') == 'togglePrintTagPreview') {
          toggle();
        }
      });
    }
  }
}

export default new TagPreview();
