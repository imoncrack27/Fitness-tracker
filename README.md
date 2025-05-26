Fitness Tracker App
A full-stack fitness tracking web application built with React, Node.js, and MongoDB.
Users can register, log workouts, view workout history, and track progress — all in a sleek, responsive UI.

🚀 Features
User authentication (register/login) with JWT tokens

Create, read, update, and delete workouts

Track workout types, duration, and date

Responsive design with React and Tailwind CSS

RESTful API backend using Node.js, Express, and MongoDB

Deployment-ready with frontend on Vercel and backend on Render

🔧 Technologies Used
Frontend: React, React Router, Axios, Tailwind CSS, Vite

Backend: Node.js, Express, MongoDB, Mongoose

Deployment: Vercel (frontend), Render (backend)

Authentication: JWT (JSON Web Tokens)

Others: React Hot Toast for notifications

📁 Project Structure
bash
Copy
Edit
frontend/ # React frontend app
backend/ # Express backend API
⚙️ Environment Variables
Frontend (frontend/.env)
env
Copy
Edit
VITE_API_URL=https://your-backend-url.onrender.com/api
Backend (backend/.env)
env
Copy
Edit
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your_jwt_secret_key
💻 Running Locally
Backend
Navigate to backend folder:

bash
Copy
Edit
cd backend
Install dependencies:

bash
Copy
Edit
npm install
Run the server:

bash
Copy
Edit
npm run dev
Frontend
Navigate to frontend folder:

bash
Copy
Edit
cd frontend
Install dependencies:

bash
Copy
Edit
npm install
Run the frontend:

bash
Copy
Edit
npm run dev
📦 Deployment
Frontend deployed on Vercel — auto-deploys from frontend/ folder

Backend deployed on Render — Node.js API server

📄 API Endpoints
Method Endpoint Description
POST /api/auth/register Register new user
POST /api/auth/login Login user
GET /api/workouts Get all workouts for user
POST /api/workouts Create a new workout
PUT /api/workouts/:id Update a workout
DELETE /api/workouts/:id Delete a workout

🤝 Contribution
Feel free to fork the repo and submit pull requests! Open issues if you find bugs or want new features.

📞 Contact
Your Name — [mingo.drexell@example.com]
Project Link: https://your-frontend-url.vercel.app
