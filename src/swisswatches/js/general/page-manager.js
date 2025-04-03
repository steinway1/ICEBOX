/**
 * component - object with instance, rootSelector
 * example:
 * {
 *  instance: Splide,
 *  rootSelector: '.splide',
 * }
 */
export default class PageManager {
  constructor(components = []) {
    this.components = components;
    this.init();
  }

  init() {
    this.components.forEach((component) => {
      if (!component.instance) {
        console.warn("Component is missing instance property:", component);
        return;
      }

      if (
        !component.rootSelector ||
        !document.querySelector(component.rootSelector)
      ) {
        console.warn("Component root element not found:", component);
        return;
      }

      try {
        new component.instance(component.rootSelector);
      } catch (error) {
        console.warn("Failed to initialize component:", component, error);
      }
    });
  }
}
