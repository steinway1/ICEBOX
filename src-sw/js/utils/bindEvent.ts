import { CLASSNAMES } from "./constants";

export const bindFilterRowToggle = (el: HTMLElement) => {
  const headEl = el.querySelector(".filter-head") as HTMLElement;
  const bodyEl = el.querySelector(".filter-body") as HTMLElement;
  const toggleEl = el.querySelector(".filter-toggle") as HTMLElement;

  if (!headEl || !bodyEl || !toggleEl) return;

  const toggleBody = () => {
    const { offsetHeight } = toggleEl;
    const { scrollHeight } = bodyEl;

    if (offsetHeight == 0) {
      el.classList.add(CLASSNAMES.IS_ACTIVE);
      toggleEl.style.height = `${scrollHeight}px`;
    } else {
      el.classList.remove(CLASSNAMES.IS_ACTIVE);
      toggleEl.style.height = "0px";
    }
  };

  headEl.addEventListener("click", () => {
    toggleBody();
  });
};
