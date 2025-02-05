import LockPin from '../dynamic/lock-pin'
import PageMsg from '../dynamic/page-msg'

function createElem(tagName, options) {
  const { className, id, innerHTML, style, attributes, toAppend } = options
  const elem = document.createElement(tagName)
  if (className) elem.className = className;
  if (id) elem.id = id;
  if (innerHTML) elem.innerHTML = innerHTML;
  if (style) {
    for (const key in options.style) { elem.style[key] = options.style[key] }
  }
  if (attributes) {
    for (const key in options.attributes) { elem.setAttribute(key, options.attributes[key]) }
  }
  if (toAppend) {
    for (const child of toArray(toAppend)) { elem.appendChild(child) }
  }
  return elem
}

function getTransitionTime(el) {
  return parseFloat(window.getComputedStyle(el).transitionDuration) * 1000;
}

function inputAllowOnlyDecimals(input) {
  input.addEventListener('input', function () {
    input.value = input.value.replace(/[^0-9.]/g, '');
  })
}

function lockScroll() {
  setTimeout(function () {
    if (!document.body.hasAttribute("ib-scroll-lock")) {
      let o = window.pageYOffset || document.documentElement.scrollTop;
      document.body.setAttribute("ib-scroll-lock", o),
        (document.body.style.overflow = "hidden"),
        (document.body.style.position = "fixed"),
        (document.body.style.top = "-" + o + "px"),
        (document.body.style.left = "0"),
        (document.body.style.width = "100%");
    }
  }, 1);
}

function unlockScroll() {
  if (document.body.hasAttribute("ib-scroll-lock")) {
    let o = document.body.getAttribute("ib-scroll-lock");
    document.body.removeAttribute("ib-scroll-lock"),
      (document.body.style.overflow = ""),
      (document.body.style.position = ""),
      (document.body.style.top = ""),
      (document.body.style.left = ""),
      (document.body.style.width = ""),
      window.scroll(0, o);
  }
}

function toArray(value) {
  return Array.isArray(value) ? value : [value];
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function removeClasses(target, ...classes) {
  for (const cls of classes) {
    target.classList.remove(cls)
  }
}

function addClasses(target, ...classes) {
  for (const cls of classes) {
    target.classList.add(cls)
  }
}

function getAdminUserName() {
  return 'Zahir'
}

function allowInputDigits(input) {
  input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '')
  })
}

function formatAsCurrency(string) {
  string = typeof string === 'string' ? string : string.toString()
  const number = parseFloat(string.replace(/,/g, ''))
  const parts = number.toFixed(2).split('.')
  const digits = parts[0]
  const decimal = parts[1]
  const integer = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${integer}.${decimal}`
}

function allowInputSum(input) {
  input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9.,]/g, '').replace(/,/g, '.')
    if (/^0+/.test(e.target.value)) {
      e.target.value = e.target.value.replace(/^0+/, '')
    }
  })
  input.addEventListener('keydown', (e) => {
    const alreadyContainsDotOrComma = e.target.value.includes('.') || e.target.value.includes(',')
    if (alreadyContainsDotOrComma && (e.key === '.' || e.key === ',')) {
      e.preventDefault()
    }
  })
}

function onContentLoaded(callback) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

function pageBackdropOn() {
  const pageBackdrop = document.querySelector('.am-backdrop')
  pageBackdrop.style.display = 'block'
  setTimeout(() => {
    pageBackdrop.style.opacity = '1'
  }, 1);
}

function pageBackdropOff() {
  const pageBackdrop = document.querySelector('.am-backdrop')
  pageBackdrop.style.opacity = '0'
  setTimeout(() => {
    pageBackdrop.style.display = 'none'
  }, getTransitionTime(pageBackdrop));
}

function unlockDataLockedInput(input) {
  const callback = () => {
    input.removeAttribute('data-locked-input')
    input.disabled = false
    input.classList.remove('--disabled')
  }

  const pin = new LockPin({
    code: 3256,
    callback: callback
  })
  pin.push()
}

function showMessage(type, heading, msg) {
  const pageMsg = new PageMsg({
    type: type,
    heading: heading,
    msg: msg
  })
  pageMsg.show()
}

export {
  createElem,
  getTransitionTime,
  inputAllowOnlyDecimals,
  lockScroll,
  unlockScroll,
  toArray,
  delay,
  removeClasses,
  addClasses,
  getAdminUserName,
  allowInputDigits,
  formatAsCurrency,
  allowInputSum,
  onContentLoaded,
  pageBackdropOn,
  pageBackdropOff,
  unlockDataLockedInput,
  showMessage
}