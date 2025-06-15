/** @format */

import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

interface Category {
  id: number;
  name: string;
  image_url: string;
}

export default function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [inputRows, setInputRows] = useState<
    { id: number; name: string; image_url: string }[]
  >([{ id: 1, name: "", image_url: "" }]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/api/categories");
      setCategories(res.data);
    } catch (error) {
      toast.error("Gagal memuat data kategori");
    }
  };

  const handleAddRow = () => {
    if (inputRows.length < 20) {
      setInputRows([
        ...inputRows,
        { id: inputRows.length + 1, name: "", image_url: "" },
      ]);
    }
  };

  const handleRemoveRow = (id: number) => {
    setInputRows(inputRows.filter((row) => row.id !== id));
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setInputRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleSubmit = async () => {
    const filled = inputRows.filter(
      (row) => row.name.trim() !== "" && row.image_url.trim() !== ""
    );
    if (filled.length === 0) return;

    try {
      for (const row of filled) {
        if (editingId) {
          await api.put(`/api/categories/${editingId}`, {
            name: row.name,
            imageUrl: row.image_url,
          });
        } else {
          await api.post("/api/categories", {
            name: row.name,
            imageUrl: row.image_url,
          });
        }
      }
      toast.success(`Kategori berhasil ${editingId ? "diedit" : "disimpan"}`);
      fetchCategories();
      setInputRows([{ id: 1, name: "", image_url: "" }]);
      setEditingId(null);
    } catch (error) {
      toast.error("Gagal menyimpan kategori");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/categories/${id}`);
      toast.success("Kategori berhasil dihapus");
      fetchCategories();
    } catch (error) {
      toast.error("Gagal menghapus kategori");
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Kelola Kategori Tempat</h2>
            <p className="text-gray-500 text-sm">
              Tambah, edit, dan hapus kategori tempat seperti wisata, kuliner,
              dll.
            </p>
          </div>
          <div className="flex items-center mt-4 md:mt-0 gap-3">
            <input
              type="text"
              placeholder="Cari kategori..."
              className="border rounded-md px-3 py-2 text-sm w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Form Tambah */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Form {editingId ? "Edit" : "Tambah"} Kategori (max 20)
            </h3>
            <button
              className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              onClick={handleAddRow}
              disabled={inputRows.length >= 20 || editingId !== null}
            >
              <Plus size={16} className="inline-block mr-1" /> Tambah Baris
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Nama Kategori</th>
                  <th className="px-4 py-2">URL Gambar</th>
                  <th className="px-4 py-2">Hapus</th>
                </tr>
              </thead>
              <tbody>
                {inputRows.map((row, i) => (
                  <tr key={row.id} className="border-b">
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        placeholder="Nama"
                        value={row.name}
                        onChange={(e) =>
                          handleInputChange(row.id, "name", e.target.value)
                        }
                        className="w-full border rounded p-1"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        placeholder="URL gambar"
                        value={row.image_url}
                        onChange={(e) =>
                          handleInputChange(row.id, "image_url", e.target.value)
                        }
                        className="w-full border rounded p-1"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleRemoveRow(row.id)}
                        className="text-red-500 hover:text-red-700"
                        disabled={editingId !== null}
                      >
                        <X size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? "Simpan Perubahan" : "Simpan Kategori"}
          </button>
        </div>

        {/* Tabel Data */}
        <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800">
          <table className="w-full table-auto text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3">Gambar</th>
                <th className="px-6 py-3">Nama Kategori</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((cat) => (
                <tr
                  key={cat.id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4">
                    <img
                      src={cat.image_url}
                      alt={cat.name}
                      className="w-28 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{cat.name}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => {
                        setInputRows([
                          {
                            id: cat.id,
                            name: cat.name,
                            image_url: cat.image_url,
                          },
                        ]);
                        setEditingId(cat.id);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCategories.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    Tidak ada kategori ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
