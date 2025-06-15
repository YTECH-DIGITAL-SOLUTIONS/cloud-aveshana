/** @format */

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { api } from "@/utils/api"; // pastikan import api-nya

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  // Ambil logo dari backend
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await api.get("/api/admin/content/website-logo");
        setLogoUrl(res.data.logo_url || "");
      } catch (err) {
        console.error("Gagal mengambil logo navbar:", err);
      }
    };
    fetchLogo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 relative">
        <Link to="/" className="flex items-center gap-2">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="h-10 w-auto" />
          ) : (
            <span className="text-xl font-bold text-blue-900 dark:text-white">
              Bhumi Aveshana
            </span>
          )}
        </Link>

        <nav className="space-x-6 flex items-center">
          <Link
            to="/explore"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
          >
            Jelajahi
          </Link>

          <Link
            to="/wishlist"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
          >
            Favorit
          </Link>

          {!isLoggedIn ? (
            <div className="relative inline-block">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 flex items-center gap-1"
              >
                Masuk <ChevronDown size={16} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-md shadow-lg z-50">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white"
                  >
                    Masuk sebagai Pengguna
                  </Link>
                  <Link
                    to="/admin/login"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white"
                  >
                    Masuk sebagai Admin
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="text-red-500 dark:text-red-400 hover:underline text-sm flex items-center gap-1"
              >
                <LogOut size={16} />
                Keluar
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
