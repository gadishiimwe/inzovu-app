import { useMemo } from "react";
import ProductCard from "@/components/product/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/inzovu";
import { Link, useLocation } from "react-router-dom";
import { useProducts } from "@/contexts/ProductContext";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Shop() {
  const { products } = useProducts();
  const q = useQuery().get("q")?.toLowerCase() || "";
  const filtered = q
    ? products.filter((p) => p.name.toLowerCase().includes(q) && p.available !== false)
    : products.filter(p => p.available !== false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10 text-center">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Shop" }]} />
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Discover Our Fresh Selection
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Explore our wide range of premium quality groceries, from farm-fresh produce to artisanal bakery items.
            Everything you need for healthy, delicious meals.
          </p>
          <div className="max-w-lg mx-auto shadow-lg rounded-full overflow-hidden">
            <Input aria-label="Search products" defaultValue={q} placeholder="Search products by name" className="border-0 bg-white h-12 text-lg px-6" onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const value = (e.target as HTMLInputElement).value;
                window.location.href = value ? `/shop?q=${encodeURIComponent(value)}` : '/shop';
              }
            }} />
          </div>
        </header>

        <div className="flex gap-8 mt-10">
          <aside className="w-64 hidden lg:block bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-8">
            <h3 className="font-bold text-xl mb-4 text-gray-800">Categories</h3>
            <ul className="space-y-3">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link to={`/category/${c.slug}`} className="block py-2 px-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors duration-200 font-medium">{c.title}</Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Responsive grid for all screen sizes */}
          <section className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500">Try another search or browse our categories.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {filtered.map((p) => (
                  <Card key={p.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white border-0 rounded-2xl">
                    <CardContent className="p-3">
                      <ProductCard product={p} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
