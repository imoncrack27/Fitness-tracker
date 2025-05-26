import { useEffect, useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/authContext";
import WorkoutForm from "../../components/WorkoutForm";
import EditWorkoutModal from "../../components/EditWorkoutModal"; // <-- Import modal
import toast from "react-hot-toast";

function Dashboard() {
  const { token } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [sortOption, setSortOption] = useState("date-desc");

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/workouts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkouts(res.data);
    } catch (err) {
      toast.error("Failed to load workouts.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workout?"))
      return;
    try {
      await API.delete(`/workouts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Workout deleted.");
      fetchWorkouts();
    } catch (err) {
      toast.error("Failed to delete workout.");
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    const [field, direction] = sortOption.split("-");

    if (field === "date") {
      return direction === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }

    if (field === "name") {
      return direction === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

    if (["sets", "duration"].includes(field)) {
      return direction === "asc"
        ? (a[field] || 0) - (b[field] || 0)
        : (b[field] || 0) - (a[field] || 0);
    }

    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="flex justify-between items-center mb-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      </header>

      <main className="max-w-3xl mx-auto space-y-6">
        {/* Workout Form for adding */}
        <WorkoutForm onWorkoutAdded={fetchWorkouts} />

        <div className="flex justify-end max-w-3xl mx-auto mb-4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="date-desc">Date (Newest First)</option>
            <option value="date-asc">Date (Oldest First)</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="sets-asc">Sets (Low to High)</option>
            <option value="sets-desc">Sets (High to Low)</option>
            <option value="duration-asc">Duration (Short to Long)</option>
            <option value="duration-desc">Duration (Long to Short)</option>
          </select>
        </div>

        {/* Workout List */}
        <section>
          {loading ? (
            <p className="text-center text-gray-500">Loading workouts...</p>
          ) : workouts.length === 0 ? (
            <p className="text-center text-gray-400">No workouts yet.</p>
          ) : (
            <ul className="space-y-4">
              {sortedWorkouts.map((w) => (
                <li
                  key={w._id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <h2 className="text-lg font-semibold text-gray-800 flex justify-between items-center">
                    <span>
                      {w.name}{" "}
                      <span className="text-sm text-gray-500">({w.type})</span>
                    </span>
                    <span className="space-x-2">
                      <button
                        onClick={() => setEditingWorkout(w)}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(w._id)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Delete
                      </button>
                    </span>
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

      {/* Edit Modal */}
      <EditWorkoutModal
        isOpen={!!editingWorkout}
        onClose={() => setEditingWorkout(null)}
        workout={editingWorkout}
        onUpdated={fetchWorkouts}
      />
    </div>
  );
}

export default Dashboard;
