export function initImmersiveScene(target, store) {
  const aura = document.createElement('div');
  aura.className = 'immersive-bg';
  aura.setAttribute('aria-hidden', 'true');
  target.prepend(aura);

  const { performanceMode } = store.getState();
  aura.dataset.mode = performanceMode;

  window.addEventListener('scroll', () => {
    const ratio = Math.min(window.scrollY / 800, 1);
    aura.style.setProperty('--scroll-depth', ratio.toFixed(3));
  });
}
