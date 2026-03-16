const routes = [
  ['dashboard', 'Dashboard'],
  ['quality', 'Quality'],
  ['spc', 'SPC'],
  ['iot', 'IoT'],
  ['ai', 'AI'],
  ['builder', 'Builder'],
  ['reports', 'Reports'],
  ['admin', 'Admin']
];

export function mountNav() {
  if (document.querySelector('.top-nav')) return;
  const nav = document.createElement('nav');
  nav.className = 'top-nav';
  nav.innerHTML = routes.map(([slug, label]) => `<a href="#/${slug}" data-route="${slug}">${label}</a>`).join('');
  document.body.prepend(nav);
}

export function highlightRoute(routeName) {
  document.querySelectorAll('.top-nav a').forEach((el) => {
    el.classList.toggle('active', el.dataset.route === routeName);
  });
}
