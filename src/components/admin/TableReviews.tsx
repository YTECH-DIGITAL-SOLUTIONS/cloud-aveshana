/** @format */

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

interface Review {
  id: number;
  user: string;
  place: string;
  rating: number;
  comment: string;
}

export default function TableReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await api.get("/admin/reviews");
      setReviews(res.data);
    } catch (err) {
      toast.error("Gagal memuat ulasan");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus ulasan ini?")) return;
    try {
      await api.delete(`/admin/reviews/${id}`);
      toast.success("Ulasan berhasil dihapus");
      fetchReviews();
    } catch (err) {
      toast.error("Gagal menghapus ulasan");
    }
  };

  return (
    <div className="overflow-x-auto rounded-md shadow bg-white dark:bg-gray-800 p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Daftar Ulasan Pengguna
      </h2>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Memuat data...</p>
      ) : (
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Tempat</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Komentar</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="px-4 py-2">{item.user}</td>
                <td className="px-4 py-2">{item.place}</td>
                <td className="px-4 py-2">
                  {"⭐".repeat(item.rating)} ({item.rating})
                </td>
                <td className="px-4 py-2">{item.comment}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
