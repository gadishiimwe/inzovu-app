import { useParams, Link } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";
import { useProducts } from "@/contexts/ProductContext";
import { useCategories } from "@/contexts/CategoryContext";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function Category() {
  const { products } = useProducts();
  const { categories } = useCategories();
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
        <div className="flex gap-8 mt-10">
          <aside className="w-64 hidden lg:block bg-white rounded-2xl shadow-xl border border-gray-100 p-6 h-fit sticky top-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-lg">🏷️</span>
              </div>
              <h3 className="font-bold text-lg text-gray-800">Categories</h3>
            </div>
            <ul className="space-y-1">
              {categories.map((c) => {
                const isActive = c.slug === slug;
                return (
                  <li key={c.slug}>
                    <Link
                      to={`/category/${c.slug}`}
                      className={`group relative flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 font-medium ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600 hover:shadow-sm'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full transition-colors ${
                        isActive ? 'bg-white' : 'bg-gray-300 group-hover:bg-blue-400'
                      }`}></div>
                      <span className="flex-1">{c.title}</span>
                      {isActive && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Responsive grid for all screen sizes */}
          <section className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
