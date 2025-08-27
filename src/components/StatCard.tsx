import React from "react";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
  "academic-cap": <AcademicCapIcon className="w-6 h-6" />,
  "briefcase": <BriefcaseIcon className="w-6 h-6" />,
  "globe": <GlobeAltIcon className="w-6 h-6" />,
};

interface StatCardProps {
  title: string;
  value: string;
  icon: keyof typeof iconMap;
}

export const StatCard: React.FC < StatCardProps > = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
    <div className="text-blue-600">{iconMap[icon]}</div>
    <div>
      <h4 className="text-lg font-semibold text-gray-700">{title}</h4>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);