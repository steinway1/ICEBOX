/**
 * Usage Example:
 *
 * // Create a wrapper <div> with two classes, an attribute, and a child <input>:
 * const inputWrap = createElem({
 *   tag: 'div',
 *   className: ['input-wrap', 'another-class'],
 *   attrs: { 'data-role': 'wrapper' },
 *   children: createElem({
 *     tag: 'input',
 *     className: 'input-field',
 *     attrs: { type: 'text', placeholder: 'Number of watches' }
 *   })
 * });
 *
 * document.body.appendChild(inputWrap);
 */

export interface CreateElemOpts {
  tag: string;
  className?: string | string[];
  attrs?: Record<string, string>;
  innerHTML?: string;
  textContent?: string;
  children?: HTMLElement | HTMLElement[];
}

/**
 * Create an element with flexible settings: tag name, classes, attributes,
 * innerHTML or children (single element or array), and textContent.
 */

export function createElem({
  tag,
  className,
  attrs,
  innerHTML,
  textContent,
  children,
}: CreateElemOpts) {
  // 1. Create the element
  const el = document.createElement(tag);

  // 2. Add class or classes
  if (className) {
    if (Array.isArray(className)) {
      el.classList.add(...className);
    } else {
      el.classList.add(className);
    }
  }

  // 3. Set any attributes
  if (attrs) {
    for (const [name, value] of Object.entries(attrs)) {
      el.setAttribute(name, value);
    }
  }

  // 4. Set innerHTML if provided (takes precedence over textContent/children)
  if (innerHTML != null) {
    el.innerHTML = innerHTML;
  }
  // 5. Otherwise, set plain text if provided
  else if (textContent != null) {
    el.textContent = textContent;
  }

  // 6. Append child or children if provided
  if (children != null && innerHTML == null) {
    const items = Array.isArray(children) ? children : [children];
    for (const child of items) {
      el.appendChild(child);
    }
  }

  return el;
}
