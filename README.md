# Supplements App

🚧 **The project is currently under active development**  

A full-stack application for a supplements encyclopedia, built with a modern and feature-rich tech stack.  
Frontend deployed on **Vercel**: [mysupps.vercel.app](https://mysupps.vercel.app/)  
Backend deployed on **Render**: [supplements-server.onrender.com](https://supplements-server.onrender.com)

---

## ⚡️ Tech Stack

### Frontend
- **TypeScript, React, Redux Toolkit, React Router**
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
- **JWT authentication & authorization**
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

### Backend
- JWT-based authentication:
  - `POST /auth/register`  
  - `POST /auth/login`  
  - `GET /auth/profile`  
  - `POST /auth/logout`  
- Password hashing with bcrypt
- Prisma schema + migrations synced with PostgreSQL (Neon)
- API documentation available via Swagger

---

## 🚀 Deployment
- Frontend: [Vercel](https://mysupps.vercel.app)  
- Backend: [Render](https://supplements-server.onrender.com)  
