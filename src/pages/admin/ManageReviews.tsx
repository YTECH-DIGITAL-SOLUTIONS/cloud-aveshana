/**
 * ----------------------------------
 *   FILE: src/pages/admin/ManageReviews.tsx
 * ----------------------------------
 *
 * @format
 */

import AdminLayout from "@/components/admin/AdminLayout";
import TableReviews from "@/components/admin/TableReviews";

export default function ManageReviews() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Kelola Ulasan dan Rating
        </h1>
        <TableReviews />
      </div>
    </AdminLayout>
  );
}
