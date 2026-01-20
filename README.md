# Supplements App

🚧 **The project is currently under active development**  

A full-stack application for a supplements encyclopedia, built with a modern and feature-rich tech stack.  
Frontend deployed on **Vercel**: [mysupps.vercel.app](https://mysupps.vercel.app/)  
Backend deployed on **Render**: [supplements-server.onrender.com](https://supplements-server.onrender.com)

---

## ⚡️ Tech Stack

### Backend
- **TypeScript, Node.js, NestJS**
- **PostgreSQL + Prisma** (ORM, migrations)
- **Redis(Upstash)**
- **REST API**
- **GraphQL (NestJS GraphQL)** - implemented for Supplement and User entities (demo purposes)
- **WebSockets (Socket.io)**
- **JWT authentication & authorization**
- **Google OAuth 2.0 + Passport**
- **bcrypt** (password hashing)
- **Transactional Outbox Pattern** (integration events)
- **Background jobs (NestJS Schedule / Cron)**
- **Email service: Resend**
- **React Email** (email templates)
- Documentation: **Swagger** ([/api](https://supplements-server.onrender.com/api))
- Monitoring: **Prometheus + Grafana**
- Testing: **Postman**
- Hosting: **Render**

### Frontend
- **TypeScript, React, Redux Toolkit (RTK Query), React Router**
- **React Hook Form + Zod** (forms and validation)
- **Tailwind CSS** with custom feature-first tokens (light/dark themes)
- **Framer Motion** (animations)
- **Axios, Vite**
- **Responsive design**
- Hosting: **Vercel**

---

## 🔑 Implemented Features

### Backend
- JWT-based authentication:
  - `POST /auth/register`  
  - `POST /auth/login`  
  - `GET /auth/profile`  
  - `POST /auth/logout`  
- Google OAuth 2.0 authentication (Passport Strategy). Testing mode - only pre-approved emails are allowed:
  - `GET /auth/google` - redirect user to Google OAuth consent screen
  - `GET /auth/google/callback` - google OAuth callback
  - `POST /auth/google-verify` – verify Google auth code
- Password hashing with bcrypt
- Transactional Outbox pattern with background processor (`EVERY_30_SECONDS`) for reliable integration events handling.
- USER_REGISTERED event handler with decoupled EmailService (Resend) and React Email welcome template (dev mode, pre-approved recipient only).
- Supplement module:
  - `GET /supplements` – get all supplements  
  - `GET /supplements/:id` – get supplement details  
  - `PATCH /users/favorites/:id` – toggle supplement in favorites (for **authorized users only**)
- Prisma schema + migrations synced with PostgreSQL (Neon)
- API documentation available via Swagger
- WebSocket gateway to broadcast active supplement viewers in realtime
- GraphQL API (demo):
  - Supplement type + resolvers
  - User type + resolvers
  - Queries & mutations for demo usage
- Redis (Upstash) as an in-memory cache layer for the supplements lis
- Application metrics monitoring via Prometheus + Grafana

### Frontend
- Routing with `RestrictedRoute`, `PrivateRoute`, and modal overlay routes
- Context + Local Storage for theme persistence (light/dark mode)
- Custom Tailwind CSS tokens for styling
- Registration & login forms with validation (React Hook Form + Zod)
- Animations powered by Framer Motion
- Supplements search page
- Mobile burger menu
- User dropdown with profile info
- Favorites functionality: integrated with RTK Query to toggle supplements in favorites. The heart icon and favorites list are available only for authorized users
- Real-time view counters for supplements using a global Socket.io hook (`useLiveViewers`).

---

## 🐳 Docker Setup
- **Dockerfile** for frontend  
- **Dockerfile** for backend  
- **docker-compose.postgres.yml** for local PostgreSQL environment  
- **docker-compose.yml** for full application stack deployment (frontend + backend + database)

---

## 🚀 Deployment
- Frontend: [Vercel](https://mysupps.vercel.app)  
- Backend: [Render](https://supplements-server.onrender.com)  
