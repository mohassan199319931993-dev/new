import crypto from 'node:crypto';

export function errorHandler(err, req, res, _next) {
  const traceId = req.headers['x-trace-id'] || crypto.randomUUID();
  console.error('[ERROR]', { traceId, message: err.message, stack: err.stack });
  return res.status(500).json({ message: 'Unexpected server error', traceId });
}
