import { createStore } from "../store";
import type { Item } from "../types/items";

interface ModalQuickViewState {
  isOpen: boolean;
  selectedId: Item["id"] | null;
  item: Item | null;

  /* actions */
  open: (id: Item["id"]) => void;
  close: () => void;
  setItem: (item: Item) => void;
  reset: () => void;
}

export const modalQuickViewStore = createStore<ModalQuickViewState>({
  isOpen: false,
  selectedId: null,
  item: null,

  open(id) {
    modalQuickViewStore.set({ isOpen: true, selectedId: id });
  },
  close() {
    modalQuickViewStore.set({ isOpen: false, selectedId: null, item: null });
  },
  setItem(item) {
    modalQuickViewStore.set({ item });
  },
  reset() {
    modalQuickViewStore.set({ isOpen: false, selectedId: null, item: null });
  },
});
