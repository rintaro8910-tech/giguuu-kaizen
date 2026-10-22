(() => {
  const hero = document.querySelector('#hero.lpsr-campaign-hero');
  const guide = document.querySelector('.telemo-concierge');
  if (!hero || !guide || !('IntersectionObserver' in window)) return;

  // The hero already contains the president. Restore the existing floating guide
  // as soon as the hero leaves the screen; the benefits handoff stays independent.
  const observer = new IntersectionObserver(entries => {
    const visible = entries.some(entry => entry.isIntersecting);
    guide.classList.toggle('lpsr-campaign-guide--offstage', visible);
  });
  observer.observe(hero);
})();
