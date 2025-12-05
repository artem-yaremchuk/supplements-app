# Supplements App

🚧 **The project is currently under active development**  

A full-stack application for a supplements encyclopedia, built with a modern and feature-rich tech stack.  
Frontend deployed on **Vercel**: [mysupps.vercel.app](https://mysupps.vercel.app/)  
Backend deployed on **Render**: [supplements-server.onrender.com](https://supplements-server.onrender.com)

---

## ⚡️ Tech Stack

### Frontend
- **TypeScript, React, Redux Toolkit (RTK Query), React Router**
- **React Hook Form + Zod** (forms and validation)
- **Tailwind CSS** with custom feature-first tokens (light/dark themes)
- **Framer Motion** (animations)
- **Axios, Vite**
- **Responsive design**
- Hosting: **Vercel**

### Backend
- **TypeScript, Node.js, NestJS**
- **PostgreSQL + Prisma** (ORM, migrations)
- **REST API**
- **WebSockets (Socket.io)**
- **JWT authentication & authorization**
- **Google OAuth 2.0 + Passport**
- **bcrypt** (password hashing)
- Documentation: **Swagger** ([/api](https://supplements-server.onrender.com/api))
- Testing: **Postman**
- Hosting: **Render**

---

## 🔑 Implemented Features

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

### Backend
- JWT-based authentication:
  - `POST /auth/register`  
  - `POST /auth/login`  
  - `GET /auth/profile`  
  - `POST /auth/logout`  
- Google OAuth 2.0 authentication (Passport Strategy):
  - `GET /auth/google` - redirect user to Google OAuth consent screen
  - `GET /auth/google/callback` - google OAuth callback
  - `POST /auth/google-verify` – verify Google auth code
- Password hashing with bcrypt
- Supplement module:
  - `GET /supplements` – get all supplements  
  - `GET /supplements/:id` – get supplement details  
  - `PATCH /users/favorites/:id` – toggle supplement in favorites (for **authorized users only**)
- Prisma schema + migrations synced with PostgreSQL (Neon)
- API documentation available via Swagger
- WebSocket gateway to broadcast active supplement viewers in realtime

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
