(() => {
  const section = document.getElementById("km-emotional-risk");
  if (!section) return;
  const tabs = [...section.querySelectorAll('[role="tab"]')];
  const panel = section.querySelector('[role="tabpanel"]');
  const label = panel.querySelector(".km-risk__panel-label");
  const detail = panel.querySelector("p");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let active = tabs.findIndex(tab => tab.getAttribute("aria-selected") === "true");
  let pending;

  function select(index) {
    if (index === active) return;
    active = index;
    tabs.forEach((tab, position) => {
      const selected = position === index;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    const tab = tabs[index];
    panel.setAttribute("aria-labelledby", tab.id);
    clearTimeout(pending);
    const update = () => {
      label.textContent = `${tab.querySelector(".km-risk__number").textContent} / ${tab.querySelector(".km-risk__name").textContent}`;
      detail.textContent = tab.dataset.detail;
      panel.classList.remove("is-changing");
    };
    if (reducedMotion.matches) update();
    else {
      panel.classList.add("is-changing");
      pending = setTimeout(update, 180);
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("mouseenter", () => {
      if (matchMedia("(hover: hover)").matches) select(index);
    });
    tab.addEventListener("click", () => select(index));
    tab.addEventListener("focus", () => select(index));
    tab.addEventListener("keydown", event => {
      const move = {ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1};
      if (event.key in move) {
        event.preventDefault();
        const next = (index + move[event.key] + tabs.length) % tabs.length;
        tabs[next].focus();
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        tabs[event.key === "Home" ? 0 : tabs.length - 1].focus();
      }
    });
  });
})();
