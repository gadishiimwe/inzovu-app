import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function StickyCartBar() {
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const calc = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCount(cart.reduce((s: number, it: any) => s + it.qty, 0));
      setTotal(cart.reduce((s: number, it: any) => s + it.qty * it.product.price, 0));
    };
    calc();
    window.addEventListener("cart:updated", calc);
    return () => window.removeEventListener("cart:updated", calc);
  }, []);

  if (count === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="text-sm">
          <div className="font-semibold">{count} item{count > 1 ? 's' : ''}</div>
          <div className="text-muted-foreground">Total: RWF {Math.round(total).toLocaleString()}</div>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/cart">View Cart</Link>
          </Button>
          <Button asChild size="sm" className="btn-hero">
            <Link to="/checkout">Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}


