/** @format */

import { type ChangeEvent, useState, useEffect } from "react";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

interface UserFormModalProps {
  onClose: () => void;
  onSuccess: () => void;
  initialData?: UserFormData | null;
}

export interface UserFormData {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "user";
  status: "Aktif" | "Nonaktif";
  profile_picture?: string;
}

export default function UserFormModal({
  onClose,
  onSuccess,
  initialData,
}: UserFormModalProps) {
  const [form, setForm] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    role: "user",
    status: "Aktif",
    profile_picture: "",
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      setForm({
        id: initialData.id,
        name: initialData.name || "",
        email: initialData.email || "",
        password: "",
        role: initialData.role || "user",
        status: initialData.status || "Aktif",
        profile_picture: initialData.profile_picture || "",
      });
      setPreview(initialData.profile_picture || "");
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post("/upload/users", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm((prev) => ({
        ...prev,
        profile_picture: res.data.url,
      }));
      setPreview(res.data.url);
      toast.success("Foto profil berhasil diunggah");
    } catch (err) {
      toast.error("Gagal upload foto profil");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || (!initialData && !form.password)) {
      return toast.error("Nama, email, dan password wajib diisi");
    }

    try {
      setLoading(true);

      if (!initialData) {
        await api.post("/admin/users", form);
        toast.success("Pengguna berhasil ditambahkan");
      } else {
        if (initialData.role === "user") {
          await api.put(`/admin/users/${form.id}`, form);
          toast.success("Pengguna berhasil diperbarui");
        } else {
          toast.warning("Data admin tidak bisa diedit dari sini");
          return;
        }
      }

      onSuccess();
    } catch (err: any) {
      const message = err?.response?.data?.error || "Gagal menyimpan pengguna";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-md p-6 shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Pengguna" : "Tambah Pengguna"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Foto Profil */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Foto Profil
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-20 h-20 object-cover rounded-full border"
              />
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Nama</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
              required
            />
          </div>

          {!initialData && (
            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm"
                required
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
              disabled={!!initialData}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            >
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border text-sm"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
