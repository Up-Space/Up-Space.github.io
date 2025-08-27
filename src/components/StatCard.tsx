import React from "react";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

// Map of icon keys to Heroicons components
const iconMap = {
  "academic-cap": <AcademicCapIcon className="w-6 h-6" />,
  "briefcase": <BriefcaseIcon className="w-6 h-6" />,
  "globe": <GlobeAltIcon className="w-6 h-6" />,
  "code-bracket": <CodeBracketIcon className="w-6 h-6" />,
  "device-mobile": <DevicePhoneMobileIcon className="w-6 h-6" />,
  "book-open": <BookOpenIcon className="w-6 h-6" />,
};

type IconKey = keyof typeof iconMap;

interface StatCardProps {
  title: string;
  value: string;
  icon: IconKey;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300 animate-fade-in">
    <div className="text-blue-600">{iconMap[icon as IconKey]}</div>
    <div>
      <h4 className="text-lg font-semibold text-gray-700">{title}</h4>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);