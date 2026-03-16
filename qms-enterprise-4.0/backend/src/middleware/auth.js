import { tokenService } from '../services/tokenService.js';

export function requireAuth(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing bearer token' });
  }

  try {
    req.user = tokenService.verifyAccessToken(authorization.slice(7));
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function requireRoles(...roles) {
  return (req, res, next) => {
    const userRole = req.user?.role || 'viewer';
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden by RBAC policy' });
    }
    return next();
  };
}

export function requirePlantAccess(paramKey = 'plantId') {
  return (req, res, next) => {
    const requestedPlant = req.params[paramKey] || req.query[paramKey] || req.body?.[paramKey];
    if (!requestedPlant || requestedPlant === req.user?.plantId || req.user?.scope === 'global') {
      return next();
    }
    return res.status(403).json({ message: 'Forbidden by ABAC plant policy' });
  };
}
