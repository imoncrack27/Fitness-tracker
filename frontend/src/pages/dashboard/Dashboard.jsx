import { useEffect, useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import WorkoutForm from "../../components/WorkoutForm";
import toast from "react-hot-toast";

function Dashboard() {
  const { token } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const filteredWorkouts = workouts
    .filter((w) => filterType === "all" || w.type === filterType)
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

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
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto space-y-6">
        <WorkoutForm onWorkoutAdded={fetchWorkouts} />

        {/* Filter/Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-2">
            <label className="text-sm font-medium text-gray-700">Filter:</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded p-2"
            >
              <option value="all">All</option>
              <option value="strength">Strength</option>
              <option value="cardio">Cardio</option>
            </select>
          </div>

          <div className="flex gap-2">
            <label className="text-sm font-medium text-gray-700">Sort:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 rounded p-2"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Workouts List */}
        <section className="mt-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading workouts...</p>
          ) : workouts.length === 0 ? (
            <p className="text-center text-gray-400">No workouts yet.</p>
          ) : (
            <ul className="space-y-4">
              {filteredWorkouts.map((w) => (
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
