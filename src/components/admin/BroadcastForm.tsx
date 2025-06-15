/** @format */

import { useState } from "react";

export default function BroadcastForm() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    // TODO: Kirim ke backend untuk broadcast ke semua user
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
    >
      <input
        type="text"
        placeholder="Judul pesan"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-4 py-2 rounded-md"
        required
      />
      <textarea
        placeholder="Isi pesan yang ingin dikirim..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border px-4 py-2 rounded-md"
        rows={5}
        required
      ></textarea>
      <button
        type="submit"
        className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
      >
        Kirim Pesan
      </button>

      {sent && (
        <p className="text-green-600 text-sm mt-2">
          Pesan berhasil dikirim ke semua user!
        </p>
      )}
    </form>
  );
}
