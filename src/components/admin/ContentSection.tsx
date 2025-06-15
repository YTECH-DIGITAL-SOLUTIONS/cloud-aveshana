/** @format */

import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

interface SliderItem {
  id?: number;
  title: string;
  description: string;
  cta_text: string;
  image_url: string;
}

export default function ContentSection({ title }: { title: string }) {
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  const [form, setForm] = useState<SliderItem>({
    title: "",
    description: "",
    cta_text: "Jelajahi Sekarang",
    image_url: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const res = await api.get("/api/admin/content/homepage-slider"); // ✅ path benar
      setSliders(res.data);
    } catch (err) {
      console.error("❌ Gagal ambil slider:", err);
      toast.error("Gagal mengambil data slider.");
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post("/api/upload", formData);
      setForm((prev) => ({ ...prev, image_url: res.data.url }));
    } catch (err) {
      toast.error("Upload gambar gagal.");
    }
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await api.put(`/api/admin/content/homepage-slider/${editId}`, form); // ✅ update
        toast.success("Slider diperbarui!");
      } else {
        await api.post("/api/admin/content/homepage-slider", form); // ✅ insert
        toast.success("Slider ditambahkan!");
      }

      setForm({
        title: "",
        description: "",
        cta_text: "Jelajahi Sekarang",
        image_url: "",
      });
      setEditId(null);
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error("❌ Submit slider gagal:", err);
      toast.error("Gagal menyimpan data.");
    }
  };

  const handleEdit = (item: SliderItem) => {
    setForm(item);
    setEditId(item.id ?? null);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus slider ini?")) return;
    try {
      await api.delete(`/api/admin/content/homepage-slider/${id}`);
      toast.success("Slider dihapus.");
      fetchData();
    } catch (err) {
      toast.error("Gagal menghapus slider.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Tambah Slider
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <th>No</th>
              <th>Gambar</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>CTA</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sliders.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={item.image_url}
                    alt="slider"
                    className="h-12 w-20 object-cover rounded"
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.cta_text}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="btn btn-sm btn-info"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id!)}
                    className="btn btn-sm btn-error"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {sliders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  Belum ada slider ditambahkan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-xl relative">
            <button
              className="absolute top-2 right-2 btn btn-sm btn-ghost"
              onClick={() => {
                setShowModal(false);
                setEditId(null);
                setForm({
                  title: "",
                  description: "",
                  cta_text: "Jelajahi Sekarang",
                  image_url: "",
                });
              }}
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4">
              {editId ? "Edit Slider" : "Tambah Slider"}
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Judul"
                className="input input-bordered w-full"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Deskripsi"
                className="input input-bordered w-full"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Teks Tombol"
                className="input input-bordered w-full"
                value={form.cta_text}
                onChange={(e) => setForm({ ...form, cta_text: e.target.value })}
              />
              <input
                type="file"
                onChange={handleUpload}
                className="file-input file-input-bordered w-full"
              />
              {form.image_url && (
                <img
                  src={form.image_url}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="btn btn-primary mt-4 w-full"
            >
              {editId ? "Perbarui Slider" : "Simpan Slider"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
