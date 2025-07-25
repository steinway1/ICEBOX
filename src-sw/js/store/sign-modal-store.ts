import { createStore } from "../store";

export type SignView = "phone" | "email" | "reg" | "reset" | "otp";

interface SignModalState {
  isOpen: boolean;
  view: SignView;
  isLoading: boolean;
  loadingText: string;

  isShowMsg: boolean;
  isErr: boolean;
  msgText: string;

  setIsOpen: (isOpen: boolean) => void;
  setView: (view: SignView) => void;
  setIsLoading: (isLoading: boolean) => void;
  setLoadingText: (loadingText: string) => void;

  setIsShowMsg: (isShowMsg: boolean, text: string, isErr?: boolean) => void;
}

export const signModalStore = createStore<SignModalState>({
  isOpen: false,
  view: "phone",
  isLoading: false,
  loadingText: "Wait a moment...",

  isShowMsg: false,
  isErr: false,
  msgText: "",

  setIsOpen: (isOpen: boolean) => {
    signModalStore.set({ isOpen });
  },
  setView: (view: SignView) => {
    signModalStore.set({ view });
  },
  setIsLoading: (isLoading: boolean) => {
    signModalStore.set({ isLoading });
  },
  setLoadingText: (loadingText: string) => {
    signModalStore.set({ loadingText });
  },

  setIsShowMsg: (isShowMsg: boolean, text: string, isErr?: boolean) => {
    signModalStore.set({ isShowMsg, isErr, msgText: text });
  },
});
