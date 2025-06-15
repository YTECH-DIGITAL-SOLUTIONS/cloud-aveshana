/** @format */

interface FilterBarProps {
  selected: string;
  onSelect: (val: string) => void;
}

const categories = [
  "All",
  "Wisata Alam",
  "UMKM Makanan",
  "Tempat Hiburan",
  "Layanan Publik",
];

export default function FilterBar({ selected, onSelect }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full border ${
            selected === cat
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border-gray-300"
          } hover:bg-blue-50`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
