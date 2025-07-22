import { documentStore } from "../store/document-store";

export const getTransitionTime = (el: HTMLElement): number => {
  const style = window.getComputedStyle(el);
  const parseMs = (str: string) =>
    Math.max(
      ...str
        .split(",")
        .map((s) => parseFloat(s) * 1000)
        .filter((n) => !isNaN(n)),
    );

  const duration = parseMs(style.transitionDuration);
  const delay = parseMs(style.transitionDelay);

  return duration + delay;
};

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const createElement = (
  tag: string,
  {
    className,
    alt,
    src,
    text,
    innerHTML,
  }: {
    className?: string;
    alt?: string;
    src?: string;
    text?: string;
    innerHTML?: string;
  } = {},
) => {
  const el = document.createElement(tag);
  if (className) el.classList.add(...className.split(" "));
  if (alt) el.setAttribute("alt", alt);
  if (src) el.setAttribute("src", src);
  if (text) el.textContent = text;
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
};

export const lockScroll = () => {
  const { scrollIsLocked: locked } = documentStore.get();
  if (locked) return;

  document.body.style.overflowY = "hidden";
  documentStore.set({ scrollIsLocked: true });
};

export const unlockScroll = () => {
  const { scrollIsLocked: locked } = documentStore.get();
  if (!locked) return;

  document.body.style.overflowY = "auto";
  documentStore.set({ scrollIsLocked: false });
};
