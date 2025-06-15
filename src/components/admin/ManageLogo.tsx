/** @format */

import { useState } from "react";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

export default function ManageLogo() {
  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!logo) return toast.error("Pilih file logo terlebih dahulu.");

    const formData = new FormData();
    formData.append("logo", logo);

    try {
      await api.post("/admin/content/logo", formData);
      toast.success("Logo berhasil diperbarui!");
    } catch {
      toast.error("Gagal mengunggah logo.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Ganti Logo Website
      </h2>

      {preview && (
        <img
          src={preview}
          alt="Preview Logo"
          className="h-20 object-contain mb-4"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Upload Logo
      </button>
    </div>
  );
}
