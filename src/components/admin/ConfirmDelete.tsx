/** @format */

import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

interface ConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

export default function ConfirmDelete({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: ConfirmDeleteProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Dialog Panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg transition-all">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-bold text-red-600">
              Konfirmasi Hapus
            </Dialog.Title>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
            </button>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Yakin ingin menghapus{" "}
            <span className="font-semibold">{itemName}</span>?<br />
            Tindakan ini tidak dapat dibatalkan.
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
            >
              Batal
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Hapus
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
