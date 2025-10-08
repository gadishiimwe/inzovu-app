import { Link, useLocation } from "react-router-dom";
import ProductQuickView from "@/components/product/ProductQuickView";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart, Heart, Star } from "lucide-react";
import { useState, useEffect } from "react";
import type { Product } from "@/data/inzovu";

export default function ProductCard({ product }: { product: Product }) {
  const location = useLocation();
  const computeFixedRating = () => {
    const str = String(product.id);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
    }
    const base = 40 + (hash % 11); // 40..50
    return (base / 10).toFixed(1);
  };
  const fixedRating = computeFixedRating();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem("liked") || "[]");
    setIsLiked(liked.includes(product.id));
  }, [product.id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: any) => item.id === product.id);

    if (existing) {
      existing.qty += quantity;
    } else {
      cart.push({ id: product.id, product, qty: quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart:updated"));
    setQuantity(1); // Reset quantity
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const toggleLike = () => {
    const liked = JSON.parse(localStorage.getItem("liked") || "[]");
    const updated = isLiked
      ? liked.filter((id: string) => id !== product.id)
      : [...liked, product.id];

    localStorage.setItem("liked", JSON.stringify(updated));
    setIsLiked(!isLiked);
  };

  return (
    <div className="group relative rounded-lg border border-green-400 hover:shadow-lg transition-all duration-300 overflow-hidden max-w-[180px] mx-auto p-2 flex flex-col max-h-[280px]">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex gap-1">
        <span className="bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-md">
          Sale
        </span>
      </div>

      {/* Like Button */}
      <button
        onClick={toggleLike}
        className="absolute top-2 right-2 z-10 w-6 h-6 bg-white/95 dark:bg-gray-800/95 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
        aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={`h-3 w-3 transition-colors duration-300 ${
            isLiked
              ? "fill-red-600 text-red-600"
              : "text-gray-500 dark:text-gray-400"
          }`}
        />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}${location.pathname.startsWith('/category/') ? `?from=${encodeURIComponent(location.pathname)}` : ''}`} aria-label={`${product.name} details`}>
        <div className="relative w-full h-32 overflow-hidden rounded-md bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>

          {/* Rating */}
          <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 bg-white/95 px-1.5 py-0.5 rounded-full shadow-sm">
            <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-gray-800">{fixedRating}</span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-2 space-y-1.5">
        <Link to={`/product/${product.id}${location.pathname.startsWith('/category/') ? `?from=${encodeURIComponent(location.pathname)}` : ''}`}>
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="space-y-1">
          <span className="text-lg font-bold text-primary block">
            RWF {product.price.toLocaleString()}
          </span>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full inline-block">
            per {product.unit || "piece"}
          </span>
        </div>

        {/* Quantity Controls and Add to Cart */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 bg-gray-50 rounded-full p-1">
              <button
                onClick={decrementQuantity}
                className="w-5 h-5 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors duration-200 shadow-sm"
                disabled={quantity <= 1}
              >
                <Minus className="h-2.5 w-2.5" />
              </button>
              <span className="w-6 text-center font-medium text-xs">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="w-5 h-5 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors duration-200 shadow-sm"
              >
                <Plus className="h-2.5 w-2.5" />
              </button>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={addToCart}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center px-3 py-1.5 h-8"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
            </Button>
          </div>

          <ProductQuickView product={product} trigger={(open) => (
            <button onClick={open} className="text-xs text-primary hover:text-primary/80 underline underline-offset-2 transition-colors w-full text-left" aria-label="Quick view">Quick view</button>
          )} />
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"></div>
    </div>
  );
}
