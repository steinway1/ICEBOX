import { createStore } from "../store";

interface MenuState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const menuStore = createStore<MenuState>({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => {
    menuStore.set({ isOpen });
  },
});
