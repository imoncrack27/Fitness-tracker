import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-hot-toast";
import { Menu, X } from "lucide-react";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const NavLinks = () => (
    <>
      <span className="text-sm text-gray-700">Hi, {user.username}</span>
      <Link
        to="/"
        onClick={() => setMenuOpen(false)}
        className="text-sm text-gray-600 hover:text-blue-600 transition"
      >
        Dashboard
      </Link>
      <button
        onClick={() => {
          handleLogout();
          setMenuOpen(false);
        }}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
      >
        Logout
      </button>
    </>
  );

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Viking's Fitness 🏋️
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen((prev) => !prev)}>
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Desktop Nav */}
        {user && (
          <div className="hidden md:flex items-center gap-4">
            <NavLinks />
          </div>
        )}
      </div>

      {/* Mobile Nav */}
      {menuOpen && user && (
        <div className="md:hidden flex flex-col gap-3 mt-3 pl-2">
          <NavLinks />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
