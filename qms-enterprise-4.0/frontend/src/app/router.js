import { renderDashboard } from '../components/dashboard.js';

export function createRouter(root, store) {
  function render() {
    const route = window.location.pathname;
    if (route === '/' || route === '/dashboard') {
      renderDashboard(root, store.getState());
      return;
    }

    root.innerHTML = `<main class="panel"><h1>Route not found</h1><p>${route}</p></main>`;
  }

  return {
    start() {
      window.addEventListener('popstate', render);
      render();
    },
    refresh() {
      render();
    }
  };
}
