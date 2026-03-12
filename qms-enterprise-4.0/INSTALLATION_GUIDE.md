# Installation Guide

## Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local non-docker workflow)

## Docker Installation
```bash
cd qms-enterprise-4.0
docker compose up --build
```

## Local Development
### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Production Hardening Checklist
- Rotate all JWT/API secrets.
- Configure TLS and HSTS at edge/load balancer.
- Enforce database backups + PITR.
- Enable SIEM export for audit events.
- Configure IP restriction and device policy in admin module.
- Configure observability stack (metrics/logging/tracing).
