/** @format */

import { CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  type: "success" | "error";
  message: string;
  title?: string;
  duration?: number;
  onClose: () => void;
}

export default function AnimatedAlert({
  type,
  message,
  duration = 3000,
  onClose,
}: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const baseStyle =
    "fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300";
  const contentStyle = `
    flex flex-col items-center text-center
    px-8 py-6 rounded-xl shadow-xl backdrop-blur-md border
    max-w-md w-full
    ${
      type === "success"
        ? "bg-green-50 text-green-800 border-green-300"
        : "bg-red-50 text-red-800 border-red-300"
    }
    ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
  `;

  return (
    <div className={baseStyle}>
      <div className={contentStyle}>
        {type === "success" ? (
          <CheckCircle
            size={60}
            className="text-green-600 mb-4 animate-bounce"
          />
        ) : (
          <XCircle size={60} className="text-red-600 mb-4 animate-ping" />
        )}
        <h3 className="text-xl font-bold mb-1">
          {type === "success" ? "Berhasil" : "Gagal"}
        </h3>
        <p className="text-sm mb-4">{message}</p>
        <button
          onClick={() => setVisible(false)}
          className={`px-4 py-2 rounded font-medium text-white ${
            type === "success"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
