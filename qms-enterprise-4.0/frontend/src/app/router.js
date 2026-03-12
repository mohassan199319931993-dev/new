import { renderDashboard } from '../components/dashboard.js';
import { renderAdminPage, renderAiPage, renderBuilderPage, renderIotPage, renderQualityPage, renderReportsPage, renderSpcPage } from '../components/pages.js';
import { highlightRoute } from '../components/layout.js';

const renderers = {
  dashboard: renderDashboard,
  quality: renderQualityPage,
  spc: renderSpcPage,
  iot: renderIotPage,
  ai: renderAiPage,
  builder: renderBuilderPage,
  reports: renderReportsPage,
  admin: renderAdminPage
};

export function createRouter(root, store) {
  function currentRoute() {
    const hash = window.location.hash || '#/dashboard';
    return hash.replace('#/', '') || 'dashboard';
  }

  function render() {
    const route = currentRoute();
    const renderer = renderers[route];

    if (renderer) {
      renderer(root, store.getState());
      highlightRoute(route);
      return;
    }

    root.innerHTML = `<main class="panel glass"><h1>Route not found</h1><p>${route}</p></main>`;
  }

  return {
    start() {
      window.addEventListener('hashchange', render);
      render();
    },
    refresh() {
      render();
    }
  };
}
