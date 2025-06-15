/** @format */

import { Link } from "react-router-dom";

interface PlaceCardProps {
  id: number;
  name: string;
  location: string;
  image: string;
  rating?: number;
  reviewsCount?: number;
}

export default function PlaceCard({
  id,
  name,
  location,
  image,
  rating = 4.5,
  reviewsCount = 123,
}: PlaceCardProps) {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Gambar */}
      <div className="w-full aspect-[16/9] max-h-[450px] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Konten */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{location}</p>

        <div className="flex items-center justify-between mt-2">
          {/* ⭐ Rating */}
          <div className="flex items-center text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-current mr-1"
                viewBox="0 0 24 24"
                fill={i < Math.round(rating) ? "currentColor" : "none"}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.2 6.772h7.117c.969 0 1.371 1.24.588 1.81l-5.757 4.205 2.2 6.772c.3.921-.755 1.688-1.54 1.118L12 18.347l-5.76 4.257c-.784.57-1.838-.197-1.539-1.118l2.2-6.772-5.757-4.205c-.783-.57-.38-1.81.588-1.81h7.117l2.2-6.772z"
                />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {rating.toFixed(1)} · {reviewsCount} ulasan
            </span>
          </div>

          {/* 🔘 Tombol Lihat Detail */}
          <Link
            to={`/place/${id}`}
            className="text-sm text-blue-700 dark:text-blue-400 hover:underline font-medium"
          >
            Lihat Detail →
          </Link>
        </div>
      </div>
    </div>
  );
}
