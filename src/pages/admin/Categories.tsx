/** @format */

import AdminLayout from "@/components/admin/AdminLayout";
import AnimatedAlert from "@/components/common/AnimatedAlert";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { api } from "@/utils/api";

interface Category {
  id: number;
  name: string;
  image_url: string;
  is_active: boolean;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    image_url: "",
    is_active: "true",
  });
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/api/categories");
      setCategories(res.data);
    } catch {
      showAlert("error", "Gagal memuat data kategori");
    }
  };

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  const openAddModal = () => {
    setFormData({ name: "", image_url: "", is_active: "true" });
    setUploadFile(null);
    setIsEdit(false);
    setShowModal(true);
  };

  const openEditModal = (cat: Category) => {
    setSelectedCategory(cat);
    setFormData({
      name: cat.name,
      image_url: cat.image_url,
      is_active: cat.is_active ? "true" : "false",
    });
    setIsEdit(true);
    setUploadFile(null);
    setShowModal(true);
  };

  const handleImageUpload = async (): Promise<string | null> => {
    if (!uploadFile) return formData.image_url;

    const form = new FormData();
    form.append("image", uploadFile); // ✅ sesuai dengan backend multer config

    try {
      const res = await api.post("/api/upload/cover", form); // ✅ endpoint yang benar
      return res.data.url;
    } catch {
      showAlert("error", "Gagal upload gambar");
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      showAlert("error", "Nama kategori wajib diisi");
      return;
    }

    const imageUrl = await handleImageUpload();
    if (!imageUrl) return;

    try {
      if (isEdit && selectedCategory) {
        await api.put(`/api/categories/${selectedCategory.id}`, {
          name: formData.name,
          imageUrl,
          isActive: formData.is_active === "true",
        });
        showAlert("success", "Kategori berhasil diperbarui");
      } else {
        await api.post("/api/categories", {
          name: formData.name,
          imageUrl,
          isActive: formData.is_active === "true",
        });
        showAlert("success", "Kategori berhasil ditambahkan");
      }
      fetchCategories();
      setShowModal(false);
    } catch {
      showAlert("error", "Gagal menyimpan kategori");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/categories/${id}`);
      fetchCategories();
      showAlert("success", "Kategori berhasil dihapus");
    } catch {
      showAlert("error", "Gagal menghapus kategori");
    }
  };

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between mb-6 flex-col md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Kelola Kategori Tempat</h2>
            <p className="text-gray-500 text-sm">
              Kategori wisata, kuliner, dsb.
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Cari kategori aktif..."
              className="border rounded-md px-3 py-2 text-sm w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Plus size={16} /> Tambah
            </button>
          </div>
        </div>

        {alert && (
          <AnimatedAlert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700 text-left">
              <tr>
                <th className="px-6 py-3">Gambar</th>
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((cat) => (
                <tr
                  key={cat.id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4">
                    <img
                      src={cat.image_url}
                      className="w-[150px] h-[100px] object-cover rounded"
                      alt={cat.name}
                    />
                  </td>
                  <td className="px-6 py-4">{cat.name}</td>
                  <td className="px-6 py-4 font-medium">
                    {cat.is_active ? "Aktif" : "Nonaktif"}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => openEditModal(cat)}
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
              {paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    Tidak ada kategori ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-semibold mb-4">
                {isEdit ? "Edit Kategori" : "Tambah Kategori"}
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama Kategori"
                  className="border w-full p-2 rounded"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="file"
                  className="border w-full p-2 rounded"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setUploadFile(file);
                      setFormData({
                        ...formData,
                        image_url: URL.createObjectURL(file),
                      });
                    }
                  }}
                />
                {formData.image_url && (
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="h-40 w-full object-cover rounded border"
                  />
                )}
                <select
                  className="border w-full p-2 rounded"
                  value={formData.is_active}
                  onChange={(e) =>
                    setFormData({ ...formData, is_active: e.target.value })
                  }
                >
                  <option value="true">Aktif</option>
                  <option value="false">Nonaktif</option>
                </select>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  {isEdit ? "Simpan Perubahan" : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
