/** @format */

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "@/utils/api";

interface Place {
  id: string | undefined;
  name: string;
  location: string;
  hours: string;
  category: string;
  priceEstimate: string;
  images: string[];
  sliderImagesUrl?: string[];
  rating: number;
  reviewsCount: number;
  description: string;
  mapEmbed: string;
}

export default function PlaceDetail() {
  const { id } = useParams();
  const [activeImg, setActiveImg] = useState(0);
  const [place, setPlace] = useState<Place | null>(null);
  const [others, setOthers] = useState<Place[]>([]);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await api.get(`/api/places/${id}`);
        setPlace(res.data);
      } catch (err) {
        console.error("Gagal mengambil data tempat detail", err);
      }
    };

    const fetchOthers = async () => {
      try {
        const res = await api.get("/api/places");
        setOthers(res.data.filter((p: Place) => p.id !== id));
      } catch (err) {
        console.error("Gagal mengambil tempat lainnya", err);
      }
    };

    fetchPlace();
    fetchOthers();
  }, [id]);

  return (
    <div className="w-full">
      {place?.sliderImagesUrl?.length ? (
        <div className="relative w-full h-[500px] overflow-hidden">
          {place.sliderImagesUrl.map((url, index) => (
            <img
              key={index}
              src={url}
              alt="Slider"
              className={`absolute w-full h-full object-cover transition-opacity duration-700 ${
                activeImg === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <button
            onClick={() =>
              setActiveImg(
                (activeImg - 1 + place.sliderImagesUrl!.length) %
                  place.sliderImagesUrl!.length
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2"
          >
            ◀
          </button>
          <button
            onClick={() =>
              setActiveImg((activeImg + 1) % place.sliderImagesUrl!.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2"
          >
            ▶
          </button>
        </div>
      ) : place?.images?.length ? (
        <div className="relative w-full h-[500px] overflow-hidden">
          <img
            src={place.images[0]}
            alt="Hero"
            className="w-full h-full object-cover transition-all duration-500"
          />
        </div>
      ) : null}

      <div className="px-6 py-10 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
          {place?.name}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <InfoBox title="📍 Lokasi" value={place?.location || "-"} />
          <InfoBox title="🕒 Jam Buka" value={place?.hours || "-"} />
          <InfoBox title="🏷️ Kategori" value={place?.category || "-"} />
          <InfoBox title="💰 Harga" value={place?.priceEstimate || "-"} />
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
            Deskripsi
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {place?.description}
          </p>
        </div>

        {/* Destinasi Lainnya */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Destinasi Lainnya
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {others.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  📍 {item.location}
                </p>
                <p className="text-sm text-yellow-500">
                  ⭐ {item.rating.toFixed(1)} ({item.reviewsCount} ulasan)
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <p className="text-sm text-gray-600 dark:text-gray-300">{title}</p>
      <p className="font-semibold text-gray-800 dark:text-white">{value}</p>
    </div>
  );
}
