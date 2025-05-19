import { useEffect, useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import WorkoutForm from "../../components/WorkoutForm";

function Dashboard() {
  const { token } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/workouts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWorkouts(res.data);
    } catch (err) {
      console.error("Failed to fetch workouts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Your Workouts</h1>

      <WorkoutForm onWorkoutAdded={fetchWorkouts} />

      <div>
        {loading ? (
          <p className="text-center">Loading workouts...</p>
        ) : workouts.length === 0 ? (
          <p className="text-center text-gray-500">No workouts yet.</p>
        ) : (
          <ul className="space-y-4">
            {workouts.map((w) => (
              <li key={w._id} className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold">
                  {w.name} ({w.type})
                </h2>
                <p className="text-sm text-gray-600">
                  {w.type === "strength"
                    ? `${w.sets || 0} sets × ${w.reps || 0} reps @ ${w.weight || 0}kg`
                    : `${w.duration || 0} mins – ${w.distance || 0} km`}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(w.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
