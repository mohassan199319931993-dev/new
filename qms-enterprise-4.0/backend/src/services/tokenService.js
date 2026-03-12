import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const tokenService = {
  issueAccessToken(subject, claims = {}) {
    return jwt.sign({ ...claims }, env.jwtSecret, {
      subject,
      expiresIn: env.jwtExpiresIn,
      issuer: 'qms-enterprise-4.0'
    });
  },
  issueRefreshToken(subject) {
    return jwt.sign({}, env.jwtRefreshSecret, {
      subject,
      expiresIn: env.jwtRefreshExpiresIn,
      issuer: 'qms-enterprise-4.0'
    });
  },
  verifyAccessToken(token) {
    return jwt.verify(token, env.jwtSecret);
  }
};
