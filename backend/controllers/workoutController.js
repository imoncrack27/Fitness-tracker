import Workout from "../models/workout.js";

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

// ➤ Update a workout
export const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json(workout);
  } catch (err) {
    console.log("Error in updateWorkout controller:", err.message);
    res
      .status(500)
      .json({ message: "Failed to update workout", error: err.message });
  }
};

// ➤ Delete a workout
export const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (err) {
    console.log("Error in deleteWorkout controller:", err.message);
    res
      .status(500)
      .json({ message: "Failed to delete workout", error: err.message });
  }
};
