// TELEMO LP の登場の動き。#hero とミニ社長には触らない。
// 動きは 1 セクションにつき 1 つ、一度だけ。文言や数字は書き換えない。
// 動かすのは opacity / clip-path / 個別の translate・scale だけで、既存の transform やホバーと競合しない。
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;

  const root = document.documentElement;
  const ARMED = 'lpsr-motion-armed';
  const EASE = 'cubic-bezier(.22,1,.36,1)';
  const DURATION = 480;
  const STAGGER = 50;

  // 中心の点から、角を落とした形に開いて矩形へ戻る
  const opening = () => ({
    clipPath: [
      'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)',
      'polygon(22% 0, 100% 0, 100% 66%, 82% 100%, 0 100%, 0 40%)',
      'polygon(0 0, 100% 0, 100% 66%, 100% 100%, 0 100%, 0 0)',
    ],
    offset: [0, .74, 1],
  });
  const shift = (x, y = 0) => ({ opacity: [0, 1], translate: [`${x}px ${y}px`, '0 0'] });
  const coreCard = element => {
    if (innerWidth <= 600) return shift(0, 10);
    return shift(element.matches(':nth-of-type(odd)') ? -18 : 18);
  };

  // [対象, 動き]。同じ組の要素が同時に画面へ入ると 0.05 秒ずつずれて出る。
  const groups = [
    ['.founder__photo', opening],
    ['.telemo-how__grid li', () => shift(0, 14)],
    ['.telemo-cases__card', () => ({ opacity: [0, 1], scale: [.97, 1] })],
    ['.telemo-compare__card--human', () => shift(-20)],
    ['.telemo-compare__card--ai', () => shift(20)],
    ['.telemo-benefits__card', coreCard],
    ['.telemo-support__step', () => shift(-10)],
  ];

  const pending = new Map();
  const animations = [];
  const reveal = element => {
    pending.delete(element);
    element.classList.remove(ARMED);
    observer?.unobserve(element);
  };
  const play = (element, frames, order) => {
    reveal(element);
    try {
      animations.push(element.animate(frames(element), { duration: DURATION, delay: order * STAGGER, easing: EASE, fill: 'backwards' }));
    } catch (_) {
      // 動かなくても内容は表示済み。
    }
  };

  // アンカー移動中に通過・着地する要素は、動かさずにすぐ読めるようにする
  let navigating = false;
  let navTimer;
  const startNavigation = () => {
    navigating = true;
    clearTimeout(navTimer);
    navTimer = setTimeout(() => { navigating = false; }, 1600);
  };

  let observer;
  let scrubObserver;
  const stopAll = () => {
    observer?.disconnect();
    scrubObserver?.disconnect();
    animations.forEach(animation => animation.cancel());
    pending.forEach((_, element) => element.classList.remove(ARMED));
    pending.clear();
    root.classList.remove('lpsr-motion-ready');
    scrubActive = false;
    cancelAnimationFrame(scrubFrame);
    scrubFrame = 0;
    if (photo) photo.style.scale = '';
    window.removeEventListener('scroll', requestScrub);
  };

  // スクロール連動はこの 1 か所だけ。枠の中心が画面中央に来たら元の大きさで止まる。
  const frame = document.querySelector('.telemo-support-redesign__photo');
  const photo = frame?.querySelector('img');
  let scrubActive = false;
  let scrubFrame = 0;
  const updateScrub = () => {
    scrubFrame = 0;
    if (!scrubActive || !photo) return;
    const box = frame.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (innerHeight - box.top) / ((innerHeight + box.height) / 2)));
    photo.style.scale = progress >= 1 ? '' : String(1 + .1 * (1 - progress));
  };
  const requestScrub = () => { scrubFrame ||= requestAnimationFrame(updateScrub); };

  root.classList.add('lpsr-motion-ready');
  groups.forEach(([selector, frames], index) => {
    document.querySelectorAll(selector).forEach(element => {
      element.classList.add(ARMED);
      pending.set(element, { frames, index });
    });
  });

  observer = new IntersectionObserver(entries => {
    const counts = new Map();
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const item = pending.get(entry.target);
      if (!item) return;
      // 上から入ってきたものとアンカーの着地先は、動かさない
      if (navigating || entry.boundingClientRect.top < -40) { reveal(entry.target); return; }
      const order = counts.get(item.index) ?? 0;
      counts.set(item.index, order + 1);
      play(entry.target, item.frames, order);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });
  pending.forEach((_, element) => observer.observe(element));

  if (frame && photo) {
    scrubObserver = new IntersectionObserver(entries => {
      scrubActive = entries.some(entry => entry.isIntersecting);
      if (!scrubActive) photo.style.scale = '';
      requestScrub();
    });
    scrubObserver.observe(frame);
    window.addEventListener('scroll', requestScrub, { passive: true });
  }

  const settle = event => {
    for (let element = event.target; element && element !== document.body; element = element.parentElement) {
      if (pending.has(element)) reveal(element);
    }
  };
  if (location.hash) startNavigation();
  window.addEventListener('hashchange', startNavigation);
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href^="#"]');
    if (link && link.getAttribute('href').length > 1) startNavigation();
  }, true);
  window.addEventListener('scrollend', () => {
    if (!navigating) return;
    clearTimeout(navTimer);
    navTimer = setTimeout(() => { navigating = false; }, 120);
  });
  document.addEventListener('focusin', settle);
  document.addEventListener('pointerdown', settle, { passive: true });
  window.addEventListener('beforeprint', () => [...pending.keys()].forEach(reveal));
  reduce.addEventListener('change', event => { if (event.matches) stopAll(); });
})();
