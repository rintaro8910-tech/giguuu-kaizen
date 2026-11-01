(() => {
  'use strict';
  const section = document.getElementById('telemo-cases');
  const track = section?.querySelector('.lpsr-cases-scroll');
  if (!track) return;

  const mobile = matchMedia('(max-width: 600px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const update = () => {
    track.tabIndex = mobile.matches ? 0 : -1;
    track.setAttribute('aria-label', mobile.matches ? '活用シーンを横にスクロール' : '活用シーン');
  };
  update();
  mobile.addEventListener('change', update);

  track.addEventListener('keydown', event => {
    if (!mobile.matches || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const behavior = reducedMotion.matches ? 'instant' : 'smooth';
    if (event.key === 'Home' || event.key === 'End') {
      track.scrollTo({left: event.key === 'Home' ? 0 : track.scrollWidth, behavior});
      return;
    }
    const card = track.querySelector('.telemo-cases__card');
    const step = card.getBoundingClientRect().width + 12;
    track.scrollBy({left: event.key === 'ArrowRight' ? step : -step, behavior});
  });
})();
