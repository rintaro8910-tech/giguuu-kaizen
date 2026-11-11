(() => {
  const guide = document.querySelector('.lpsr-campaign-concierge');
  const anchor = document.querySelector('[data-campaign-guide-anchor]');
  if (!guide || !anchor) return;
  let initialBottom = 12;
  let scrollScheduled = false;

  const updateBottom = () => {
    const offset = Math.min(64, Math.max(0, scrollY) * .35);
    guide.style.setProperty('--campaign-guide-bottom', `${Math.max(12, initialBottom - offset)}px`);
  };

  // Preserve the approved hero position, then settle slightly lower on scroll.
  // Resize observations keep the portrait aligned with its hero anchor.
  const place = () => {
    const box = anchor.getBoundingClientRect();
    guide.style.setProperty('--campaign-guide-width', `${box.width}px`);
    guide.style.setProperty('--campaign-guide-right', `${Math.max(12, document.documentElement.clientWidth - box.right)}px`);
    initialBottom = Math.max(12, innerHeight - box.bottom - scrollY);
    updateBottom();
  };
  place();
  window.addEventListener('scroll', () => {
    if (scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(() => {
      scrollScheduled = false;
      updateBottom();
    });
  }, { passive: true });
  window.addEventListener('resize', place, { passive: true });
  window.addEventListener('load', place);
  document.fonts?.ready.then(place);
  if ('ResizeObserver' in window) {
    // Late images and fonts can move the anchor without resizing the hero itself.
    const observer = new ResizeObserver(place);
    const hero = anchor.closest('#hero');
    [hero, ...hero.querySelectorAll('*')].forEach(element => observer.observe(element));
  }
})();
