class ShareButtons {
  constructor() {
    return
    this.currentUrl = window.location.href
    this.currentTitle = document.title
    this.elemArr = [...document.querySelectorAll('.share-btn')]

    if (this.elemArr.length) {
      this.init()
    }
  }

  init() {
    this.elemArr.forEach((button) => {
      const parent = button.closest('.share-box')
      const drop = button.nextElementSibling

      if (parent && drop && drop.classList.contains('share-drop')) {
        const linksArr = drop.querySelectorAll('.share-drop__btn')

        linksArr.forEach((link) => {
          const platform = link.dataset.share;

          if (platform === 'copy') {
            link.addEventListener('click', () => {
              navigator.clipboard.writeText(this.currentUrl)
                .then(() => {
                  link.textContent = 'Copy URL'
                  link.textContent = 'Copied'
                  setTimeout(() => {
                    link.textContent = 'Copy URL'
                  }, 800);
                })
                .catch(err => { throw new Error('Copying error occured') })
            })
          } else {
            link.addEventListener('click', (event) => {
              event.preventDefault();
              let shareUrl = ''

              switch (platform) {
                case 'fb':
                  shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.currentUrl)}`;
                  break;
                case 'tg':
                  shareUrl = `https://t.me/share/url?url=${encodeURIComponent(this.currentUrl)}&text=${encodeURIComponent(this.currentTitle)}`;
                  break;
                case 'wa':
                  shareUrl = `https://wa.me/?text=${encodeURIComponent(this.currentTitle)}%20${encodeURIComponent(this.currentUrl)}`;
                  break;
                default:
                  return;
              }

              window.open(shareUrl, '_blank')
            })
          }
        })
      }
    })
  }
}

module.exports = ShareButtons