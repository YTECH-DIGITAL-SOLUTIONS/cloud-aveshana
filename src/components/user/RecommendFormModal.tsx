/** @format */

import { useState } from "react";

interface RecommendFormModalProps {
  onClose: () => void;
}

export default function RecommendFormModal({
  onClose,
}: RecommendFormModalProps) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    openHour: "",
    closeHour: "",
    price: "",
    description: "",
    mapsUrl: "",
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [sliderImages, setSliderImages] = useState<FileList | null>(null);

  const categories = [
    "Tempat Wisata",
    "Kuliner",
    "Layanan Publik",
    "Belanja",
    "Museum",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", form, coverImage, sliderImages);
    alert("Rekomendasi berhasil dikirim!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold dark:text-white">
            Form Rekomendasi Tempat
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-300 hover:text-red-600"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nama tempat"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="">Pilih Kategori</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="location"
            placeholder="Lokasi"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="time"
              name="openHour"
              value={form.openHour}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
            />
            <input
              type="time"
              name="closeHour"
              value={form.closeHour}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
            />
          </div>
          <input
            type="number"
            name="price"
            placeholder="Harga (contoh: 25000)"
            value={form.price}
            onChange={handleChange}
            min={0}
            required
            className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          />
          <textarea
            name="description"
            placeholder="Deskripsi tempat"
            value={form.description}
            onChange={handleChange}
            rows={3}
            required
            className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          />
          <input
            type="text"
            name="mapsUrl"
            placeholder="Link Google Maps"
            value={form.mapsUrl}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          />
          <div>
            <label className="text-sm block text-gray-700 dark:text-white mb-1">
              Gambar Sampul
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              required
              className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm block text-gray-700 dark:text-white mb-1">
              Gambar Slider
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setSliderImages(e.target.files)}
              className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Kirim Rekomendasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
