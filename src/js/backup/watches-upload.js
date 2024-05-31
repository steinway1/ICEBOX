attachWatchesUpload: () => {
  const form = document.querySelector('.form__add-watches')
  const btn = document.querySelector('[data-evt="testSubmit"]')
  if (!form) return
  const uploadLabel = document.querySelector('.formpage__watches-label'),
    uploadInput = document.querySelector('#watches_upload'),
    imagesWrap = $('.formpage__watches-thumb')

  if (uploadInput && uploadLabel && imagesWrap) {
    function processFile(files) {
      if (!files.length) throw new Error('No file selected')
      files = [...files]
      files.forEach((file, i) => {
        if (!file.type.match('image.*')) { return }

        let getIndex = () => {
          return [...document.querySelectorAll('.formpage__upload')].length + 1
        }

        let reader = new FileReader()
        reader.onload = function (e) {
          let html =
            `
             <div class="formpage__upload" data-img-id="${getIndex()}">
               <div class="formpage__input-boxes">
                 <div>
                   <input value="1" name="visible_image_${getIndex()}" id="image_${getIndex()}" type="checkbox" checked>
                   <label for="image_${getIndex()}"></label>
                 </div>
               </div>
                 <div data-name="${file.name}" style="background-image: url(${e.target.result})" class="formpage__upload-bg">
               </div>
             </div>
           `
          imagesWrap.append(html)
        }
        reader.readAsDataURL(file)
      })
    }

    uploadLabel.ondragover = (evt) => {
      evt.preventDefault()
      uploadLabel.classList.add(IS_ACTIVE)
    }
    uploadLabel.ondragleave = (evt) => {
      evt.preventDefault()
      uploadLabel.classList.remove(IS_ACTIVE)
    }
    uploadLabel.ondrop = (evt) => {
      evt.preventDefault()
      uploadLabel.classList.remove(IS_ACTIVE)
      processFile(evt.dataTransfer.files)
    }
    uploadInput.onchange = (evt) => {
      processFile(evt.target.files)
    }
  }
}