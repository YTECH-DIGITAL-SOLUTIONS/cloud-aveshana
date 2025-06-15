/** @format */

interface StatsCardProps {
  title: string;
  value: string;
}

export default function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4">
      <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
      <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-400">
        {value}
      </h2>
    </div>
  );
}
