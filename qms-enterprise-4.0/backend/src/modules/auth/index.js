import { Router } from 'express';
import { tokenService } from '../../services/tokenService.js';

const router = Router();

router.post('/token', (req, res) => {
  const { userId = 'demo-user', role = 'admin', plantId = 'plant-1', scope = 'plant' } = req.body || {};
  const claims = { role, plantId, scope };
  const accessToken = tokenService.issueAccessToken(userId, claims);
  const refreshToken = tokenService.issueRefreshToken(userId);
  res.json({ accessToken, refreshToken, tokenType: 'Bearer', claims });
});

export const authModule = { basePath: '/auth', router };
