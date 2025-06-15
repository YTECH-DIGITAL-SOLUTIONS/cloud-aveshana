/** @format */

import { useEffect, useState } from "react";
import { Pencil, Trash2, MapPin } from "lucide-react";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

interface Place {
  id: number;
  name: string;
  category: string | number;
  location: string;
  opening_hours: string;
  price_range: string;
  description: string;
  maps_link: string;
  image_cover: string;
  image_slider: string[];
  status: string;
  created_by?: string;
  created_at?: string;
  updated_by?: string;
  updated_at?: string;
}

interface TablePlacesProps {
  searchTerm: string;
  onEdit: (place: Place) => void;
  reload: boolean;
}

export default function TablePlaces({
  searchTerm,
  onEdit,
  reload,
}: TablePlacesProps) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number | "all">(10);

  const fetchPlaces = async () => {
    try {
      const res = await api.get("/api/admin/places", {
        params: { search: searchTerm },
      });
      setPlaces(res.data);
    } catch (err) {
      console.error("Gagal mengambil tempat:", err);
      toast.error("Gagal mengambil data tempat.");
    }
  };

  const handleDelete = async (place: Place) => {
    if (!confirm(`Yakin ingin menghapus tempat "${place.name}"?`)) return;
    try {
      await api.delete(`/api/admin/places/${place.id}`);
      toast.success(`Tempat "${place.name}" berhasil dihapus.`);
      fetchPlaces();
    } catch (err) {
      console.error("Gagal menghapus tempat:", err);
      toast.error("Gagal menghapus tempat.");
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, [searchTerm, reload]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  const totalItems = places.length;
  const totalPages =
    itemsPerPage === "all" ? 1 : Math.ceil(totalItems / itemsPerPage);

  const paginatedItems =
    itemsPerPage === "all"
      ? places
      : places.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );

  return (
    <div className="w-full overflow-x-auto rounded-xl shadow bg-white dark:bg-gray-800">
      <div className="flex justify-end items-center px-4 py-2">
        <label className="text-sm text-gray-700 dark:text-gray-300 mr-2">
          Tampilkan
        </label>
        <select
          value={itemsPerPage}
          onChange={(e) =>
            setItemsPerPage(
              e.target.value === "all" ? "all" : parseInt(e.target.value)
            )
          }
          className="px-2 py-1 border rounded-md dark:bg-gray-800 dark:text-white"
        >
          {[10, 20, 30, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
          <option value="all">Semua</option>
        </select>
      </div>

      <table className="w-full text-sm text-left table-auto">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
          <tr>
            <th className="px-4 py-3">Gambar</th>
            <th className="px-4 py-3">Nama</th>
            <th className="px-4 py-3">Kategori</th>
            <th className="px-4 py-3">Lokasi</th>
            <th className="px-4 py-3">Jam Buka</th>
            <th className="px-4 py-3">Harga</th>
            <th className="px-4 py-3">Deskripsi</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Maps</th>
            <th className="px-4 py-3">Dibuat</th>
            <th className="px-4 py-3">Diperbarui</th>
            <th className="px-4 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((place) => (
            <tr
              key={place.id}
              className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="px-4 py-3">
                <img
                  src={place.image_cover}
                  alt={place.name}
                  className="w-20 h-14 object-cover rounded-md"
                />
              </td>
              <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">
                {place.name}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                {place.category}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                {place.location}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                {place.opening_hours}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                {place.price_range}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                <span className="line-clamp-2">{place.description}</span>
              </td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={`inline-block px-2 py-1 rounded-full font-medium ${
                    place.status === "Masih Buka"
                      ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-white"
                      : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-white"
                  }`}
                >
                  {place.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <a
                  href={place.maps_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <MapPin size={16} /> Lihat
                </a>
              </td>
              <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                <div>{place.created_by || "-"}</div>
                <div>
                  {place.created_at
                    ? new Date(place.created_at).toLocaleString()
                    : "-"}
                </div>
              </td>
              <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                <div>{place.updated_by || "-"}</div>
                <div>
                  {place.updated_at
                    ? new Date(place.updated_at).toLocaleString()
                    : "-"}
                </div>
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onEdit(place)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(place)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {paginatedItems.length === 0 && (
            <tr>
              <td
                colSpan={12}
                className="px-6 py-6 text-center text-gray-400 dark:text-gray-500"
              >
                Tidak ada tempat ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {itemsPerPage !== "all" && totalPages > 1 && (
        <div className="flex justify-center items-center py-4 gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md border ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
