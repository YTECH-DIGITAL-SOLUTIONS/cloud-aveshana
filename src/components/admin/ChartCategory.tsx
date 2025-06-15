/** @format */

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Kuliner", value: 400 },
  { name: "Wisata Alam", value: 300 },
  { name: "Budaya", value: 300 },
  { name: "Lainnya", value: 200 },
];

const COLORS = ["#0ea5e9", "#14b8a6", "#f97316", "#a855f7"];

export default function ChartCategory() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
        Kategori Tempat Populer
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
