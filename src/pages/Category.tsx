import { useParams, Link } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";
import { categories } from "@/data/inzovu";
import { useProducts } from "@/contexts/ProductContext";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function Category() {
  const { products } = useProducts();
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);
  const items = products.filter((p) => p.categorySlug === slug && p.available !== false);

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">😞</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Category not found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find that category.</p>
          <Link to="/shop" className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10 text-center">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Shop", to: "/shop" }, { label: category.title }]} />
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Fresh <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">{category.title}</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our premium selection of {category.title.toLowerCase()}, sourced directly from local farms for maximum freshness and flavor.
            Quality you can taste in every bite.
          </p>
        </header>
        {/* Responsive grid for all screen sizes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 mt-10">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
