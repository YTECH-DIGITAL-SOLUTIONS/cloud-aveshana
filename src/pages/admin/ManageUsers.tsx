/** @format */

import AdminLayout from "@/components/admin/AdminLayout";
import TableUsers from "@/components/admin/TableUsers";
import UserFormModal from "@/components/admin/UserFormModal";
import { Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";

export default function ManageUsers() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [openForm, setOpenForm] = useState(false);

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  const handleAddUser = () => {
    setOpenForm(true);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              👥 Manajemen Pengguna
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Kelola semua akun pengguna & admin dalam sistem.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg shadow-sm"
            >
              <RefreshCcw size={16} />
              Refresh
            </button>
            <button
              onClick={handleAddUser}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
            >
              <Plus size={16} />
              Tambah Pengguna
            </button>
          </div>
        </div>

        {/* Tabel Pengguna */}
        <TableUsers refreshKey={refreshKey} />

        {/* Modal Tambah User */}
        {openForm && (
          <UserFormModal
            onClose={() => setOpenForm(false)}
            onSuccess={() => {
              handleRefresh();
              setOpenForm(false);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}
