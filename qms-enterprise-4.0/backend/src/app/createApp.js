import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { env } from '../config/env.js';
import { healthRouter } from '../routes/health.js';
import { registeredModules } from '../modules/moduleRegistry.js';
import { errorHandler } from '../middleware/errorHandler.js';

export function createApp({ auditLogger }) {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.corsOrigin }));
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan('combined'));
  app.use(
    rateLimit({
      windowMs: env.rateLimitWindowMs,
      limit: env.rateLimitMax,
      standardHeaders: 'draft-7',
      legacyHeaders: false
    })
  );

  app.use('/health', healthRouter);
  registeredModules.forEach((module) => app.use(`/api${module.basePath}`, module.router));

  app.use((req, _res, next) => {
    auditLogger.log({ action: 'http.request', method: req.method, path: req.path });
    next();
  });

  app.use(errorHandler);

  return app;
}
