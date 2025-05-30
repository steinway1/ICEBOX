import LockPin from '../dynamic/lock-pin';
import PageMsg from '../dynamic/page-msg';

/**
 * Creates and returns a new DOM element with specified options
 * @param {string} tagName - HTML tag name for the element (e.g. 'div', 'span', 'p')
 * @param {Object} options - Configuration options for the element
 * @param {string} [options.className] - CSS class name(s) to add to the element
 * @param {string} [options.id] - ID to set on the element
 * @param {string} [options.innerHTML] - Inner HTML content for the element
 * @param {Object} [options.style] - Style object with CSS properties to apply
 * @param {Object} [options.attributes] - Key-value pairs of attributes to set
 * @param {HTMLElement|HTMLElement[]} [options.toAppend] - Child element(s) to append
 * @returns {HTMLElement} The created DOM element
 * @example
 * // Create a div with class, id and content
 * const div = createElem('div', {
 *   className: 'my-class',
 *   id: 'my-id',
 *   innerHTML: 'Hello world'
 * });
 */
function createElem(tagName, options) {
  const { className, id, innerHTML, style, attributes, toAppend } = options;
  const elem = document.createElement(tagName);
  if (className) elem.className = className;
  if (id) elem.id = id;
  if (innerHTML) elem.innerHTML = innerHTML;
  if (style) {
    for (const key in options.style) {
      elem.style[key] = options.style[key];
    }
  }
  if (attributes) {
    for (const key in options.attributes) {
      elem.setAttribute(key, options.attributes[key]);
    }
  }
  if (toAppend) {
    for (const child of toArray(toAppend)) {
      elem.appendChild(child);
    }
  }
  return elem;
}

function getTransitionTime(el) {
  return parseFloat(window.getComputedStyle(el).transitionDuration) * 1000;
}

function inputAllowOnlyDecimals(input) {
  input.addEventListener('input', function () {
    let value = input.value.replace(/[^0-9.]/g, '');

    const parts = value.split('.');

    if (parts.length > 1) {
      value = parts[0] + '.' + parts[1].slice(0, 2);
    }

    input.value = value;
  });
}

function lockScroll() {
  setTimeout(function () {
    if (!document.body.hasAttribute('ib-scroll-lock')) {
      let o = window.pageYOffset || document.documentElement.scrollTop;
      document.body.setAttribute('ib-scroll-lock', o),
        (document.body.style.overflow = 'hidden'),
        (document.body.style.position = 'fixed'),
        (document.body.style.top = '-' + o + 'px'),
        (document.body.style.left = '0'),
        (document.body.style.width = '100%');
    }
  }, 1);
}

function unlockScroll() {
  if (document.body.hasAttribute('ib-scroll-lock')) {
    let o = document.body.getAttribute('ib-scroll-lock');
    document.body.removeAttribute('ib-scroll-lock'),
      (document.body.style.overflow = ''),
      (document.body.style.position = ''),
      (document.body.style.top = ''),
      (document.body.style.left = ''),
      (document.body.style.width = ''),
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
    target.classList.remove(cls);
  }
}

function addClasses(target, ...classes) {
  for (const cls of classes) {
    target.classList.add(cls);
  }
}

function getAdminUserName() {
  return 'Zahir';
}

function allowInputDigits(input) {
  input.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/\D/g, '');
  });
}

function formatAsCurrency(string) {
  string = typeof string === 'string' ? string : string.toString();
  const number = parseFloat(string.replace(/,/g, ''));
  const parts = number.toFixed(2).split('.');
  const digits = parts[0];
  const decimal = parts[1];
  const integer = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${integer}.${decimal}`;
}

function allowInputSum(input) {
  input.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/[^0-9.,]/g, '').replace(/,/g, '.');
    if (/^0+/.test(e.target.value)) {
      e.target.value = e.target.value.replace(/^0+/, '');
    }
  });
  input.addEventListener('keydown', e => {
    const alreadyContainsDotOrComma = e.target.value.includes('.') || e.target.value.includes(',');
    if (alreadyContainsDotOrComma && (e.key === '.' || e.key === ',')) {
      e.preventDefault();
    }
  });
}

function onContentLoaded(callback) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

function pageBackdropOn() {
  const pageBackdrop = document.querySelector('.am-backdrop');
  pageBackdrop.style.display = 'block';
  setTimeout(() => {
    pageBackdrop.style.opacity = '1';
  }, 1);
}

function pageBackdropOff() {
  const pageBackdrop = document.querySelector('.am-backdrop');
  pageBackdrop.style.opacity = '0';
  setTimeout(() => {
    pageBackdrop.style.display = 'none';
  }, getTransitionTime(pageBackdrop));
}

function unlockDataLockedInput(input) {
  const callback = () => {
    input.removeAttribute('data-locked-input');
    input.disabled = false;
    input.classList.remove('--disabled');
  };

  const pin = new LockPin({
    code: 3256,
    callback: callback,
  });
  pin.push();
}

function showMessage({ type = 'error', heading = 'Error', msg = 'Something went wrong' }) {
  new PageMsg({
    type: type,
    heading: heading,
    msg: msg,
  });
}

function formatAndSumNumbers(...args) {
  let sum = 0;

  function processItem(item) {
    if (Array.isArray(item)) {
      item.forEach(processItem);
      return;
    }

    if (typeof item === 'number') {
      sum += item;
      return;
    }

    if (typeof item === 'string') {
      let cleaned = item.replace(/[^0-9.,]/g, '');
      cleaned = cleaned.replace(/,/g, '');
      const numValue = parseFloat(cleaned);

      if (!isNaN(numValue)) {
        sum += numValue;
      }
    }
  }

  args.forEach(processItem);

  const formattedSum = sum.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${formattedSum}`;
}

function applyOverloader(target) {
  const overLoader = createElem('span', {
    className: 'over-loader',
  });
  target.appendChild(overLoader);
  target.disabled = true;
  target.classList.add('--over-loading');
}

function removeOverloader(target) {
  const overLoader = target.querySelector('.over-loader');

  if (overLoader) {
    overLoader.remove();
    target.disabled = false;
    target.classList.remove('--over-loading');
  }
}

function anyIsNaN(...args) {
  for (const arg of args) {
    if (isNaN(arg)) {
      return true;
    }
  }
  return false;
}

/**
 * @description Appends a page loader to the body
 * @param {string} text
 */
function appendPageLoader(text = null) {
  let loader = document.querySelector('.page-loader');
  if (loader) return;

  loader = document.createElement('div');
  if (text) loader.setAttribute('data-text', text);
  loader.classList.add('page-loader');
  loader.innerHTML = `
<svg 
    class="page-loader-container" 
    x="0px" 
    y="0px" 
    viewBox="0 0 37 37" 
    height="37" 
    width="37" 
    preserveAspectRatio="xMidYMid meet"
  >
  <path 
    class="page-loader-track" 
    fill="none" 
    stroke-width="5" 
    pathLength="100" 
    d="M36.63 31.746 c0 -13.394 -7.3260000000000005 -25.16 -18.13 -31.375999999999998 C7.696 6.66 0.37 18.352 0.37 31.746 c5.328 3.108 11.544 4.8839999999999995 18.13 4.8839999999999995 S31.301999999999996 34.854 36.63 31.746z"></path>
  <path 
    class="page-loader-car" 
    fill="none" 
    stroke-width="5" 
    pathLength="100" 
    d="M36.63 31.746 c0 -13.394 -7.3260000000000005 -25.16 -18.13 -31.375999999999998 C7.696 6.66 0.37 18.352 0.37 31.746 c5.328 3.108 11.544 4.8839999999999995 18.13 4.8839999999999995 S31.301999999999996 34.854 36.63 31.746z"></path>
</svg>
  `;
  document.body.appendChild(loader);
}

function removePageLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;

  loader.remove();
}

function debounce(func, ms) {
  let lastCall;
  let lastCallTimer;

  return function perform(...args) {
    let prevCall = lastCall;
    lastCall = Date.now();

    if (prevCall && lastCall - prevCall <= ms) {
      clearTimeout(lastCallTimer);
    }

    lastCallTimer = setTimeout(() => func(...args), ms);
  };
}

function throttle(func, ms) {
  let timer = null;

  return function perform(...args) {
    if (timer) return;

    timer = setTimeout(() => {
      func(...args);
      timer = null;
    }, ms);
  };
}

function arrayIntoChunks(array, size) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) => array.slice(i * size, (i + 1) * size));
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
  showMessage,
  formatAndSumNumbers,
  applyOverloader,
  removeOverloader,
  anyIsNaN,
  appendPageLoader,
  removePageLoader,
  debounce,
  throttle,
  arrayIntoChunks,
};
