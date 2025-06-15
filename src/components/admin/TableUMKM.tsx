/** @format */

export default function TableUMKM() {
  const data = [
    { id: 1, name: "Bakso Malang", category: "Makanan", location: "Surabaya" },
    {
      id: 2,
      name: "Sate Lilit Bali",
      category: "Makanan",
      location: "Denpasar",
    },
  ];

  return (
    <div className="overflow-x-auto rounded-md shadow bg-white dark:bg-gray-800">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
          <tr>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Kategori</th>
            <th className="px-4 py-2">Lokasi</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-t border-gray-200 dark:border-gray-600"
            >
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.category}</td>
              <td className="px-4 py-2">{item.location}</td>
              <td className="px-4 py-2 space-x-2">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
