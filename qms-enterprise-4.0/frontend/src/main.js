import { createRouter } from './app/router.js';
import { createStore } from './app/store.js';
import { initImmersiveScene } from './engine3d/scene.js';
import { fetchAlerts, fetchMachines, issueDemoToken } from './utils/api.js';

const app = document.getElementById('app');
const store = createStore();
const router = createRouter(app, store);

initImmersiveScene(document.body, store);
router.start();
store.subscribe(() => router.refresh());

bootstrap().catch((err) => {
  console.warn('bootstrap failed, running in demo-only mode', err.message);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/public/sw.js').catch(console.warn);
}

async function bootstrap() {
  const auth = await issueDemoToken();
  const [machines, alerts] = await Promise.all([fetchMachines(auth.accessToken), fetchAlerts(auth.accessToken)]);
  store.set({ machines, alerts });

  const ws = new WebSocket('ws://localhost:8080/ws');
  ws.onmessage = (msg) => {
    const payload = JSON.parse(msg.data);
    if (payload.type !== 'event' || !payload.event?.payload) return;

    const event = payload.event.payload;
    if (event.type === 'machine.updated') {
      const next = store.getState().machines.map((m) => (m.id === event.machine.id ? event.machine : m));
      store.set({ machines: next });
    }

    if (event.type === 'spc.alert') {
      store.set({ alerts: [event.alert, ...store.getState().alerts] });
    }
  };
}
