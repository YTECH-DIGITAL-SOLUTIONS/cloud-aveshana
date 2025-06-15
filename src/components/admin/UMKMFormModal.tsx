/** @format */

interface UMKMFormModalProps {
  onClose: () => void;
}

export default function UMKMFormModal({ onClose }: UMKMFormModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-xl">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Tambah UKM Baru
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nama UKM"
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Kategori"
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Lokasi"
            className="w-full border px-4 py-2 rounded-md"
          />
          <textarea
            placeholder="Deskripsi"
            className="w-full border px-4 py-2 rounded-md"
          ></textarea>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-900 text-white hover:bg-blue-800"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
