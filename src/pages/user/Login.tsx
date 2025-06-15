/** @format */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Login | Bhumi Aveshana";

    const root = document.getElementById("root");
    if (root) root.classList.add("no-navbar");

    return () => {
      if (root) root.classList.remove("no-navbar");
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const data = res.data;

      // Simpan token dan user ke localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login berhasil! Selamat datang 👋");
      navigate("/dashboard");
    } catch (err: any) {
      const msg =
        err.response?.data?.message || "Gagal login: Server tidak merespon";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Ilustrasi */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <img src="/icons/sign.png" alt="Illustration" className="w-2/3" />
      </div>

      {/* Form Login */}
      <div className="w-1/2 flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md space-y-6 p-8 shadow-xl rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <div className="text-3xl font-bold text-center text-gray-800 dark:text-white">
            Welcome
          </div>
          <p className="text-center text-gray-500 dark:text-gray-300">
            Masuk ke akun Bhumi Aveshana
          </p>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900 transition"
          >
            LOGIN
          </button>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Belum punya akun?{" "}
            <a href="/register" className="text-blue-600 font-medium">
              Daftar di sini
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
