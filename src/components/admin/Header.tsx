/** @format */

import { useState } from "react";
import { Sun, Moon, UserCircle2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    // TODO: clear auth if needed
    navigate("/admin/login");
  };

  const goToProfile = () => {
    navigate("/admin/profile");
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
      <div className="text-xl font-semibold text-gray-700 dark:text-white">
        Dashboard
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button onClick={goToProfile}>
          <UserCircle2
            size={24}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
          />
        </button>
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-600"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
