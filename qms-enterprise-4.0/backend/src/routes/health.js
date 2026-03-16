import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'qms-enterprise-backend',
    timestamp: new Date().toISOString()
  });
});
