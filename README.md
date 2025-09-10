# 📚 ASTUMSJ Library Management System

## Overview
The **ASTUMSJ Library Management System** is a full-stack MERN application built to support the ASTU Muslim Jemea Library.  
It was developed as the **final project** for the **ASTUMSJ Fullstack Summer Camp** (3 months).  

The app provides a complete solution for:
- Managing books and borrowing
- Tracking donations
- Handling student accounts
- Secure authentication & OTP verification
- Admin dashboards and analytics

👉 This project shows both **technical ability** and **team collaboration skills**. It was developed by Ammar Sabit and Hosam Adem, with the repository hosted under Hoamfi. Our collaboration exemplifies strong team dynamics: we divided tasks strategically (e.g., Ammar focusing on frontend components and UI/UX, Hosam on backend logic and database modeling), conducted regular code reviews, resolved conflicts through pair programming, and iterated based on milestone feedback. 

---

## 🚀 Deployment
- **Frontend (React)**: [Netlify Link](https://astumsj-library.netlify.app/)  
- **Backend (Express + MongoDB)**: [Render Link](https://astumsj-library-management-system-20.onrender.com)  

---

## 🛠 Tech Stack

### Backend (Node.js + Express + MongoDB + TypeScript)
- Express REST API
- MongoDB Atlas + Mongoose
- TypeScript for type safety
- JWT authentication, bcrypt password hashing
- Nodemailer for OTP email verification
- Joi & Zod validation
- Security: Helmet, CORS
- Logging: Morgan

### Frontend (React + Vite + Tailwind CSS + TypeScript)
- React + TypeScript
- Tailwind CSS (responsive UI)
- React Router for routing
- React Hook Form + Zod validation
- Axios API calls
- Recharts for analytics
- React Toastify for notifications
- PDF export with JSPDF

### Dev Tools
- Nodemon, ts-node, tsconfig-paths
- ESLint + Prettier

---

## 📂 Project Structure

### Root
- `Backend/` → Express API  
- `Frontend/` → React app  

### Backend Highlights
- `controllers/` → Business logic (students, books, donations)  
- `models/` → Mongoose schemas  
- `routes/` → REST endpoints  
- `middleware/` → Auth & role checks  
- `validators/` → Joi/Zod validation  

### Frontend Highlights
- `components/` → UI (BookCard, Header, SearchBox, etc.)  
- `pages/` → Role-based pages (`AdminPages`, `UserPages`)  
- `services/` → Axios API client  
- `ProtectedRoute.tsx` → Route guard  

---

## 🔑 Key Features

### Authentication & User Management
- Register + OTP email verification
- Secure password hashing (bcrypt)
- JWT login / protected routes
- Role-based access (Admin/User)
- Profile completion flow

### Book & Borrow Management
- Add, edit, delete books
- Borrow / return with due date tracking
- Overdue & returned status monitoring
- Search & filter books

### Donation System
- Users can donate to the library
- Admin approval/rejection workflow
- Donation history & status tracking

### Dashboards
- **Admin Dashboard**: Manage users, books, donations, pending requests, analytics (charts, reports)
- **User Dashboard**: Borrowed books, donation history, profile

### UX & UI
- Responsive (mobile & desktop)
- Form validation with `react-hook-form + zod`
- Spinners, toasts, icons for better feedback
- PDF report generation

---

## 🧩 Example Workflow

1. **Register** → User receives OTP → Verifies account  
2. **Login** → JWT issued → Used for API calls  
3. **Books** → Users borrow → Admin tracks due/returned  
4. **Donations** → Users donate → Admin approves/rejects  
5. **Dashboards** → Role-based data & charts  

---

## 💡 Soft Skills Highlighted

This project wasn’t just about coding — it shows **teamwork and real-world collaboration**:  
- **Task Division**: Clear separation of frontend (UI, UX, React) and backend (database, APIs, authentication).  
- **Code Reviews**: Regular peer reviews to maintain quality.  
- **Problem Solving**: Debugging deployment issues (Render + MongoDB Atlas), handling CORS, authentication flows.  
- **Communication**: Frequent feedback sessions, adapting designs and logic to meet goals.  
- **Ownership**: Each team member took responsibility for their modules while ensuring smooth integration.  

These soft skills mirror **professional development practices** and show readiness to work in a real software team.  

---

## 📦 Packages & Tools

### Backend
`express, mongoose, bcrypt, jsonwebtoken, nodemailer, dotenv, helmet, cors, joi, zod, lodash, underscore, morgan, typescript, nodemon`

### Frontend
`react, react-router-dom, react-hook-form, zod, axios, tailwindcss, vite, recharts, jspdf, react-toastify, react-spinners, react-icons`

---

## ✅ Summary
This is a **complete MERN stack project** built with modern practices.  
It combines **technical features** (authentication, book management, dashboards, donations) with **teamwork skills** (collaboration, problem-solving, ownership).  

The project proves ability to deliver **production-ready full-stack apps** with both **technical depth** and **collaborative efficiency**.
