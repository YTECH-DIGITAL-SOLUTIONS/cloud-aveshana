/** @format */

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

interface Slider {
  id: number;
  title: string;
  description: string;
  image_url: string;
  button_text: string;
  button_link: string;
}

export default function ManageSlider() {
  const [sliders, setSliders] = useState<Slider[]>([]);

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const res = await api.get("/admin/content/slider");
      setSliders(res.data);
    } catch {
      toast.error("Gagal memuat data slider.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus slider ini?")) return;
    try {
      await api.delete(`/admin/content/slider/${id}`);
      toast.success("Slider berhasil dihapus.");
      fetchSliders();
    } catch {
      toast.error("Gagal menghapus slider.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Daftar Slider Beranda
        </h2>
        <button
          onClick={() => toast.info("Form tambah/edit slider belum dibuat")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Tambah Slider
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
            <tr>
              <th className="p-2">Gambar</th>
              <th className="p-2">Judul</th>
              <th className="p-2">Deskripsi</th>
              <th className="p-2">CTA</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sliders.map((slider) => (
              <tr
                key={slider.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-2">
                  <img
                    src={slider.image_url}
                    alt="slider"
                    className="h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2">{slider.title}</td>
                <td className="p-2">{slider.description}</td>
                <td className="p-2">
                  <a
                    href={slider.button_link}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    {slider.button_text}
                  </a>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => toast.info("Edit belum dibuat")}
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(slider.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
