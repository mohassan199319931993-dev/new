import { Router } from 'express';
import { requireAuth, requireRoles, requirePlantAccess } from '../../middleware/auth.js';
import { platformState } from '../../core/domain/platformState.js';
import { eventBus } from '../../core/events/eventBus.js';
import { auditLogger } from '../../services/auditLogger.js';

const router = Router();

router.get('/status', (_req, res) => {
  res.json({ module: 'quality', status: 'ready', phase: 'hybrid-modular-monolith' });
});

router.get('/plants/:plantId/machines', requireAuth, requirePlantAccess('plantId'), (req, res) => {
  res.json({ plantId: req.params.plantId, machines: platformState.listMachines() });
});

router.get('/plants/:plantId/capa', requireAuth, requirePlantAccess('plantId'), (_req, res) => {
  res.json({ items: platformState.listCapa() });
});

router.post('/plants/:plantId/capa', requireAuth, requireRoles('admin', 'quality-manager'), requirePlantAccess('plantId'), (req, res) => {
  const payload = {
    plantId: req.params.plantId,
    machineId: req.body?.machineId,
    title: req.body?.title,
    severity: req.body?.severity || 'medium',
    owner: req.user.role
  };

  if (!payload.machineId || !payload.title) {
    return res.status(400).json({ message: 'machineId and title are required' });
  }

  const record = platformState.createCapa(payload);
  eventBus.emitDomainEvent('ui.broadcast', { type: 'capa.created', record });
  auditLogger.log({ action: 'quality.capa.create', actor: req.user.sub, capaId: record.id, plantId: payload.plantId });
  return res.status(201).json(record);
});

export const qualityModule = { basePath: '/quality', router };
