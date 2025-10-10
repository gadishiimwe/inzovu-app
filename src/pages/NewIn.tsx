import { useProducts } from "@/contexts/ProductContext";
import { useCategories } from "@/contexts/CategoryContext";
import ProductCard from "@/components/product/ProductCard";
import { Link } from "react-router-dom";
import CategorySidebar from "@/components/common/CategorySidebar";
import { Link } from "react-router-dom";

export default function NewIn() {
  const { products } = useProducts();
  // Show all available products
  const newProducts = products.filter(p => p.available !== false).slice(0, 12);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-6 py-3 rounded-full mb-6 shadow-lg">
            <span className="text-2xl">✨</span>
            <span className="text-sm font-bold uppercase tracking-wider">New Arrivals</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Fresh <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">New Arrivals</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our latest additions! Fresh products just arrived, handpicked for quality and taste.
          </p>
        </header>

        <div className="flex gap-8">
          <div className="hidden lg:block">
            <CategorySidebar />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
              {newProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
