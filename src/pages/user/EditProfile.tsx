/** @format */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

export default function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    document.title = "Edit Profil | Bhumi Aveshana";

    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;
        setForm({
          name: data.name,
          email: data.email,
          password: "",
          confirmPassword: "",
        });
      } catch (err) {
        toast.error("Gagal memuat data profil.");
      }
    };

    if (token) fetchUser();
    else toast.error("Token tidak tersedia, silakan login ulang.");
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password && form.password !== form.confirmPassword) {
      toast.error("Password dan konfirmasi tidak cocok.");
      return;
    }

    try {
      await api.put(
        "/users/update",
        {
          name: form.name,
          email: form.email,
          password: form.password || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profil berhasil diperbarui.");
      navigate("/profile");
    } catch (err) {
      toast.error("Gagal memperbarui profil.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Edit Profil
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-500 dark:text-gray-300 mb-1">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 dark:text-gray-300 mb-1">
            Password Baru (opsional)
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 dark:text-gray-300 mb-1">
            Konfirmasi Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-600 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-indigo-700 text-white hover:bg-indigo-800"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
