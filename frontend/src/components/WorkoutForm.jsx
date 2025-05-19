import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const workoutSchema = z.object({
  type: z.enum(["strength", "cardio"]),
  name: z.string().min(1, "Name is required"),
  sets: z.number().optional(),
  reps: z.number().optional(),
  weight: z.number().optional(),
  duration: z.number().optional(),
  distance: z.number().optional(),
});

function WorkoutForm({ onWorkoutAdded }) {
  const { token } = useAuth();
  const [type, setType] = useState("strength");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      type: "strength",
    },
  });

  const onSubmit = async (data) => {
    try {
      await API.post("/workouts", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      reset();
      onWorkoutAdded?.(); // callback to refresh dashboard
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Workout creation failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">Log New Workout</h2>

      <div>
        <label className="block text-sm font-medium">Type</label>
        <select
          {...register("type")}
          onChange={(e) => setType(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="strength">Strength</option>
          <option value="cardio">Cardio</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input {...register("name")} className="w-full border p-2 rounded" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {type === "strength" && (
        <>
          <div>
            <label className="block text-sm font-medium">Sets</label>
            <input
              type="number"
              {...register("sets", { valueAsNumber: true })}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Reps</label>
            <input
              type="number"
              {...register("reps", { valueAsNumber: true })}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Weight (kg)</label>
            <input
              type="number"
              {...register("weight", { valueAsNumber: true })}
              className="w-full border p-2 rounded"
            />
          </div>
        </>
      )}

      {type === "cardio" && (
        <>
          <div>
            <label className="block text-sm font-medium">Duration (mins)</label>
            <input
              type="number"
              {...register("duration", { valueAsNumber: true })}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Distance (km)</label>
            <input
              type="number"
              {...register("distance", { valueAsNumber: true })}
              className="w-full border p-2 rounded"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700 transition"
      >
        {isSubmitting ? "Saving..." : "Save Workout"}
      </button>
    </form>
  );
}

export default WorkoutForm;
