// src-sw/js/store/search-store.ts
import { createStore } from "../store";

interface ModalSearchState {
  isOpen: boolean;
  query: string;
  loading: boolean;
  results: {}[];

  // actions
  setIsOpen: (isOpen: boolean) => void;
  setLoading: (loading: boolean) => void;
  setResults: (results: {}[]) => void;
  setQuery: (query: string) => void;
}

export const modalSearchStore = createStore<ModalSearchState>({
  isOpen: false,
  query: "",
  loading: false,
  results: [],

  // actions
  setIsOpen: (isOpen: boolean) => {
    modalSearchStore.set({ isOpen });
  },
  setLoading: (loading: boolean) => {
    modalSearchStore.set({ loading });
  },
  setResults: (results: {}[]) => {
    modalSearchStore.set({ results });
  },
  setQuery: (query: string) => {
    modalSearchStore.set({ query });
  },
});
