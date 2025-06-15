/** @format */

import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

interface PlaceFormModalProps {
  onClose: () => void;
  onSuccess: () => void;
  onFail: () => void;
  initialData?: PlaceFormData;
}

interface PlaceFormData {
  id?: number;
  name: string;
  category: string | number;
  location: string;
  openHour: string;
  closeHour: string;
  price: string;
  description: string;
  mapsUrl: string;
  imageUrl?: string;
  sliderImagesUrl?: string[];
  status: string;

  // Tambahan opsional dari backend
  opening_hours?: string;
  price_range?: string;
  maps_link?: string;
  image_cover?: string;
  image_slider?: string[];
}

export default function PlaceFormModal({
  onClose,
  onSuccess,
  onFail,
  initialData,
}: PlaceFormModalProps) {
  const [form, setForm] = useState<PlaceFormData>({
    name: "",
    category: "",
    location: "",
    openHour: "",
    closeHour: "",
    price: "",
    description: "",
    mapsUrl: "",
    imageUrl: "",
    sliderImagesUrl: [],
    status: "Masih Buka",
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [sliderImages, setSliderImages] = useState<FileList | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [sliderPreviews, setSliderPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    if (initialData) {
      const [open, close] =
        initialData.openHour && initialData.closeHour
          ? [initialData.openHour, initialData.closeHour]
          : (initialData.opening_hours || " - ")
              .split(" - ")
              .map((s) => s.trim());

      const imageUrl = initialData.imageUrl || initialData.image_cover || "";
      const sliderUrls =
        initialData.sliderImagesUrl || initialData.image_slider || [];

      setForm({
        ...initialData,
        openHour: open || "",
        closeHour: close || "",
        price: initialData.price || initialData.price_range || "",
        mapsUrl: initialData.mapsUrl || initialData.maps_link || "",
        imageUrl,
        sliderImagesUrl: sliderUrls,
      });

      setCoverPreview(imageUrl);
      setSliderPreviews(sliderUrls);
    }
  }, [initialData]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/api/categories");
        const active = res.data.filter((cat: any) => cat.is_active);
        setCategories(
          active.map((cat: any) => ({ id: cat.id, name: cat.name }))
        );
      } catch (err) {
        console.error("Gagal mengambil kategori:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.target.type === "file") return;
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.category || (!initialData && !coverImage)) {
      toast.error("Mohon lengkapi data penting terlebih dahulu.");
      onFail();
      return;
    }

    try {
      setIsSubmitting(true);

      let imageUrl = form.imageUrl || "";
      if (coverImage) {
        const formData = new FormData();
        formData.append("image", coverImage);
        const res = await api.post("/api/upload/cover", formData);
        imageUrl = res.data.url;
      }

      let sliderImagesUrl: string[] = form.sliderImagesUrl || [];
      if (sliderImages && sliderImages.length > 0) {
        const formData = new FormData();
        Array.from(sliderImages).forEach((file) =>
          formData.append("images", file)
        );
        const res = await api.post("/api/upload/slider", formData);
        sliderImagesUrl = res.data.urls;
      }

      const payload = {
        name: form.name,
        category: Number(form.category),
        location: form.location,
        description: form.description,
        price: form.price,
        openHour: form.openHour,
        closeHour: form.closeHour,
        mapsUrl: form.mapsUrl,
        imageUrl,
        sliderImagesUrl,
        status: form.status,
      };

      if (initialData?.id) {
        await api.put(`/api/admin/places/${initialData.id}`, payload);
        toast.success("Tempat berhasil diperbarui!");
      } else {
        await api.post("/api/admin/places", payload);
        toast.success("Tempat berhasil ditambahkan!");
      }

      onSuccess();
    } catch (err) {
      console.error("Gagal simpan tempat:", err);
      toast.error("Terjadi kesalahan saat menyimpan tempat.");
      onFail();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    const confirmDelete = confirm("Yakin ingin menghapus tempat ini?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/admin/places/${initialData.id}`);
      toast.success("Tempat berhasil dihapus.");
      onSuccess();
    } catch (err) {
      console.error("Gagal hapus tempat:", err);
      toast.error("Gagal menghapus tempat.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-2xl shadow-lg max-h-[95vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          {initialData ? "Edit Tempat" : "Tambah Tempat Baru"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nama Tempat"
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
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
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
            placeholder="Harga (misal: 10000)"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          />

          <textarea
            name="description"
            placeholder="Deskripsi"
            rows={3}
            value={form.description}
            onChange={handleChange}
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

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="Masih Buka">Masih Buka</option>
            <option value="Sudah Tutup">Sudah Tutup</option>
          </select>

          {/* Gambar Sampul */}
          <div>
            <label className="block mb-1 text-sm">Gambar Sampul</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setCoverImage(file);
                if (file) setCoverPreview(URL.createObjectURL(file));
              }}
              className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
            />
            {coverPreview && (
              <img
                src={coverPreview}
                alt="Preview"
                className="w-full h-40 object-cover rounded mt-2 border"
              />
            )}
          </div>

          {/* Gambar Slider */}
          <div>
            <label className="block mb-1 text-sm">Gambar Slider</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files;
                setSliderImages(files);
                if (files) {
                  const previews = Array.from(files).map((file) =>
                    URL.createObjectURL(file)
                  );
                  setSliderPreviews(previews);
                }
              }}
              className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
            />
            {sliderPreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {sliderPreviews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Slider ${i + 1}`}
                    className="w-24 h-16 object-cover rounded border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-between items-center pt-4">
            {initialData?.id && (
              <button
                type="button"
                onClick={handleDelete}
                className="text-red-600 hover:underline text-sm"
              >
                Hapus Tempat
              </button>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-600 dark:text-white hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 rounded-md bg-blue-900 text-white hover:bg-blue-800"
              >
                {isSubmitting
                  ? "Menyimpan..."
                  : initialData
                  ? "Simpan Perubahan"
                  : "Simpan"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
