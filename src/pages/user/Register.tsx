/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setError("Password dan konfirmasi tidak cocok.");
      toast.error("Konfirmasi password tidak cocok.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("🎉 Registrasi berhasil! Silakan login.");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirm("");
        setError("");

        // Arahkan ke halaman login setelah 1.5 detik
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data.message || "Registrasi gagal.");
        toast.error(data.message || "Registrasi gagal.");
      }
    } catch (err) {
      setError("Gagal menghubungi server.");
      toast.error("Gagal menghubungi server.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Form Kiri */}
      <div className="w-1/2 flex items-center justify-center">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-md space-y-6 p-8 shadow-xl rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <div className="text-3xl font-bold text-center text-gray-800 dark:text-white">
            Daftar Akun
          </div>
          <p className="text-center text-gray-500 dark:text-gray-300">
            Buat akun untuk melanjutkan
          </p>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <input
            type="text"
            placeholder="Nama Lengkap"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Konfirmasi Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900 transition"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Sudah punya akun?{" "}
            <a href="/login" className="text-blue-600 font-medium">
              Login di sini
            </a>
          </p>
        </form>
      </div>

      {/* Ilustrasi Kanan */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <img src="/icons/sign-up.png" alt="Illustration" className="w-2/3" />
      </div>
    </div>
  );
}
