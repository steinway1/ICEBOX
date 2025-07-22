// src-sw/js/modules/pages/globals.ts

declare global {
  interface Window {
    toggleDocumentLoading: (isLoading: boolean) => void;
  }
}

/**
 * Toggle loading state on body
 * @param {boolean} isLoading - true to show loading, false to hide loading
 */
export const toggleDocumentLoading = (isLoading: boolean): void => {
  document.body.toggleAttribute("data-loading", isLoading);
};

window.toggleDocumentLoading = toggleDocumentLoading;

export {};
