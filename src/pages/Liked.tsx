import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import type { Product } from "@/data/inzovu";
import { products } from "@/data/inzovu";

export default function Liked() {
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem("liked") || "[]");
    const likedProductDetails = liked.map((id: string) =>
      products.find(p => p.id === id)
    ).filter(Boolean);
    setLikedProducts(likedProductDetails);
  }, []);

  const removeFromLiked = (productId: string) => {
    const liked = JSON.parse(localStorage.getItem("liked") || "[]");
    const updated = liked.filter((id: string) => id !== productId);
    localStorage.setItem("liked", JSON.stringify(updated));
    setLikedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: any) => item.id === product.id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        product: product,
        qty: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart:updated"));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="h-8 w-8 text-red-500 fill-red-500" />
        <h1 className="font-display text-3xl font-semibold">Liked Products</h1>
      </div>

      {likedProducts.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            No liked products yet
          </h2>
          <p className="text-gray-500 dark:text-gray-500 mb-6">
            Start exploring and like products you love!
          </p>
          <Button asChild>
            <Link to="/shop">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {likedProducts.map((product) => (
            <div key={product.id} className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800">
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </Link>
                <button
                  onClick={() => removeFromLiked(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </button>
              </div>

              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-sm line-clamp-2 leading-tight mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-lg font-bold text-primary">
                    RWF {Math.round(product.price).toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {product.unit || 'piece'}
                  </span>
                </div>

                <Button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
