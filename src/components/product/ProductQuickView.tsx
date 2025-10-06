import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/inzovu";
import { Minus, Plus, ShoppingCart, Heart, Star } from "lucide-react";

export default function ProductQuickView({ product, trigger }: { product: Product; trigger: (open: () => void) => JSX.Element }) {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) existing.qty += qty; else cart.push({ id: product.id, product, qty });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart:updated"));
    setOpen(false);
    setQty(1);
  };

  const toggleLike = () => {
    const liked = JSON.parse(localStorage.getItem("liked") || "[]");
    const isLiked = liked.includes(product.id);
    const updated = isLiked ? liked.filter((id: string) => id !== product.id) : [...liked, product.id];
    localStorage.setItem("liked", JSON.stringify(updated));
  };

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

  return (
    <>
      {trigger(() => setOpen(true))}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 sm:p-0 overflow-hidden max-w-md sm:max-w-lg rounded-lg">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-muted/30 rounded-lg overflow-hidden shadow-md">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">{product.name}</DialogTitle>
                <DialogDescription className="line-clamp-4 text-sm text-muted-foreground">{product.description}</DialogDescription>
              </DialogHeader>
              <div className="text-primary font-bold text-lg">RWF {product.price.toLocaleString()} <span className="text-xs text-muted-foreground">{product.unit ? `/ ${product.unit}` : ''}</span></div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{fixedRating}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors duration-300" onClick={() => setQty(q => Math.max(1, q-1))} aria-label="Decrease quantity"><Minus className="w-4 h-4" /></button>
                  <span className="w-7 text-center text-base font-medium">{qty}</span>
                  <button className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors duration-300" onClick={() => setQty(q => q+1)} aria-label="Increase quantity"><Plus className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={toggleLike} aria-label="Toggle wishlist" className="hover:bg-red-100 dark:hover:bg-red-900">
                    <Heart className="w-5 h-5 text-red-500" />
                  </Button>
                  <Button size="sm" onClick={addToCart} className="btn-hero flex items-center gap-2 px-4 py-2 text-sm font-semibold">
                    <ShoppingCart className="w-5 h-5" /> Add to cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}


