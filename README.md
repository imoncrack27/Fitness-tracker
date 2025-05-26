# Fitness Tracker App

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Vercel](https://img.shields.io/badge/deployed-vercel-blue)
![Render](https://img.shields.io/badge/backend-render-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/frontend-react-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/backend-node.js-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/database-mongodb-47A248?logo=mongodb&logoColor=white)

A full-stack fitness tracking web application with user authentication, workout CRUD operations, and progress tracking.

---

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [API Reference](#-api-reference)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🚀 Features

- User authentication with JWT (register/login/logout)
- Full CRUD for workouts (create, view, update, delete)
- Responsive UI built with React and Tailwind CSS
- Real-time form validation and error handling
- Notifications with React Hot Toast
- Secure REST API with Express and MongoDB
- Deployed on Vercel (frontend) and Render (backend)

---

## 🎥 Demo

WIP

---

## 🔧 Tech Stack

| Layer         | Technology                          |
| ------------- | ----------------------------------- |
| Frontend      | React, Vite, Tailwind CSS           |
| Backend       | Node.js, Express                    |
| Database      | MongoDB, Mongoose                   |
| Auth          | JWT (JSON Web Tokens)               |
| Deployment    | Vercel (frontend), Render (backend) |
| Notifications | React Hot Toast                     |

---

## 📁 Project Structure

```
project-root/
├── backend/        # Express API (Node.js, MongoDB)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/       # React app (Vite, Tailwind)
│   ├── src/
│   ├── public/
│   └── vite.config.js
└── README.md
```

---

## ⚙️ Environment Variables

### Frontend (`frontend/.env`)

```env
VITE_API_URL=https://fitness-tracker-backend-ribt.onrender.com
```

### Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 💻 Getting Started

### Prerequisites

- Node.js v16 or higher
- MongoDB instance (local or cloud)

### Running Backend

```bash
cd backend
npm install
npm run dev
```

### Running Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📦 Deployment

### Frontend (Vercel)

- Set the project root to `frontend`
- Add environment variable: `VITE_API_URL=https://fitness-tracker-backend-ribt.onrender.com`

### Backend (Render)

- Create a Web Service using the Render dashboard
- Use `web` as the service type
- Add environment variables:
  - `PORT=5000`
  - `MONGO_URI=your_mongo_uri`
  - `JWT_SECRET=your_jwt_secret`

---

## 📄 API Reference

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | Register new user       |
| POST   | `/api/auth/login`    | Login user              |
| GET    | `/api/workouts`      | Fetch user workouts     |
| POST   | `/api/workouts`      | Create new workout      |
| PUT    | `/api/workouts/:id`  | Update existing workout |
| DELETE | `/api/workouts/:id`  | Delete a workout        |

---

## 🛣️ Roadmap

- [ ] Add user profile editing
- [ ] Integrate workout analytics & charts
- [ ] Enable social sharing of workout progress
- [ ] Mobile app version with React Native
- [ ] Push notifications for workout reminders

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests.

---

## 📜 License

This project is licensed under the MIT License.

---

## 📞 Contact

**Drexell John Joseph Mingo** — mingo.drexell@gmail.com  
Frontend: https://fitness-tracker-frontend-seven.vercel.app/
Backend: https://fitness-tracker-backend-ribt.onrender.com
