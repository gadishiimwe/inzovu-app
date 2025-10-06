import { useProducts } from "@/contexts/ProductContext";
import ProductCard from "@/components/product/ProductCard";
import { Card, CardContent } from "@/components/ui/card";

export default function GoodStuff() {
  const { products } = useProducts();
  // Show featured/premium products (you can add a featured flag to products later)
  const goodProducts = products.slice(0, 16);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-6 py-3 rounded-full mb-6 shadow-lg">
            <span className="text-2xl">🌟</span>
            <span className="text-sm font-bold uppercase tracking-wider">Good Stuff</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Premium <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Good Stuff</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our handpicked selection of premium products. The best quality items we're proud to offer.
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {goodProducts.map((p) => (
            <Card key={p.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white border-0 rounded-2xl">
              <CardContent className="p-3">
                <ProductCard product={p} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
