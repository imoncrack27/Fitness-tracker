import { useEffect, useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import WorkoutForm from "../../components/WorkoutForm";
import toast from "react-hot-toast";

function Dashboard() {
  const { token, logout } = useAuth();
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
      toast.error("Failed to load workouts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={logout}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto space-y-6">
        <WorkoutForm onWorkoutAdded={fetchWorkouts} />

        {/* Workouts List */}
        <section className="mt-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading workouts...</p>
          ) : workouts.length === 0 ? (
            <p className="text-center text-gray-400">No workouts yet.</p>
          ) : (
            <ul className="space-y-4">
              {workouts.map((w) => (
                <li
                  key={w._id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <h2 className="text-lg font-semibold text-gray-800">
                    {w.name}{" "}
                    <span className="text-sm text-gray-500">({w.type})</span>
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {w.type === "strength"
                      ? `${w.sets || 0} sets × ${w.reps || 0} reps @ ${w.weight || 0} kg`
                      : `${w.duration || 0} min – ${w.distance || 0} km`}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(w.date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
