import { createStore } from "../store";

interface DocumentStore {
  scrollIsLocked: boolean;
}

export const documentStore = createStore<DocumentStore>({
  scrollIsLocked: false,
});
