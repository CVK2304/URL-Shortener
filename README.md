@'
# URL Shortener

This repository contains a URL Shortener project with:

- `backend/` — Node.js + Express backend (Sequelize + MySQL). Dockerized.
- `frontend/` — Vite + React frontend.

**Local run (dev)**:
- Backend: `docker-compose up --build` (runs MySQL + backend)
- Frontend: `cd frontend && npm install && npm run dev`

**Notes**
- Do NOT commit `.env` (contains credentials).
- Use `.env.example` to document required variables.
'@ > README.md
