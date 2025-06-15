/**
 * ----------------------------------
 *   FILE: src/pages/admin/ReviewApproval.tsx
 * ----------------------------------
 *
 * @format
 */

import AdminLayout from "@/components/admin/AdminLayout";
import TableReviewApproval from "@/components/admin/TableReviewApproval";

export default function ReviewApproval() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Persetujuan Rekomendasi Tempat
        </h1>
        <TableReviewApproval />
      </div>
    </AdminLayout>
  );
}
