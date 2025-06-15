/** @format */

import { useParams } from "react-router-dom";

export default function PlaceDetail() {
  const { id } = useParams();

  const place = {
    id,
    name: "Pantai Pandawa",
    location: "Bali",
    image: "/images/pandawa.jpg",
    rating: 4.8,
    reviewsCount: 237,
    description:
      "Pantai Pandawa adalah pantai tersembunyi di balik tebing di Bali selatan. Cocok untuk berenang, bersantai, dan menikmati pemandangan laut yang indah.",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126757.999...SISA_LINK_MAP",
  };

  const reviews = [
    {
      id: 1,
      user: "agus123",
      rating: 5,
      comment: "Tempatnya bersih dan nyaman banget!",
    },
    {
      id: 2,
      user: "rina88",
      rating: 4,
      comment: "Bagus tapi agak ramai waktu weekend.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      {/* Gambar */}
      <div className="rounded-xl overflow-hidden shadow-lg">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Informasi Tempat */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {place.name}
        </h1>
        <p className="text-gray-500 dark:text-gray-300">{place.location}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill={i < Math.round(place.rating) ? "currentColor" : "none"}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.2 6.772h7.117c.969 0 1.371 1.24.588 1.81l-5.757 4.205 
                  2.2 6.772c.3.921-.755 1.688-1.54 1.118L12 18.347l-5.76 4.257c-.784.57-1.838-.197-1.539-1.118l2.2-6.772
                  -5.757-4.205c-.783-.57-.38-1.81.588-1.81h7.117l2.2-6.772z"
                />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {place.rating.toFixed(1)} · {place.reviewsCount} ulasan
            </span>
          </div>

          {/* ❤️ Wishlist */}
          <button className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200">
            + Simpan ke Wishlist
          </button>
        </div>

        <p className="text-gray-700 dark:text-gray-200 leading-relaxed mt-4">
          {place.description}
        </p>
      </div>

      {/* 🗺️ Google Map */}
      <div>
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
          Lokasi di Peta
        </h2>
        <div className="aspect-video w-full rounded-lg overflow-hidden shadow">
          <iframe
            src={place.mapEmbed}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* 📝 Ulasan User */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Ulasan Pengunjung
        </h2>
        <div className="space-y-4">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
            >
              <p className="font-semibold text-gray-800 dark:text-white">
                {r.user}
              </p>
              <p className="text-yellow-500">
                {"⭐".repeat(r.rating)}{" "}
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  ({r.rating}/5)
                </span>
              </p>
              <p className="text-gray-700 dark:text-gray-200 mt-1">
                {r.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
