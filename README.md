# 🗂️ Task Manager App

A full-stack role-based task management system built with **NestJS**, **React**, and **MySQL**.  
Managers can assign tasks to employees, and employees can update task status. Includes login/logout functionality with protected routes and dynamic dashboards.

---

## 🔧 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS
- **Backend**: NestJS, TypeORM
- **Database**: MySQL (phpMyAdmin)
- **Authentication**: JWT with role-based access (Manager, Employee)

---

## 🚀 Features

### ✅ Authentication
- Login & Registration
- JWT-based auth
- Logout with token clearing

### 🔐 Role-based Access
- **Manager**: Assign tasks, see all tasks
- **Employee**: See only their tasks, update status

### 📋 Task Management
- Assign task (Manager)
- Task status update (Employee)
- Task table UI (with role-based visibility)

---

## 📁 Project Structure

### Backend (`/task-manager`)
```bash
src/
├── auth/ # Auth module (JWT, guards, login, register)
├── common/ # Role enums and decorators
├── tasks/ # Task module (controllers, service, DTOs)
├── users/ # User entity
└── main.ts # CORS setup and app bootstrap
```

### Frontend (`/frontend-task-manager`)
```bash
src/
├── context/ # AuthContext for global user state
├── components/ # UI Components (Navbar, TaskTable, etc.)
├── pages/ # Login, Register, Dashboard
├── services/ # API functions (axios)
└── App.jsx # Main routing and layout
```

---

## 🛠️ Setup Instructions

### 📦 Backend (NestJS)

```bash
cd task-manager
npm install
npm run start:dev

```

- Create a .env file with MySQL connection
- MySQL (phpMyAdmin) should be running with proper credentials

### 📦 Frontend  (React)

```bash
cd frontend-task-manager
npm install
npm run dev

```
- Runs on http://localhost:5173
- Make sure backend is running at http://localhost:3000

---

## 🤝 Contributing

Pull requests and suggestions are welcome!  
For major changes, open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is licensed under the AppSquadz License.

---

## 🙌 Author
**Shrey Singhal**
