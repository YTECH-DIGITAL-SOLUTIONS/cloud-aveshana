/** @format */

import { useEffect, useState } from "react";
import { Star, Heart, Map, LogIn, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { toast } from "react-toastify";

export default function DashboardUser() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalWishlist: 0,
    totalReviews: 0,
    totalVisited: 0,
    loginCount: 0,
  });

  const [loginLogs, setLoginLogs] = useState<
    { name: string; kunjungan: number }[]
  >([]);

  useEffect(() => {
    document.title = "Dashboard | Bhumi Aveshana";
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("/api/users/stats");

      setStats({
        totalWishlist: res.data.totalWishlist,
        totalReviews: res.data.totalReviews,
        totalVisited: res.data.totalVisited,
        loginCount: res.data.loginCount,
      });

      // Only set if available (optional)
      if (res.data.loginLogs) {
        const chart = res.data.loginLogs.map((log: any) => ({
          name: log.month,
          kunjungan: log.count,
        }));
        setLoginLogs(chart);
      }
    } catch (err) {
      toast.error("Gagal mengambil statistik user");
    }
  };

  const statItems = [
    {
      title: "Total Wishlist",
      value: stats.totalWishlist,
      icon: <Heart className="text-pink-500" />,
    },
    {
      title: "Ulasan Diberikan",
      value: stats.totalReviews,
      icon: <Star className="text-yellow-500" />,
    },
    {
      title: "Tempat Dikunjungi",
      value: stats.totalVisited,
      icon: <Map className="text-green-500" />,
    },
    {
      title: "Jumlah Login",
      value: stats.loginCount,
      icon: <LogIn className="text-blue-500" />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Selamat Datang Kembali 👋
        </h2>
        <button
          onClick={() => navigate("/profile/edit")}
          className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          <Pencil size={16} />
          Edit Profil
        </button>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md flex items-center gap-4"
          >
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
              {item.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.title}
              </p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Login Bulanan */}
      {loginLogs.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Aktivitas Login Bulanan
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={loginLogs}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="kunjungan"
                stroke="#6366f1"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
