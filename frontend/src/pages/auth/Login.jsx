import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await API.post("/auth/login", data);
      const { user, token } = res.data;
      login(user, token);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back to Viking's Fitness Tracker 🏋️
          </h1>
          <p className="text-sm text-gray-500 mt-1">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
            {/* Forgot Password Link */}
            <p className="text-right text-sm mt-1">
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot your password?
              </Link>
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
