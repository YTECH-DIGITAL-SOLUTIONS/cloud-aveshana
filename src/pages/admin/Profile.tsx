/**
 * ----------------------------------
 *   FILE: src/pages/admin/Profile.tsx
 * ----------------------------------
 *
 * @format
 */

import AdminLayout from "@/components/admin/AdminLayout";
import { Link } from "react-router-dom";

export default function ProfileAdmin() {
  return (
    <AdminLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Profil Admin
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-6">
          <div className="flex items-center gap-6">
            <img
              src="https://ui-avatars.com/api/?name=Admin+Bhumi&background=0D8ABC&color=fff"
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Admin Bhumi
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                admin@bhumiaveshana.id
              </p>
            </div>
          </div>

          <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <p>
              <strong>Role:</strong> Administrator
            </p>
            <p>
              <strong>Dibuat pada:</strong> 1 Januari 2024
            </p>
            <p>
              <strong>Terakhir login:</strong> 2 Juni 2025, 22:30 WIB
            </p>
          </div>

          <div className="flex justify-end">
            <Link
              to="/admin/edit-profile"
              className="px-4 py-2 rounded-md bg-blue-900 text-white hover:bg-blue-800"
            >
              Edit Profil
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
