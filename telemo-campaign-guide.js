(() => {
  const guide = document.querySelector('.lpsr-campaign-concierge');
  const anchor = document.querySelector('[data-campaign-guide-anchor]');
  if (!guide || !anchor) return;

  // Match the approved hero placement once, then keep that viewport position
  // through scrolling. Resize observations keep the responsive layout aligned.
  const place = () => {
    const box = anchor.getBoundingClientRect();
    guide.style.setProperty('--campaign-guide-width', `${box.width}px`);
    guide.style.setProperty('--campaign-guide-right', `${Math.max(12, innerWidth - box.right)}px`);
    guide.style.setProperty('--campaign-guide-bottom', `${Math.max(12, innerHeight - box.bottom - scrollY)}px`);
  };
  place();
  window.addEventListener('resize', place, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(place).observe(anchor.closest('#hero'));
})();
