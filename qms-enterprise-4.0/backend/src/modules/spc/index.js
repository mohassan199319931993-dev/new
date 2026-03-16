import { Router } from 'express';
import { requireAuth, requireRoles, requirePlantAccess } from '../../middleware/auth.js';
import { platformState } from '../../core/domain/platformState.js';
import { eventBus } from '../../core/events/eventBus.js';

const router = Router();

router.get('/status', (_req, res) => {
  res.json({ module: 'spc', status: 'ready', phase: 'hybrid-modular-monolith' });
});

router.get('/plants/:plantId/alerts', requireAuth, requirePlantAccess('plantId'), (_req, res) => {
  res.json({ items: platformState.listSpcAlerts() });
});

router.post('/plants/:plantId/alerts', requireAuth, requireRoles('admin', 'quality-manager'), requirePlantAccess('plantId'), (req, res) => {
  const payload = {
    chart: req.body?.chart || 'Xbar',
    machineId: req.body?.machineId,
    message: req.body?.message,
    level: req.body?.level || 'warning',
    plantId: req.params.plantId
  };

  if (!payload.machineId || !payload.message) {
    return res.status(400).json({ message: 'machineId and message are required' });
  }

  const alert = platformState.pushSpcAlert(payload);
  eventBus.emitDomainEvent('ui.broadcast', { type: 'spc.alert', alert });
  return res.status(201).json(alert);
});

export const spcModule = { basePath: '/spc', router };
