# Mini User Management System  
**Backend Developer Intern Assessment – Purple Merit Technologies (December 2025)**

---

## 📌 Project Overview
This project is a full-stack **Mini User Management System** built as part of the **Backend Developer Intern Assessment** for **Purple Merit Technologies**.  
The application provides secure authentication, role-based authorization (RBAC), and complete user lifecycle management with a clean, production-ready architecture.

The system demonstrates strong backend fundamentals including authentication flows, API security, validation, database modeling, and deployment practices.

---

## 🧰 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- JWT (Access & Refresh Tokens)
- bcrypt (password hashing)
- Jest (unit testing)

### Frontend
- React (Hooks)
- Axios
- Role-based protected routes
- Client-side form validation

### DevOps / Infrastructure
- Docker & Docker Compose (local orchestration)
- MongoDB Atlas (cloud database)
- Render (backend deployment)
- Vercel (frontend deployment)

---

## 🐳 Dockerized Setup (Bonus)

### Services
- Backend (Node + Express)
- Frontend (React)
- MongoDB (containerized for local dev)

### Run Locally
```bash
docker compose up --build
```

- Frontend: http://localhost:3000  
- Backend: http://localhost:4000/api/v1  

---

## ⚙️ Environment Variables

### Backend
```
PORT
DB_URI
ACCESS_TOKEN_SECRET
ACCESS_TOKEN_EXPIRY
REFRESH_TOKEN_SECRET
REFRESH_TOKEN_EXPIRY
FRONTEND_URL
```

### Frontend
```
NEXT_PUBLIC_API_URL
```

> ⚠️ Actual secret values are excluded from the repository.

---

## 🚀 Deployment

- **Frontend**: Deployed on Vercel  
- **Backend**: Deployed on Render  
- **Database**: MongoDB Atlas (cloud-hosted)

All live URLs are listed in the repository and README.

---

## 📦 Deliverables Achieved

✅ Public GitHub repository (frontend + backend)  
✅ Cloud-hosted database (MongoDB Atlas)  
✅ Live backend deployment (Render)  
✅ Live frontend deployment (Vercel)  
✅ JWT-based authentication & RBAC  
✅ Admin & user dashboards  
✅ Unit tests for backend logic  
✅ Complete README documentation  

---

## ⭐ Extra / Bonus Deliverables

- Dockerized frontend & backend
- Docker Compose orchestration
- Refresh-token based auth design
- Centralized error adapter
- Repository & service layer abstraction
- Postman automation scripts

---

## 🎥 Walkthrough Video
A 3–5 minute screen-recorded walkthrough demonstrating:
- Authentication & RBAC
- Admin user management
- Profile updates
- API testing via Postman
- Live deployed application

(Video link included in submission email)

---


## ✨ Core Features

### 🔐 Authentication
- User signup (full name, email, password)
- Email format & password strength validation
- JWT issued on signup & login
- Secure refresh-token flow using HTTP-only cookies
- Logout functionality
- Fetch current logged-in user

### 👤 User Features
- View own profile
- Update name & email
- Change password
- Protected routes for authenticated users

### 🛠 Admin Features
- View all users with pagination
- Activate / deactivate user accounts
- Role-based access enforcement (Admin-only APIs)

---

## 🔒 Security Measures
- Password hashing using bcrypt
- JWT-based authentication (access + refresh tokens)
- Role-based access control (RBAC)
- Input validation on all endpoints
- Centralized error handling
- Proper HTTP status codes
- CORS configuration with credentials
- Sensitive data managed via environment variables

---

## 🗄 Database Schema (User)

| Field | Description |
|------|------------|
| email | Unique user email |
| password | Hashed password |
| fullName | User’s full name |
| role | ADMIN / USER |
| status | ACTIVE / INACTIVE |
| createdAt | Auto-managed timestamp |
| updatedAt | Auto-managed timestamp |
| lastLogin | Last login time |

---

## 📡 API Documentation
- Postman Collection included
- OpenAPI / Swagger specification provided
- Example request & response payloads documented

---

## 🧪 Testing
- Unit tests for backend services & authentication logic using Jest
- Bonus: service-level and integration-ready test structure

---

## 👤 Author
**Mohammad Atif**  
Backend Developer Intern Assessment  
December 2025
