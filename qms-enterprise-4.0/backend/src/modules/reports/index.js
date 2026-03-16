import { Router } from 'express';

const router = Router();
router.get('/status', (_req, res) => {
  res.json({ module: 'reports', status: 'ready', phase: 'hybrid-modular-monolith' });
});

export const reportsModule = { basePath: '/reports', router };
