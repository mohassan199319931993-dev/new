import http from 'node:http';
import { createApp } from './app/createApp.js';
import { env } from './config/env.js';
import { attachSocketServer } from './ws/socketServer.js';
import { eventBus } from './core/events/eventBus.js';
import { JobEngine } from './core/jobs/jobEngine.js';
import { WebhookService } from './core/webhooks/webhookService.js';
import { auditLogger } from './services/auditLogger.js';

const app = createApp({ auditLogger });
const server = http.createServer(app);
attachSocketServer(server, eventBus);

const jobs = new JobEngine();
const webhookService = new WebhookService();

jobs.register('system.pulse', async () => {
  eventBus.emitDomainEvent('ui.broadcast', { component: 'factory-floor', status: 'operational' });
  await webhookService.dispatch('system.pulse', { uptime: process.uptime() });
}, 30_000);
jobs.startAll();

server.listen(env.port, () => {
  console.info(`QMS backend listening on :${env.port}`);
});
