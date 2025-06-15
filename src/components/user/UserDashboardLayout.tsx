/** @format */

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import SidebarUser from "./SidebarUser";
import { Moon, Sun, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function UserDashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(document.documentElement.classList.contains("dark"));
  };

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/wishlist":
        return "Tempat Favorit";
      case "/review":
        return "Rating & Ulasan";
      case "/recommend":
        return "Rekomendasi Tempat";
      case "/contact":
        return "Kontak Admin";
      case "/profile":
        return "Profil Saya";
      case "/profile/edit":
        return "Edit Profil";
      default:
        return "Dashboard User";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <SidebarUser />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 shadow bg-white dark:bg-gray-800">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            {getPageTitle()}
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              title="Toggle Mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="p-2 rounded-md bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-white"
              title="Profil"
            >
              <User size={18} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
