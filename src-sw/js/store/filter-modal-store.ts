import { createStore } from "../store";

interface ModalFilterState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const modalFilterStore = createStore<ModalFilterState>({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => {
    modalFilterStore.set({ isOpen });
  },
});
