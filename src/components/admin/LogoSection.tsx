/** @format */

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

export default function LogoSection() {
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  // Ambil logo dari database
  const fetchLogo = async () => {
    try {
      const res = await api.get("/api/admin/content/website-logo");
      setLogoUrl(res.data.logo_url || "");
    } catch (err) {
      console.error("❌ Gagal ambil logo:", err);
      toast.error("Gagal mengambil logo.");
    }
  };

  // Upload gambar dan simpan URL logo
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warning("Pilih file terlebih dahulu.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", selectedFile); // harus pakai key 'image'

      // ✅ Gunakan endpoint yang benar
      const uploadRes = await api.post("/api/upload/cover", formData);
      const imageUrl = uploadRes.data.url;

      await api.post("/api/admin/content/website-logo", {
        logo_url: imageUrl,
      });

      toast.success("Logo berhasil diperbarui!");
      setLogoUrl(imageUrl);
      setSelectedFile(null);
      setPreview("");
    } catch (err) {
      console.error("❌ Upload logo gagal:", err);
      toast.error("Gagal upload logo.");
    }
  };

  // Hapus logo
  const handleDelete = async () => {
    try {
      await api.post("/api/admin/content/website-logo", {
        logo_url: "",
      });
      toast.success("Logo dihapus.");
      setLogoUrl("");
    } catch (err) {
      console.error("❌ Hapus logo gagal:", err);
      toast.error("Gagal menghapus logo.");
    }
  };

  useEffect(() => {
    fetchLogo();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-semibold">Logo Website</h2>

      {/* Logo aktif */}
      {logoUrl && (
        <div className="flex items-center gap-4">
          <img src={logoUrl} alt="Logo Website" className="h-16" />
          <button className="btn btn-sm btn-error" onClick={handleDelete}>
            Hapus Logo
          </button>
        </div>
      )}

      {/* Upload form */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          setSelectedFile(file);
          setPreview(file ? URL.createObjectURL(file) : "");
        }}
        className="file-input file-input-bordered w-full"
      />

      {/* Preview sebelum simpan */}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="h-20 object-contain border rounded-lg"
        />
      )}

      {/* Tombol simpan */}
      <button
        onClick={handleUpload}
        className="btn btn-primary w-full disabled:opacity-50"
        disabled={!selectedFile}
      >
        Simpan Logo
      </button>
    </div>
  );
}
