import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCategories } from "@/contexts/CategoryContext";

export default function CategorySidebar() {
  const { categories } = useCategories();
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-lg rounded-lg p-6 h-fit">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => {
          const isActive = location.pathname === `/category/${category.slug}`;
          return (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {category.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
