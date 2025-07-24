# 🏫 School Management System

A full-featured web-based **School Management System** built using **React** + **Vite** for the frontend and `json-server` for a mock backend. This application allows users to manage students, teachers, and classes with authentication support.

---

## 📸Demo
<img width="1366" height="649" alt="2025-07-24" src="https://github.com/user-attachments/assets/b459cced-6535-47d5-9514-8b03ddbbc83f" />

---


## 🚀 Features

-  **User Authentication** (Login/Register with localStorage token-based auth)
-  **Student Management** (CRUD: Add, View, Edit, Delete)
-  **Teacher Management** (CRUD: Add, View, Edit, Delete)
-  **Class Management** (CRUD: Add, View, Edit, Delete)
-  **Dashboard** overview with counts and recent entries
-  **Search Filtering** for students and teachers
-  **Protected Routes** via `React Router`
-  **Dark Themed UI** using custom CSS

---

## 🧱 Tech Stack

| Tech             | Description                       |
| ---------------- | --------------------------------- |
| **Vite**         | Lightning-fast development server |
| **React**        | Frontend UI library               |
| **React Router** | SPA Navigation & Routing          |
| **json-server**  | Mock backend REST API             |
| **localStorage** | Token-based auth storage          |
| **CSS**          | Custom dark theme styling         |


---

## 📂 Folder Structure
```
📁 final-project/src/
│
├──  README.md   #this file
├── components/
│ └── Navbar.jsx
│ └──ProtectedRoute.jsx
├── pages/
│ ├── Homepage.jsx
│ ├── LoginForm.jsx
│ ├── StudentList.jsx / StudentForm.jsx
│ ├── TeacherList.jsx / TeacherForm.jsx
│ └── ClassList.jsx / ClassForm.jsx
│
├── App.jsx
├── index.css
└── main.jsx
```

---


## 🛠️ Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/school-management-system.git
   cd school-management-system
   ```
2. Install dependencies
 ```  
 npm install
```
3. Start JSON server:
```
json-server --watch db.json --port 3000
```
4. Run React App
```
npm run dev
```
🔐 Sample Admin Credentials
You can log in with the following user:
```
{
  "email": "admin@school.com",
  "password": "admin123"
}
```
Or register a new user via the register form.

📦 API Routes (via json-server)
| Resource | Endpoint    |
| -------- | ----------- |
| Users    | `/users`    |
| Students | `/students` |
| Teachers | `/teachers` |
| Classes  | `/classes`  |


---

🧪 Functional Overview
- Navbar: Dynamic links based on login state.

- Login/Register: Validates via users collection.

- Protected Routes: Redirects unauthorized access to /login.

- Dashboard: Shows counts and previews of recent entries.

- Each Entity Page: List, add, edit, delete records.

---

👥 Authors
- Group 5 - Phase 2 Final Project (React + json-server)

- Contributors: **Jeremy Marube**, **Julius Kedienye**, **Lauren Ann**, and **Asha Mohamed**

---




