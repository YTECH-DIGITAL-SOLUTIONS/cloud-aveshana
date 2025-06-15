/** @format */

import { useState } from "react";
import TableUMKM from "@/components/admin/TableUMKM";
import UMKMFormModal from "@/components/admin/UMKMFormModal";

export default function ManageUMKM() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Kelola UKM Makanan
        </h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
        >
          Tambah UKM
        </button>
      </div>

      <TableUMKM />

      {open && <UMKMFormModal onClose={() => setOpen(false)} />}
    </div>
  );
}
