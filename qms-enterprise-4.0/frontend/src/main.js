import { createRouter } from './app/router.js';
import { createStore } from './app/store.js';
import { initImmersiveScene } from './engine3d/scene.js';
import { fetchAlerts, fetchMachines, issueDemoToken, openRealtime } from './utils/api.js';
import { mountNav } from './components/layout.js';

const app = document.getElementById('app');
const store = createStore();
const router = createRouter(app, store);

mountNav();
initImmersiveScene(document.body, store);
router.start();
store.subscribe(() => router.refresh());

bootstrap().catch((err) => {
  console.warn('bootstrap failed, running in demo-only mode', err.message);
  store.set({ connectionStatus: 'demo-mode' });
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/public/sw.js').catch(console.warn);
}

async function bootstrap() {
  const auth = await issueDemoToken();
  const [machines, alerts] = await Promise.all([fetchMachines(auth.accessToken), fetchAlerts(auth.accessToken)]);
  store.set({ machines, alerts, connectionStatus: 'live-connected' });

  openRealtime((event) => {
    if (event.type === 'machine.updated') {
      const next = store.getState().machines.map((m) => (m.id === event.machine.id ? event.machine : m));
      store.set({ machines: next });
    }

    if (event.type === 'spc.alert') {
      store.set({ alerts: [event.alert, ...store.getState().alerts] });
    }
  });
}
