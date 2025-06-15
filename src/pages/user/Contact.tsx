/** @format */

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Pesan berhasil dikirim!");
    console.log(form);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Hubungi Admin
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nama Anda"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Anda"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subjek"
          value={form.subject}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          required
        />
        <textarea
          name="message"
          rows={4}
          placeholder="Isi pesan..."
          value={form.message}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          required
        />
        <div className="text-right">
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-indigo-700 text-white hover:bg-indigo-800"
          >
            Kirim Pesan
          </button>
        </div>
      </form>
    </div>
  );
}
