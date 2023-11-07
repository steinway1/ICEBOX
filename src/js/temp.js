const evtBookNext = $('[data-evt="bookModalNext"]')
const evtBookBack = $('[data-evt="bookModalBack"]')
const bookSectionDate = $('#bookSectionDate')
const bookSectionPersonal = $('#bookSectionPersonal')
const bookSectionConfirm = $('#bookSectionConfirm')

const bookFullName = document.getElementById('bookFullName')
const bookEmail = document.getElementById('bookEmail')
const bookPhone = document.getElementById('bookPhone')

const bookConfirmName = document.getElementById('bookConfirmName')
const bookConfirmEmail = document.getElementById('bookConfirmEmail')
const bookConfirmPhone = document.getElementById('bookConfirmPhone')
const bookConfirmDate = document.getElementById('bookConfirmDate')
const bookConfirmTime = document.getElementById('bookConfirmTime')

const bookSellModal = $('.book-sell')
const bookModalBackdrop = $('.book-sell__backdrop')
const bookModalContainer = $('.book-sell__container')

let bookStep = 1
let inputed = {}

const bookDateTime = {
  intervals: [[11, 0o0, 0o0], [13, 30, 0o0], [15, 30, 0o0], [16, 0o0, 0o0], [16, 30, 0o0]],
  daysPerView: 3,
  holder: document.getElementById('bookSellDates'),
  modal: document.querySelectorAll('.book-sell'),

  init: function () {
    if (this.modal.length) {
      this.attachEvents()
      this.appendBoxes(this.getDates(true))
    }
  },
  renderHTML: (date) => {
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' }), day = date.getDate(), month = date.toLocaleDateString('en-US', { month: 'short' }), time = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })

    let ifPast = new Date() > date ? ' disabled' : ''
    let dayTime = date.getDay() == 6 ? 'Closed' : date.getDay() == 0 ? 'Closed' : time
    let isWeekend = date.getDay() == 6 ? ' is-closed' : date.getDay() == 0 ? ' is-closed' : ''

    return `
    <div class="book-sell__date-box${isWeekend}" data-time="${String(date)}"${ifPast}>
      <span>${weekday}, ${day}${getOrdinalTxt(day)} ${month}</span>
      <span>${dayTime}</span>
    </div>
    `
  },
  appendBoxes: function (arr) {
    arr.forEach((el) => this.holder.insertAdjacentHTML('beforeend', el))
  },

  getDates: function (isNext) {
    let daysArr = [], initial = 0
    let arr = [...document.querySelectorAll('.book-sell__date-box')]
    let initialDate

    if (arr.length == 0) {
      initialDate = new Date()
    } else {
      if (isNext == true) {
        initialDate = new Date(arr[arr.length - 1].getAttribute('data-time'))
      } else {
        initialDate = new Date(arr[0].getAttribute('data-time'))
      }
    }

    if (arr.length !== 0) {
      arr.forEach(el => el.remove());
      if (isNext == true) {
        initialDate.setDate(initialDate.getDate() + 1)
      } else { initialDate.setDate(initialDate.getDate() - 1) }
    }

    while (initial !== this.daysPerView) {
      let dayDate = new Date(initialDate)
      if (isNext == true) { daysArr.push(new Date(dayDate.setDate(initialDate.getDate() + initial))) } else {
        daysArr.push(new Date(dayDate.setDate(initialDate.getDate() - initial)))
      }
      ++initial
    }

    let ints = isNext == true ? this.intervals : this.intervals.slice().reverse()

    let htmlArr = daysArr.reduce((acc, date) => {
      ints.forEach((interval) => {
        let thisDate = new Date(date)
        thisDate.setHours(...interval)
        acc.push(this.renderHTML(thisDate))
      })
      return acc
    }, [])

    if (isNext == true) { return htmlArr } else { return htmlArr.reverse() }
  },

  attachEvents: function () {
    $('[data-switch-time]').click(function () {
      let attr = $(this).attr('data-switch-time')
      switch (attr) {
        case 'next':
          bookDateTime.appendBoxes(bookDateTime.getDates(true))
          break;
        case 'prev':
          if ([...document.querySelectorAll('.book-sell__date-box')][0])
            bookDateTime.appendBoxes(bookDateTime.getDates(false))
          break;
      }
    }),
      $(document).on('click', '.book-sell__date-box', function () {
        $(this).toggleClass(IS_ACTIVE).siblings().removeClass(IS_ACTIVE)
        bookObserver()
      })
  }
}


function resetBookModal() {
  bookStep = 1
  inputArr.forEach((el) => { el.value = '' })
  $('.book-sell__date-box').removeClass(IS_ACTIVE)
  bookSectionConfirm.hide()
  bookSectionPersonal.hide()
  bookSectionDate.show()
  Object.values(inputed).forEach((el) => {
    delete el
  })
  bookObserver()
}

$('[data-evt="toggleBookModal"]').click(function () {
  if (bookSellModal.isVisible()) {
    closeBookModal()
  } else {
    openBookModal()
  }
})

evtBookNext.click(function () {
  switch (bookStep) {
    case 1:
      if (inputed.date) {
        bookStep = 2
        bookSectionDate.hide()
        bookSectionPersonal.show()
        bookObserver()
      }
      break;
    case 2:
      if (bookFullName.value && bookEmail.value && bookPhone.value) {
        bookStep = 3
        bookSectionPersonal.hide()
        bookSectionConfirm.show()
        inputed.name = bookFullName.value
        inputed.email = bookEmail.value
        inputed.phone = bookPhone.value
        bookObserver()
      }
      break;
    case 3:
      alert(JSON.stringify(inputed)) // change later
      closeBookModal()
      setTimeout(() => {
        resetBookModal()
      }, getTransitionTime(bookModalContainer));
      break;
  }
})

evtBookBack.click(function () {
  switch (bookStep) {
    case 1:
      closeBookModal()
      break;
    case 2:
      --bookStep
      bookObserver()
      bookSectionPersonal.hide()
      bookSectionDate.show()
      break;
    case 3:
      --bookStep
      bookObserver()
      bookSectionConfirm.hide()
      bookSectionPersonal.show()
      break;
  }
})


function bookObserver() {
  switch (bookStep) {
    case 1:
      let activeDate = $('.book-sell__date-box').filter(`.${IS_ACTIVE}`)
      if (activeDate.length) {
        inputed.date = new Date(activeDate.attr('data-time'))
        evtBookNext.attr('disabled', false)
      } else {
        delete inputed.date
        evtBookNext.attr('disabled', true)
      }
      break;
    case 2:
      if (bookFullName.value && bookEmail.value && bookPhone.value && inputed.date) {
        evtBookNext.attr('disabled', false)
      } else {
        evtBookNext.attr('disabled', true)
      }
      break;
    case 3:
      bookConfirmName.innerHTML = inputed.name
      bookConfirmEmail.innerHTML = inputed.email
      bookConfirmPhone.innerHTML = inputed.phone
      bookConfirmDate.innerHTML = `${inputed.date.getDate()}${getOrdinalTxt(inputed.date.getDate())} ${inputed.date.toLocaleDateString('en-US', { month: 'long' })}`
      bookConfirmTime.innerHTML = inputed.date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })
      break;
  }
}

bookObserver()

bookDateTime.init()