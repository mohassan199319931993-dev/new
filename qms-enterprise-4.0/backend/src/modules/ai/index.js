import { Router } from 'express';

const router = Router();
router.get('/status', (_req, res) => {
  res.json({ module: 'ai', status: 'ready', phase: 'hybrid-modular-monolith' });
});

export const aiModule = { basePath: '/ai', router };
