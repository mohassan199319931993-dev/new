import { WebSocketServer } from 'ws';
import { env } from '../config/env.js';

export function attachSocketServer(server, eventBus) {
  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (socket) => {
    socket.send(JSON.stringify({ type: 'welcome', message: 'Connected to QMS realtime bus' }));
    const heartbeat = setInterval(() => {
      socket.send(JSON.stringify({ type: 'heartbeat', ts: Date.now() }));
    }, env.wsHeartbeatMs);

    socket.on('close', () => clearInterval(heartbeat));
  });

  eventBus.on('ui.broadcast', (event) => {
    const payload = JSON.stringify({ type: 'event', event });
    wss.clients.forEach((client) => {
      if (client.readyState === 1) client.send(payload);
    });
  });

  return wss;
}
