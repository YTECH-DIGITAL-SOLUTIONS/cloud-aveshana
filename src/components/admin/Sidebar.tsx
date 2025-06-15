/** @format */

import { NavLink } from "react-router-dom";
import {
  Home,
  Store,
  Users,
  FileText,
  Settings,
  Megaphone,
  Tag,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <Home size={18} /> },
  { name: "Tempat", path: "/admin/places", icon: <Store size={18} /> },
  { name: "Kategori", path: "/admin/categories", icon: <Tag size={18} /> },
  { name: "Ulasan", path: "/admin/reviews", icon: <FileText size={18} /> },
  {
    name: "Persetujuan Review",
    path: "/admin/review-approval",
    icon: <FileText size={18} />,
  },
  { name: "Pengguna", path: "/admin/users", icon: <Users size={18} /> },
  { name: "Konten", path: "/admin/content", icon: <Settings size={18} /> },
  {
    name: "Broadcast",
    path: "/admin/broadcast",
    icon: <Megaphone size={18} />,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 h-screen sticky top-0 p-4 hidden md:block">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
        Admin Panel
      </h2>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition hover:bg-blue-100 dark:hover:bg-gray-700 ${
                isActive
                  ? "bg-blue-100 dark:bg-gray-700 font-semibold"
                  : "text-gray-600 dark:text-gray-300"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
