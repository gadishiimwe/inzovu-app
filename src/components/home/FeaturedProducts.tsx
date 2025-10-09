import { Link } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useProducts } from "@/contexts/ProductContext";

export default function FeaturedProducts() {
  const { products } = useProducts();
  const featuredProducts = products.filter(p => p.available !== false).slice(0, 8);

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 fill-yellow-500" />
            <span className="text-yellow-600 font-bold uppercase tracking-wider text-base sm:text-lg">Featured Products</span>
            <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 fill-yellow-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Fresh Picks</span> for You
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Handpicked premium quality fruits and vegetables, sourced directly from local farms for maximum freshness and flavor.
          </p>
        </div>

        {/* Products Grid - card surround + subtle separators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 mb-8 sm:mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/shop">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-xl sm:text-2xl px-8 sm:px-12 py-6 sm:py-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 group w-full sm:w-auto touch-manipulation font-bold">
              View All Products
              <ArrowRight className="ml-3 h-6 w-6 sm:h-8 sm:w-8 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
