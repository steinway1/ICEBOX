// store.ts
export type Listener<T> = (state: Readonly<T>) => void;

export function createStore<T extends object>(initial: T) {
  let state = { ...initial };
  const listeners = new Set<Listener<T>>();

  /** ───────── helpers ───────── */
  const notify = () => listeners.forEach((l) => l(state));

  /** ───────── API ──────────── */
  const get = () => state;

  const set = (patch: Partial<T>) => {
    state = { ...state, ...patch };
    notify();
  };

  /* overload #1 – без селектора */
  function subscribe(listener: Listener<T>): () => void;

  /* overload #2 – с селектором */
  function subscribe<S>(
    selector: (st: T) => S,
    listener: (slice: S) => void,
    eq?: (a: S, b: S) => boolean,
  ): () => void;

  /* реализация */
  function subscribe(arg1: any, arg2?: any, arg3?: any) {
    // форма (selector, listener)
    if (typeof arg2 === "function") {
      const selector = arg1 as (st: T) => any;
      const listener = arg2 as (slice: any) => void;
      const equality = arg3 ?? (Object.is as (a: any, b: any) => boolean);

      let prevSlice = selector(state);
      const wrapped: Listener<T> = (next) => {
        const nextSlice = selector(next);
        if (!equality(prevSlice, nextSlice)) {
          prevSlice = nextSlice;
          listener(nextSlice);
        }
      };

      listeners.add(wrapped);
      wrapped(state);
      return () => listeners.delete(wrapped);
    }

    // форма (listener)
    const listener = arg1 as Listener<T>;
    listeners.add(listener);
    listener(state);
    return () => listeners.delete(listener);
  }

  return { get, set, subscribe };
}
