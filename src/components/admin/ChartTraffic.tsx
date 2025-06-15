/** @format */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Sen", visitor: 400 },
  { name: "Sel", visitor: 800 },
  { name: "Rab", visitor: 600 },
  { name: "Kam", visitor: 1400 },
  { name: "Jum", visitor: 900 },
  { name: "Sab", visitor: 700 },
  { name: "Min", visitor: 1000 },
];

export default function ChartTraffic() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
        Traffic Pengunjung (mingguan)
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="visitor"
            stroke="#2563EB"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
