/** @format */

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

interface Place {
  id: string;
  name: string;
  image: string;
  location: string;
  category: string;
}

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/wishlist");
      setWishlist(res.data);
    } catch (err) {
      toast.error("Gagal mengambil data wishlist");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await axios.delete(`/api/users/wishlist/${id}`);
      toast.success("Berhasil dihapus dari wishlist");
      fetchWishlist();
    } catch (err) {
      toast.error("Gagal menghapus dari wishlist");
    }
  };

  useEffect(() => {
    document.title = "Wishlist | Bhumi Aveshana";
    fetchWishlist();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Wishlist Tempat Favorit
      </h2>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Memuat data...</p>
      ) : wishlist.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          Belum ada wishlist 😢
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((place) => (
            <div
              key={place.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition overflow-hidden relative"
            >
              <img
                src={place.image}
                alt={place.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {place.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {place.category} • {place.location}
                </p>
              </div>

              <button
                onClick={() => handleRemove(place.id)}
                className="absolute top-3 right-3 bg-red-100 dark:bg-red-800 text-red-600 p-2 rounded-full hover:bg-red-200 dark:hover:bg-red-700 transition"
                title="Hapus dari Wishlist"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
