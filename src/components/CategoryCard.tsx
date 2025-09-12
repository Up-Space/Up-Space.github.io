import React from "react";
import { iconMap, defaultIcon } from "../lib/icon-map";

interface CategoryCardProps {
  title: string;
  description: string;
  slug: string;
}

export const CategoryCard: React.FC < CategoryCardProps > = ({
  title,
  description,
  slug,
}) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="text-purple-600 mb-4">{iconMap[slug] || defaultIcon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);
