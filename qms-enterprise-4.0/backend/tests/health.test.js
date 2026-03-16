import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app/createApp.js';

const noopAudit = { log() {} };

test('health endpoint returns ok', async () => {
  const app = createApp({ auditLogger: noopAudit });
  const server = app.listen(0);
  const { port } = server.address();
  const response = await fetch(`http://127.0.0.1:${port}/health`);
  const json = await response.json();
  server.close();

  assert.equal(response.status, 200);
  assert.equal(json.status, 'ok');
});
