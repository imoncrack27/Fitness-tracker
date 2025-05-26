import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import workoutRoutes from "./routes/workouts.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (we'll create these files soon)
app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Fitness Tracker API!");
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
