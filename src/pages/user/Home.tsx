/** @format */

import { useState, useEffect } from "react";
import PlaceCard from "@/components/user/PlaceCard";
import { FaSearch } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const banners = [
  "/banner/banner1.jpg",
  "/banner/banner2.jpg",
  "/banner/banner3.jpg",
];

const categoryImages = [
  {
    name: "Tempat Wisata",
    image: "/categories/tw.jpg",
    link: "/explore?category=wisata",
  },
  {
    name: "Kuliner Lokal",
    image: "/categories/kl.jpg",
    link: "/explore?category=kuliner",
  },
  {
    name: "UMKM",
    image: "/categories/umkm.jpeg",
    link: "/explore?category=umkm",
  },
  {
    name: "Tempat Umum",
    image: "/categories/tm.jpeg",
    link: "/explore?category=umum",
  },
  {
    name: "Taman & Alam",
    image: "/categories/ta.jpg",
    link: "/explore?category=taman",
  },
  {
    name: "Belanja",
    image: "/categories/bp.jpg",
    link: "/explore?category=belanja",
  },
  {
    name: "Layanan Publik",
    image: "/categories/lp.jpg",
    link: "/explore?category=layanan",
  },
  {
    name: "Transportasi",
    image: "/categories/tp.jpg",
    link: "/explore?category=transportasi",
  },
];

const trendingImages = [
  "/images/pandawa.jpeg",
  "/images/bromo.webp",
  "/images/danautoba.webp",
  "/images/nasirina.jpg",
];

const categoryPlaces = {
  "Wisata Alam": [
    {
      id: 1,
      name: "Pantai Pandawa",
      image: "/images/pandawa.jpeg",
      location: "Bali",
      rating: 4.8,
      reviews: 237,
    },
    {
      id: 4,
      name: "Gunung Bromo",
      image: "/images/bromo.webp",
      location: "Jawa Timur",
      rating: 4.7,
      reviews: 321,
    },
    {
      id: 5,
      name: "Danau Toba",
      image: "/images/danautoba.webp",
      location: "Sumatera Utara",
      rating: 4.6,
      reviews: 201,
    },
  ],
  "UKM Makanan": [
    {
      id: 2,
      name: "Warung Nasi Ibu Rina",
      image: "/images/nasirina.jpg",
      location: "Yogyakarta",
      rating: 4.5,
      reviews: 120,
    },
    {
      id: 6,
      name: "Bakso Pak Kumis",
      image: "/images/bakso.webp",
      location: "Semarang",
      rating: 4.4,
      reviews: 95,
    },
    {
      id: 7,
      name: "Ayam Geprek Mbak Nita",
      image: "/images/ayamgeprek.jpg",
      location: "Surabaya",
      rating: 4.3,
      reviews: 110,
    },
  ],
};

export default function Home() {
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Slider */}
      <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden animate-fade-up">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {banners.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Banner ${index}`}
              className="min-w-full h-[500px] lg:h-[600px] object-cover"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-6 lg:px-24">
          <h1 className="text-3xl lg:text-5xl font-bold text-white max-w-3xl mb-4">
            Jelajahi Tempat Wisata & UMKM di Sekitarmu
          </h1>
          <p className="text-white text-lg mb-6 max-w-xl">
            Temukan rekomendasi tempat terbaik sesuai minat dan lokasi kamu
          </p>
          <a
            href="/explore"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg w-fit hover:bg-gray-100 transition"
          >
            Jelajahi Sekarang
          </a>
        </div>
        <button
          onClick={() =>
            setActive((active - 1 + banners.length) % banners.length)
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-black rounded-full p-3 hover:bg-white"
        >
          ◀
        </button>
        <button
          onClick={() => setActive((active + 1) % banners.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-black rounded-full p-3 hover:bg-white"
        >
          ▶
        </button>
      </div>

      {/* Tempat Trending */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-up">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Bhumi Aveshana
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Jelajahi berbagai tempat di Indonesia mulai dari
            <br />
            <TypeAnimation
              sequence={categoryImages.flatMap((cat) => [cat.name, 2500])}
              speed={60}
              repeat={Infinity}
              wrapper="span"
              className="ml-2 font-semibold text-blue-600"
            />
          </p>
        </div>
        <div className="w-full overflow-hidden rounded-xl shadow-lg">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {trendingImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Trending ${index}`}
                className="min-w-full h-64 object-cover"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Jenis Tempat */}
      <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-up">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Jenis Tempat
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoryImages.map((cat) => (
            <a
              key={cat.name}
              href={cat.link}
              className="relative rounded-xl overflow-hidden h-[120px] group shadow-md hover:shadow-lg transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {cat.name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 pb-6 animate-fade-up">
        <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
          <input
            type="text"
            placeholder="Cari UMKM, tempat makan, pelayanan..."
            className="w-full bg-transparent py-4 pl-5 pr-14 text-sm text-gray-800 dark:text-white focus:outline-none rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Rekomendasi Berdasarkan Kategori */}
      <div className="max-w-7xl mx-auto px-4 py-16 animate-fade-up">
        {Object.entries(categoryPlaces).map(([category, items]) => (
          <div key={category} className="mb-16">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {category}
              </h2>
              <a
                href={`/explore?category=${encodeURIComponent(category)}`}
                className="text-sm text-blue-600 hover:underline"
              >
                Lihat Semua →
              </a>
            </div>
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex gap-6 min-w-full pb-1">
                {items.map((place) => (
                  <div
                    key={place.id}
                    className="min-w-[320px] max-w-sm"
                    data-aos="fade-up"
                  >
                    <PlaceCard {...place} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
