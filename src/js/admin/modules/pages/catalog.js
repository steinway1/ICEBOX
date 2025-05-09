import EventBus from '../../event-bus';
import CatalogZoom from '../components/catalog/catalog-zoom';
import CatalogSwitcher from '../components/catalog/catalog-switcher';
import CatalogSettings from '../components/catalog/catalog-settings';
import CatalogPrint from '../components/catalog/catalog-print';
import PanelSidebar from '../elements/panel-sidebar';

import PageMsg from '../dynamic/page-msg';

import { fakeAjaxSaveCatalogItemZoom } from '../general/fake-ajax';
import { appendPageLoader, removePageLoader } from '../general/utils';
import { showMessage } from '../general/utils';

/**
 * @class Catalog
 * @description A class for the catalog page
 * @param {HTMLElement} rootEl - The root element of the catalog
 */
export default class Catalog {
  static Events = {
    ZOOM_IN: 'catalog-zoom-in',
    ZOOM_OUT: 'catalog-zoom-out',
    SWITCH_COLLECTION: 'catalog-switch-collection',
    UPDATE_SETTINGS: 'catalog-update-settings',
    PRINT_CATALOG: 'catalog-print',
  };

  constructor(rootEl) {
    this.rootEl = rootEl;
    if (!this.rootEl) return;

    this.eventBus = EventBus.getInstance();
    this.zoom = new CatalogZoom(this.rootEl);
    this.switcher = new CatalogSwitcher(this.rootEl, this);
    this.settings = new CatalogSettings(this.rootEl);
    this.sidebar = new PanelSidebar();
    this.printer = new CatalogPrint(this);

    this.selectedCollection = null;

    this.list = this.rootEl.querySelector('#catalogList');
    this.printArr = [...document.querySelectorAll('[data-print-catalog]')];
    this.#init();
  }
  #init() {
    this.#subscribeToEvents();
    this.#attachZoomListeners();
    this.#attachCollectionSwitcherListeners();
    this.#attachPrintListeners();
    this.#attachCatalogItemZoomListeners();
  }

  /**
   * Subscribe to event bus events
   */
  #subscribeToEvents() {
    /**
     * @description Subscribe to the zoom in / outevent
     */
    this.eventBus.on(Catalog.Events.ZOOM_IN, () => this.zoom.zoomIn());
    this.eventBus.on(Catalog.Events.ZOOM_OUT, () => this.zoom.zoomOut());

    this.eventBus.on(Catalog.Events.SWITCH_COLLECTION, (collectionName, input) =>
      this.switcher.switch(collectionName, input),
    );

    /**
     * Printing
     */
    this.eventBus.on(Catalog.Events.PRINT_CATALOG, () => {
      this.printer.print();
    });
  }

  /**
   * Attach DOM event listeners to control elements
   */
  #attachZoomListeners() {
    const zoomInBtn = this.rootEl.querySelector('[data-catalog-zoom-in]');
    const zoomOutBtn = this.rootEl.querySelector('[data-catalog-zoom-out]');

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => {
        this.eventBus.emit(Catalog.Events.ZOOM_IN);
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => {
        this.eventBus.emit(Catalog.Events.ZOOM_OUT);
      });
    }
  }
  #attachCollectionSwitcherListeners() {
    const inputArr = [...this.rootEl.querySelectorAll('input[name="catalog_collection"]')];

    inputArr.forEach(input => {
      input.addEventListener('change', e => {
        const catalogName = input.value;

        this.eventBus.emit(Catalog.Events.SWITCH_COLLECTION, catalogName, input);
      });
    });
  }
  #attachPrintListeners() {
    this.printArr.forEach(printElem => {
      printElem.addEventListener('click', e => {
        if (!this.selectedCollection) {
          new PageMsg({
            heading: 'No collection selected',
            msg: 'Please select a collection to print',
            type: 'error',
          });
          return;
        }
        this.eventBus.emit(Catalog.Events.PRINT_CATALOG);
      });
    });
  }

  /**
   * Attach event listeners to catalog item zoom buttons
   */
  #attachCatalogItemZoomListeners() {
    this.rootEl.addEventListener('click', e => {
      const zoomButton = e.target.closest('[data-evt^="catalog-item-zoom"]');
      if (!zoomButton) return;

      const catalogItem = this.#getCatalogItem(zoomButton);
      if (!catalogItem) return;

      const { id, media } = catalogItem;
      const zoom = this.#calculateNewZoom(zoomButton.dataset.evt, media);
      this.#updateMediaZoom(media, zoom);

      if (zoomButton.dataset.evt === 'catalog-item-zoom-save') {
        this.#saveZoom(id, zoom);
      }
    });
  }

  #getCatalogItem(element) {
    const card = element.closest('.catalog-item');
    const media = card?.querySelector('.catalog-item__media');

    if (!card?.dataset.id || !media) return null;

    return {
      id: card.dataset.id,
      media,
    };
  }

  #calculateNewZoom(action, mediaElement) {
    const ZOOM_STEP = 0.1;
    const MAX_ZOOM = 2;
    const MIN_ZOOM = 0.1;

    const currentZoom = this.#getCurrentZoom(mediaElement);

    switch (action) {
      case 'catalog-item-zoom-in':
        return Math.min(MAX_ZOOM, currentZoom + ZOOM_STEP);
      case 'catalog-item-zoom-out':
        return Math.max(MIN_ZOOM, currentZoom - ZOOM_STEP);
      default:
        return currentZoom;
    }
  }

  #getCurrentZoom(mediaElement) {
    const transform = mediaElement.style.transform;
    if (!transform) return 1;

    const match = transform.match(/scale\(([\d.]+)\)/);
    return match ? parseFloat(match[1]) : 1;
  }

  #updateMediaZoom(mediaElement, zoom) {
    mediaElement.style.transform = `scale(${zoom})`;
  }

  async #saveZoom(id, zoom) {
    try {
      appendPageLoader('Saving zoom...');

      /**
       * @CHOU
       * Put the real AJAX call here
       */
      const response = await fakeAjaxSaveCatalogItemZoom(id, zoom);
      if (!response.ok) {
        throw new Error('Failed to save zoom');
      }

      showMessage({
        heading: 'Zoom saved',
        msg: 'Zoom saved successfully',
        type: 'success',
      });
    } catch (error) {
      console.error('Failed to save zoom', error);
    } finally {
      removePageLoader();
    }
  }
}
