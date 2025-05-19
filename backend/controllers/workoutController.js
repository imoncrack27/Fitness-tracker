import Workout from "../models/Workout.js";

// ➤ Create a new workout
export const createWorkout = async (req, res) => {
  const { type, name, sets, reps, weight, duration, distance, date } = req.body;

  try {
    const workout = await Workout.create({
      userId: req.user.id,
      type,
      name,
      sets,
      reps,
      weight,
      duration,
      distance,
      date: date || new Date(),
    });

    res.status(201).json(workout);
  } catch (err) {
    console.log("Error in createWorkout controller:", err.message);
    res
      .status(500)
      .json({ message: "Failed to create workout", error: err.message });
  }
};

// ➤ Get all workouts of the logged-in user
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id }).sort({
      date: -1,
    });
    res.status(200).json(workouts);
  } catch (err) {
    console.log("Error in getWorkouts controller:", err.message);
    res
      .status(500)
      .json({ message: "Failed to fetch workouts", error: err.message });
  }
};
