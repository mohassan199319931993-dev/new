# QMS Enterprise 4.0 — Immersive Industrial Operating System

Production-oriented enterprise scaffold for a Quality 4.0 SaaS platform with immersive UI, modular backend architecture, and industrial integration readiness.

## Highlights
- Hybrid modular monolith architecture with microservices-ready boundaries.
- Express + PostgreSQL + Redis backend baseline.
- Security baseline: JWT/refresh token flow, RBAC/ABAC-ready hooks, rate limiting, immutable audit logger.
- Event-driven ready core via internal event bus + WebSocket broadcaster.
- Frontend SPA shell with responsive dashboard, immersive industrial styling, and live machine/SPC feed wiring.
- Dockerized local environment for frontend, backend, Postgres, and Redis.

## Structure
```
/qms-enterprise-4.0
  /core
  /modules
  /builder
  /ai
  /iot
  /spc
  /3d-engine
  /ui-engine
  /reports
  /admin
  /frontend
  /backend
  docker-compose.yml
  README.md
  INSTALLATION_GUIDE.md
```


## Implemented Runtime APIs
- `POST /api/auth/token` issue access + refresh tokens with role/plant scope claims.
- `GET /api/quality/plants/:plantId/machines` list digital-twin machine states.
- `GET /api/quality/plants/:plantId/capa` and `POST /api/quality/plants/:plantId/capa` for CAPA queue lifecycle.
- `GET /api/spc/plants/:plantId/alerts` and `POST /api/spc/plants/:plantId/alerts` for SPC alerting.
- `POST /api/iot/ingest/machines/:machineId` to ingest sensor/line updates and broadcast realtime events.

## Quick Start
1. Copy `.env.example` and adjust secrets for your environment.
2. Start full stack:
   ```bash
   docker compose up --build
   ```
3. API health check:
   ```bash
   curl http://localhost:8080/health
   ```
4. Open app at `http://localhost:5173`.

## Delivery Scope
This repository provides a production-grade foundation and reference implementation for core platform concerns. Domain modules include complete starter boundaries and extension points for deep enterprise customization.

## GitHub Pages
If GitHub Pages is enabled for this repository root, `index.html` and `404.html` are provided at the repository top level to prevent the default 404 error page and route users to a valid entry point.
