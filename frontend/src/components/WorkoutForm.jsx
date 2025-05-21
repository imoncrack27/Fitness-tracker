// WorkoutForm.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import API from "../services/api";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const schema = z.object({
  type: z.enum(["strength", "cardio"]),
  name: z.string().min(1, "Name is required"),
  sets: z.number().optional(),
  reps: z.number().optional(),
  weight: z.number().optional(),
  duration: z.number().optional(),
  distance: z.number().optional(),
});

function WorkoutForm({ onWorkoutAdded, workoutToEdit = null }) {
  const { token } = useAuth();
  const isEditMode = Boolean(workoutToEdit);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { type: "strength" },
  });

  const type = watch("type");

  useEffect(() => {
    if (isEditMode) {
      reset(workoutToEdit);
    }
  }, [isEditMode, workoutToEdit, reset]);

  const onSubmit = async (data) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (isEditMode) {
        await API.put(`/workouts/${workoutToEdit._id}`, data, config);
        toast.success("Workout updated!");
      } else {
        await API.post("/workouts", data, config);
        toast.success("Workout logged!");
      }
      reset();
      onWorkoutAdded();
    } catch (err) {
      toast.error("Failed to save workout.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">
        {isEditMode ? "Update Workout" : "Log Workout"}
      </h2>

      {/* Type Select */}
      <div>
        <label className="block text-sm font-medium">Type</label>
        <select {...register("type")} className="w-full border p-2 rounded">
          <option value="strength">Strength</option>
          <option value="cardio">Cardio</option>
        </select>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input {...register("name")} className="w-full border p-2 rounded" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Conditional Fields */}
      {type === "strength" && (
        <>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Sets"
              {...register("sets", { valueAsNumber: true })}
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Reps"
              {...register("reps", { valueAsNumber: true })}
              className="w-full border p-2 rounded"
            />
          </div>
          <input
            type="number"
            placeholder="Weight (kg)"
            {...register("weight", { valueAsNumber: true })}
            className="w-full border p-2 rounded"
          />
        </>
      )}

      {type === "cardio" && (
        <>
          <input
            type="number"
            placeholder="Duration (minutes)"
            {...register("duration", { valueAsNumber: true })}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Distance (km)"
            {...register("distance", { valueAsNumber: true })}
            className="w-full border p-2 rounded"
          />
        </>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isSubmitting
          ? isEditMode
            ? "Updating..."
            : "Logging..."
          : isEditMode
            ? "Update Workout"
            : "Add Workout"}
      </button>
    </form>
  );
}

export default WorkoutForm;
