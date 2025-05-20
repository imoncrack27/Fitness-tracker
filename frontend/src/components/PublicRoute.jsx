import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/" />; // Redirect if already logged in
  }

  return children; // Otherwise, show the login/register page
};

export default PublicRoute;
