/** @format */
import { toast } from "react-toastify";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import TablePlaces from "@/components/admin/TablePlaces";
import PlaceFormModal from "@/components/admin/PlaceFormModal";

interface Place {
  id: number;
  name: string;
  category: string;
  location: string;
  openHour: string;
  closeHour: string;
  price: string;
  description: string;
  mapsUrl: string;
  imageUrl: string;
  sliderImagesUrl?: string[];
  status: string;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}

export default function ManagePlaces() {
  const [openForm, setOpenForm] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [reload, setReload] = useState(false); // ⬅️ untuk refresh tabel

  const handleOpenAdd = () => {
    setSelectedPlace(null); // kosongkan data
    setOpenForm(true); // buka modal tambah
  };

  const handleEdit = (place: Place) => {
    setSelectedPlace(place); // set data tempat yang akan diedit
    setOpenForm(true);
  };

  const handleAddSuccess = () => {
    setOpenForm(false); // tutup modal
    setSelectedPlace(null);
    setReload((prev) => !prev); // ⬅️ trigger reload tabel
  };

  const handleAddFail = () => {
    toast.error("Gagal menyimpan data. Silakan cek kembali.");
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-none px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Kelola Tempat Wisata
          </h1>

          <div className="flex w-full sm:w-auto gap-3">
            <input
              type="text"
              placeholder="Cari tempat wisata..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <button
              onClick={handleOpenAdd}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition whitespace-nowrap"
            >
              + Tambah Tempat
            </button>
          </div>
        </div>

        {/* Tabel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <TablePlaces
            searchTerm={search}
            onEdit={handleEdit}
            reload={reload}
          />
        </div>

        {/* Modal Tambah/Edit */}
        {openForm && (
          <PlaceFormModal
            onClose={() => setOpenForm(false)}
            onSuccess={handleAddSuccess}
            onFail={handleAddFail}
            initialData={selectedPlace || undefined}
          />
        )}
      </div>
    </AdminLayout>
  );
}
