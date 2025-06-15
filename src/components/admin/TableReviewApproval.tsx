/** @format */

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

interface Recommendation {
  id: number;
  name: string;
  category_name: string;
  location: string;
  user_name: string;
}

export default function TableReviewApproval() {
  const [data, setData] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/recommendations");
      setData(res.data);
    } catch (err) {
      toast.error("Gagal mengambil data rekomendasi");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await axios.post(`/api/admin/recommendations/${id}/approve`);
      toast.success("Rekomendasi disetujui");
      fetchRecommendations();
    } catch (err) {
      toast.error("Gagal menyetujui rekomendasi");
    }
  };

  const handleReject = async (id: number) => {
    const reason = prompt("Masukkan alasan penolakan:");
    if (!reason) return;
    try {
      await axios.post(`/api/admin/recommendations/${id}/reject`, {
        reason,
      });
      toast.success("Rekomendasi ditolak");
      fetchRecommendations();
    } catch (err) {
      toast.error("Gagal menolak rekomendasi");
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="overflow-x-auto rounded-md shadow bg-white dark:bg-gray-800">
      {loading ? (
        <div className="p-6 text-center text-gray-500 dark:text-gray-300">
          Memuat data rekomendasi...
        </div>
      ) : (
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
            <tr>
              <th className="px-4 py-2">Nama Tempat</th>
              <th className="px-4 py-2">Kategori</th>
              <th className="px-4 py-2">Lokasi</th>
              <th className="px-4 py-2">Pengirim</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 dark:border-gray-600"
              >
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.category_name}</td>
                <td className="px-4 py-2">{item.location}</td>
                <td className="px-4 py-2">{item.user_name}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => handleApprove(item.id)}
                  >
                    Setujui
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleReject(item.id)}
                  >
                    Tolak
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
