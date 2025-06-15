/** @format */

import AdminLayout from "@/components/admin/AdminLayout";
import ContentSection from "@/components/admin/ContentSection";
import LogoSection from "@/components/admin/LogoSection"; // ⬅️ import komponen logo

export default function ManageContent() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Kelola Konten Halaman Utama
        </h1>
        <div className="space-y-6">
          <LogoSection />
          <ContentSection title="Slider Beranda" />
        </div>
      </div>
    </AdminLayout>
  );
}
