/** @format */

import { useState, useMemo } from "react";
import PlaceCard from "@/components/user/PlaceCard";
import HeroSlider from "@/components/user/HeroSlider";
import { FaSearch } from "react-icons/fa";

// Slider Data
const sliderData = [
  {
    image: "/banner/banner1.jpg",
    text: "Jelajahi tempat yang ingin kamu kunjungi di sini",
    subText: "Temukan UMKM, wisata alam, & pelayanan umum terbaik",
  },
  {
    image: "/banner/banner2.jpg",
    text: "Temukan UKM makanan dan wisata favoritmu",
    subText: "Sesuai minat dan lokasi kamu",
  },
];

const places = [
  {
    id: 1,
    name: "Pantai Pandawa",
    image: "/images/pandawa.jpeg",
    location: "Bali",
    rating: 4.8,
    reviews: 237,
    category: "Wisata Alam",
  },
  {
    id: 2,
    name: "Warung Nasi Ibu Rina",
    image: "/images/nasirina.jpg",
    location: "Yogyakarta",
    rating: 4.5,
    reviews: 120,
    category: "UKM Makanan",
  },
  {
    id: 3,
    name: "Candi Borobudur",
    image: "/images/borobudur.jpeg",
    location: "Magelang",
    rating: 4.9,
    reviews: 317,
    category: "Tempat Hiburan",
  },
];

const categories = [
  "Wisata Alam",
  "UKM Makanan",
  "Tempat Hiburan",
  "Pelayanan Umum",
];

export default function Explore() {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (category: string) => {
    setActiveFilters((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchCategory =
        activeFilters.length === 0 || activeFilters.includes(place.category);
      const matchSearch = place.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [search, activeFilters]);

  return (
    <div className="w-full">
      {/* ✅ Full-Width Hero Slider */}
      <HeroSlider slides={sliderData} />

      {/* 🔍 Search & Filter */}
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="relative mb-8 group">
          <input
            type="text"
            placeholder="Cari UMKM, tempat makan, pelayanan..."
            className="w-full border border-gray-300 dark:border-gray-700 rounded-full py-3 pl-5 pr-14 text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition" />
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ease-in-out ${
                activeFilters.includes(category)
                  ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Daftar Tempat */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place) => (
              <div data-aos="fade-up" key={place.id}>
                <PlaceCard
                  id={place.id}
                  name={place.name}
                  image={place.image}
                  location={place.location}
                  rating={place.rating}
                  reviewsCount={place.reviews}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-300 animate-pulse">
              <p className="text-lg font-medium">
                🤔 Tidak ada tempat ditemukan
              </p>
              <p className="text-sm">
                Coba ubah kata kunci atau filter kategori
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
