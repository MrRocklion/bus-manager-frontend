import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string; // gradient tailwind class, e.g. "from-emerald-500 to-teal-400"
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className={`h-2 bg-gradient-to-r ${color}`} />

      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>

        <div className="flex justify-between items-center">
          <div className="text-3xl font-bold text-gray-800">{value}</div>
          <div className="bg-gray-50 p-3 rounded-lg">{icon}</div>
        </div>
      </div>
    </div>
  );
};
