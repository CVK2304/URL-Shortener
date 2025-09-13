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

**Usage**
- Open the frontend (http://localhost:3000)
- Paste any long URL into the input box
- Get a shortened URL and share it
- Visit the shortened link → It will redirect to the original URL

**API Endpoints**
Method	   Endpoint	      Description
POST ->	 /api/shorten ->	Create a short URL
GET	 ->   /:code      ->  Redirect to original URL
