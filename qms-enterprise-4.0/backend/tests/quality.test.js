import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app/createApp.js';
import { tokenService } from '../src/services/tokenService.js';

const noopAudit = { log() {} };

test('quality machines endpoint returns seeded digital twin records', async () => {
  const app = createApp({ auditLogger: noopAudit });
  const server = app.listen(0);
  const { port } = server.address();
  const accessToken = tokenService.issueAccessToken('tester', { role: 'admin', plantId: 'plant-1' });

  const response = await fetch(`http://127.0.0.1:${port}/api/quality/plants/plant-1/machines`, {
    headers: { authorization: `Bearer ${accessToken}` }
  });
  const payload = await response.json();
  server.close();

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(payload.machines));
  assert.ok(payload.machines.length >= 3);
});
