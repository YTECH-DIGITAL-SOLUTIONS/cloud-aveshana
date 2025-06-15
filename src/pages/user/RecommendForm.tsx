/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import RecommendFormModal from "@/components/user/RecommendFormModal";
import { toast } from "react-toastify";

interface HistoryItem {
  id: number;
  name: string;
  category_name: string; // dari join tabel kategori
  location: string;
  status: "pending" | "approved" | "rejected";
  reason?: string;
}

export default function RecommendFormPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchRecommendations = async () => {
    try {
      const res = await axios.get("/api/users/recommendations");
      setHistory(res.data);
    } catch (err) {
      toast.error("Gagal mengambil data rekomendasi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const filtered = history.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );
  const totalPages = Math.ceil(filtered.length / limit);

  const renderStatusBadge = (status: string) => {
    const label =
      status === "approved"
        ? "Disetujui"
        : status === "rejected"
        ? "Ditolak"
        : "Menunggu";
    const color =
      status === "approved"
        ? "bg-green-100 text-green-700"
        : status === "rejected"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700";

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {label}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Rekomendasi Tempat Saya
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
        >
          <Plus size={16} /> Tambah
        </button>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Cari nama tempat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-md w-full sm:w-64 dark:bg-gray-800 dark:text-white"
        />
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="limit" className="text-gray-600 dark:text-gray-300">
            Tampilkan:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border px-3 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          >
            {[5, 10, 25].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto shadow rounded-xl border dark:border-gray-700">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Nama Tempat</th>
              <th className="px-6 py-3">Kategori</th>
              <th className="px-6 py-3">Lokasi</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  Memuat data...
                </td>
              </tr>
            ) : paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 dark:text-gray-300"
                >
                  Tidak ada data rekomendasi ditemukan.
                </td>
              </tr>
            ) : (
              paginated.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.category_name}</td>
                  <td className="px-6 py-4">{item.location}</td>
                  <td className="px-6 py-4">
                    {renderStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4">{item.reason || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-4 text-sm">
          <span className="text-gray-600 dark:text-gray-300">
            Halaman {currentPage} dari {totalPages}
          </span>
          <div className="space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <RecommendFormModal
          onClose={() => {
            setShowModal(false);
            fetchRecommendations(); // Refresh data setelah tambah
          }}
        />
      )}
    </div>
  );
}
