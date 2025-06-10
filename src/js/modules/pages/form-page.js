class FormPage {
  constructor() {
    this.uploadedImages = [];
    if (document.querySelector('.main_formpage')) {
      this.bindEvents();
      // this.imgUpload()
      this.attachImagesUploader();
      this.attachWatchesUpload();
    }
  }

  bindEvents() {
    $('.formpage__upload-btn').click(function () {
      if ($('#image_upload').length) {
        $('#image_upload').trigger('click');
      }
    });
    // $('#formpage_form').on('submit', function (e) {
    //   e.preventDefault();
    //   formPage.submitAjax();
    // });
  }

  submitAjax() {}

  attachImagesUploader() {
    const uploadLabel = document.querySelector('#formpage_img-uploader'),
      uploadInput = document.querySelector('#image_upload'),
      imagesWrap = $('.formpage__images-thumbnails');

    // Setting drag&drop event
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
        $('#image_upload').prop('files', evt.dataTransfer.files);
        const files = [],
          items = [...evt.dataTransfer.items];
        items.forEach((item, i) => {
          if (item.kind === 'file') {
            files.push(item.getAsFile());
          }
        });
        if (files.length) {
          $('.formpage__images-thumbnails').empty();
        }
        this.processFiles([...files]);
      };
    }

    // Setting manual files upload
    if (uploadInput !== null) {
      uploadInput.onchange = evt => {
        const files = [...evt.target.files];
        $('.formpage__images-thumbnails').empty();
        this.processFiles(files);
      };
    }

    // Setting checkbox toggle on appended images
    $body.on('click', '.formpage__upload-bg', function () {
      lockScroll();
      let html = `
      <div class="formpage-zoom">
        <div data-evt="closeFormpageZoom"></div>
        <div data-block="formpageZoom"></div>
      </div>
      `;
      $body.append(html);
      $('[data-block="formpageZoom"]').attr('style', $(this).attr('style'));
    });

    $body.on('click', '[data-evt="closeFormpageZoom"]', function () {
      unlockScroll();
      $('.formpage-zoom').remove();
    });
  }

  processFiles(files) {
    const imagesWrap = $('.formpage__images-thumbnails');
    if (files.length) {
      files.forEach((file, i) => {
        if (!file.type.match('image.*')) {
          return;
        }

        let getIndex = () => {
          return $('.formpage__upload').length + 1;
        };

        let reader = new FileReader();
        reader.onload = function (e) {
          let html = `
             <div class="formpage__upload" data-img-id="${getIndex()}">
               <div class="formpage__input-boxes">
                 <div>
                   <input value="1" name="visible_image_${i}" id="image_${i + 1}" type="checkbox" checked>
                   <label for="image_${getIndex()}"></label>
                 </div>
               </div>
                 <div data-name="${file.name}" style="background-image: url(${e.target.result})" class="formpage__upload-bg">
               </div>
             </div>
           `;
          imagesWrap.append(html);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  attachWatchesUpload() {
    const container = document.querySelector('#watches_upload_label'),
      input = document.querySelector('#watches_upload');

    container.addEventListener(
      'dragover',
      e => {
        e.preventDefault();
      },
      false,
    );

    container.addEventListener('dragenter', () => {
      container.classList.add(__ACTIVE);
    });

    container.addEventListener('dragleave', () => {
      container.classList.remove(__ACTIVE);
    });

    container.addEventListener('drop', e => {
      e.preventDefault();
      container.classList.remove(__ACTIVE);
      input.files = e.dataTransfer.files;
    });
  }
}

module.exports = new FormPage();
