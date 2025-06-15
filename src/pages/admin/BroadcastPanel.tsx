/**
 * ----------------------------------
 *   FILE: src/pages/admin/BroadcastPanel.tsx
 * ----------------------------------
 *
 * @format
 */

import AdminLayout from "@/components/admin/AdminLayout";
import BroadcastForm from "@/components/admin/BroadcastForm";

export default function BroadcastPanel() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Kirim Notifikasi / Info
        </h1>
        <BroadcastForm />
      </div>
    </AdminLayout>
  );
}
