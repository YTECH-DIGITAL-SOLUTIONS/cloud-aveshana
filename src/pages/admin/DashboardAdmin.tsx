/** @format */
import AdminLayout from "@/components/admin/AdminLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { UserCircle, Map, MessageCircle, Layers } from "lucide-react";
import { useState, useEffect, type JSX } from "react";
import { api } from "@/utils/api";

function StatsCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: JSX.Element;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex items-center gap-6">
      <div className="text-blue-600 dark:text-blue-400 text-5xl">{icon}</div>
      <div>
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
          {title}
        </h2>
        <p className="text-2xl font-semibold text-gray-800 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

function ChartPie({
  title,
  data,
  colors,
}: {
  title: string;
  data: any[];
  colors: string[];
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow w-full">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        {title}
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {data.map((_entry, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function ChartLine({ data }: { data: any[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow w-full">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Interaksi Pengunjung / Hari
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function LatestPlaces({ places }: { places: any[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow w-full">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Tempat Terbaru Ditambahkan
      </h2>
      {places.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          Belum ada tempat yang ditambahkan.
        </p>
      ) : (
        <ul className="space-y-4">
          {places.map((place, i) => (
            <li key={i} className="flex items-center gap-4">
              <img
                src={place.image_cover || "/placeholder.png"}
                alt={place.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <p className="text-base font-semibold text-gray-800 dark:text-white">
                  {place.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {place.location}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function DashboardAdmin() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPlaces: 0,
    totalReviews: 0,
    totalCategories: 0,
  });
  const [trafficData, setTrafficData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [globalSummary, setGlobalSummary] = useState([]);
  const [latestPlaces, setLatestPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await api.get("/api/admin/stats");
        const trafficRes = await api.get("/api/admin/traffic");
        const categoryRes = await api.get("/api/admin/categories");
        const activityRes = await api.get("/api/admin/activities");
        const summaryRes = await api.get("/api/admin/global-summary");
        const latestRes = await api.get(
          "/api/admin/places-paginated?page=1&limit=5"
        );

        setStats(statsRes.data);
        setTrafficData(trafficRes.data);
        setCategoryData(categoryRes.data);
        setActivityData(activityRes.data);
        setGlobalSummary(summaryRes.data);
        setLatestPlaces(latestRes.data.data || []);
      } catch (err) {
        console.error("Gagal mengambil data dashboard:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="w-full max-w-none px-8 space-y-10">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Dashboard Admin
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Users"
            value={stats.totalUsers.toString()}
            icon={<UserCircle size={40} />}
          />
          <StatsCard
            title="Total Tempat"
            value={stats.totalPlaces.toString()}
            icon={<Map size={40} />}
          />
          <StatsCard
            title="Total Ulasan"
            value={stats.totalReviews.toString()}
            icon={<MessageCircle size={40} />}
          />
          <StatsCard
            title="Total Kategori"
            value={stats.totalCategories.toString()}
            icon={<Layers size={40} />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartPie
            title="Distribusi Tempat Berdasarkan Kategori"
            data={categoryData}
            colors={["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#a855f7"]}
          />
          <ChartPie
            title="Komposisi Data Global"
            data={globalSummary}
            colors={["#6366f1", "#10b981", "#f59e0b", "#ef4444"]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartPie
            title="Aktivitas User Berdasarkan Jenis"
            data={activityData}
            colors={["#6366f1", "#10b981", "#f59e0b", "#ef4444"]}
          />
          <ChartLine data={trafficData} />
        </div>

        <LatestPlaces places={latestPlaces} />
      </div>
    </AdminLayout>
  );
}
