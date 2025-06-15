/** @format */

import { Link, useLocation } from "react-router-dom";
import { User, Heart, Star, LogOut, Home, Map, UserCircle } from "lucide-react";

export default function SidebarUser() {
  const { pathname } = useLocation();

  const menu = [
    { path: "/dashboard", icon: <User />, label: "Dashboard" },
    { path: "/wishlist", icon: <Heart />, label: "Wishlist" },
    { path: "/review", icon: <Star />, label: "Rating & Review" },
    { path: "/recommend", icon: <Map />, label: "Rekomendasi Tempat" },
    // Kontak dihapus dari sini
    { path: "/profile", icon: <UserCircle />, label: "Profil Saya" },
    { path: "/", icon: <Home />, label: "Kembali ke Beranda" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md min-h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold text-center text-indigo-600 dark:text-white">
        Bhumi Aveshana
      </div>

      <nav className="flex-1 flex flex-col gap-2 px-4">
        {menu.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition hover:bg-indigo-100 dark:hover:bg-indigo-900 ${
              pathname === item.path
                ? "bg-indigo-200 dark:bg-indigo-700 text-white"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="px-4 pb-6">
        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
          className="w-full flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
        >
          <LogOut />
          Keluar
        </button>
      </div>
    </aside>
  );
}
