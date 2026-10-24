(() => {
  const guide = document.querySelector('.lpsr-campaign-concierge');
  const anchor = document.querySelector('[data-campaign-guide-anchor]');
  if (!guide || !anchor) return;
  const speech = document.querySelector('#hero .lpsr-campaign-hero__speech');
  const svg = speech?.querySelector('svg');
  const shape = svg?.querySelector('[data-campaign-speech-shape]');

  // Match the approved hero placement once, then keep that viewport position
  // through scrolling. Resize observations keep the responsive layout aligned.
  const place = () => {
    const box = anchor.getBoundingClientRect();
    guide.style.setProperty('--campaign-guide-width', `${box.width}px`);
    guide.style.setProperty('--campaign-guide-right', `${Math.max(12, innerWidth - box.right)}px`);
    guide.style.setProperty('--campaign-guide-bottom', `${Math.max(12, innerHeight - box.bottom - scrollY)}px`);

    // Aim the balloon at the character's face in the SVG's own coordinates.
    const matrix = svg?.getScreenCTM();
    if (!shape || !matrix) return;
    const mouth = new DOMPoint(box.left + box.width * .2, box.top + box.height * .25)
      .matrixTransform(matrix.inverse());
    const angle = Math.atan2((mouth.y - 120) / 106, (mouth.x - 200) / 175);
    const edge = a => ({ x: 200 + 175 * Math.cos(a), y: 120 + 106 * Math.sin(a) });
    const base = edge(angle);
    const dx = mouth.x - base.x;
    const dy = mouth.y - base.y;
    const distance = Math.hypot(dx, dy);
    // Keep a short triangle with a sharp tip; no thick stroke rounds its end.
    const reach = Math.min(distance, 42) / Math.max(distance, .001);
    const tip = { x: base.x + dx * reach, y: base.y + dy * reach };
    const point = p => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
    shape.setAttribute('d', `M${point(edge(angle - .13))}A175 106 0 1 0 ${point(edge(angle + .13))}L${point(tip)}Z`);
    speech.classList.toggle('is-tail-up', angle < 0);
  };
  place();
  window.addEventListener('resize', place, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(place).observe(anchor.closest('#hero'));
})();
