import { Router } from 'express';
import { requireAuth, requireRoles } from '../../middleware/auth.js';
import { platformState } from '../../core/domain/platformState.js';
import { eventBus } from '../../core/events/eventBus.js';

const router = Router();

router.get('/status', (_req, res) => {
  res.json({ module: 'iot', status: 'ready', phase: 'hybrid-modular-monolith' });
});

router.post('/ingest/machines/:machineId', requireAuth, requireRoles('admin', 'iot-engineer'), (req, res) => {
  const patch = {
    status: req.body?.status,
    oee: req.body?.oee,
    temperature: req.body?.temperature,
    vibration: req.body?.vibration
  };

  const updated = platformState.updateMachineState(req.params.machineId, patch);
  if (!updated) return res.status(404).json({ message: 'machine not found' });

  eventBus.emitDomainEvent('ui.broadcast', { type: 'machine.updated', machine: updated });
  return res.json(updated);
});

export const iotModule = { basePath: '/iot', router };
