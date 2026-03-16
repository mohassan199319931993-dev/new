import { Router } from 'express';

const router = Router();
router.get('/status', (_req, res) => {
  res.json({ module: 'admin', status: 'ready', phase: 'hybrid-modular-monolith' });
});

export const adminModule = { basePath: '/admin', router };
