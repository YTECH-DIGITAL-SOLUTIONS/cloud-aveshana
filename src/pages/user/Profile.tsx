/** @format */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    joined: "",
    role: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    document.title = "Profil Saya | Bhumi Aveshana";

    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;

        setUser({
          name: data.name,
          email: data.email,
          joined: new Date(data.created_at).toLocaleDateString("id-ID"),
          role: data.role === "admin" ? "Admin" : "Pengguna",
        });
      } catch (err) {
        toast.error("Gagal memuat profil.");
      }
    };

    if (token) fetchUser();
    else toast.error("Token tidak tersedia. Silakan login ulang.");
  }, [token]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Profil Saya
      </h2>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Nama Lengkap
          </p>
          <p className="text-base font-medium text-gray-800 dark:text-white">
            {user.name}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
          <p className="text-base font-medium text-gray-800 dark:text-white">
            {user.email}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tanggal Bergabung
          </p>
          <p className="text-base font-medium text-gray-800 dark:text-white">
            {user.joined}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Peran</p>
          <p className="text-base font-medium text-gray-800 dark:text-white">
            {user.role}
          </p>
        </div>
      </div>

      <div className="text-right">
        <button
          onClick={() => navigate("/profile/edit")}
          className="px-4 py-2 rounded-md bg-indigo-700 text-white hover:bg-indigo-800"
        >
          Edit Profil
        </button>
      </div>
    </div>
  );
}
