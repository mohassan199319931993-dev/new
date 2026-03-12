import { Router } from 'express';

const router = Router();
router.get('/status', (_req, res) => {
  res.json({ module: 'builder', status: 'ready', phase: 'hybrid-modular-monolith' });
});

export const builderModule = { basePath: '/builder', router };
