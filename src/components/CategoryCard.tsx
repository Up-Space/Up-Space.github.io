import React from "react";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
  "academic-cap": <AcademicCapIcon className="w-8 h-8" />,
  "briefcase": <BriefcaseIcon className="w-8 h-8" />,
  "globe": <GlobeAltIcon className="w-8 h-8" />,
};

interface CategoryCardProps {
  title: string;
  description: string;
  icon: keyof typeof iconMap;
}

export const CategoryCard: React.FC < CategoryCardProps > = ({
  title,
  description,
  icon,
}) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="text-purple-600 mb-4">{iconMap[icon]}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);