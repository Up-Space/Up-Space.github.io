import React from "react";
import { iconMap, defaultIcon } from "../lib/icon-map";

interface StatCardProps {
  title: string;
  value: string;
  icon: string; // Changed to string to be compatible with the iconMap keys
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300 animate-fade-in">
    <div className="text-blue-600">{iconMap[icon] || defaultIcon}</div>
    <div>
      <h4 className="text-lg font-semibold text-gray-700">{title}</h4>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);
