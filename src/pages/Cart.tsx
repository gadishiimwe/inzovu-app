import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const total = cart.reduce((sum: number, it: any) => sum + (it.product.price * it.qty), 0);

  const remove = (id: string) => {
    const next = cart.filter((c: any) => c.id !== id);
    localStorage.setItem("cart", JSON.stringify(next));
    window.location.reload();
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="font-display text-3xl font-semibold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-muted-foreground">Your cart is empty. <Link to="/shop" className="story-link">Start shopping</Link></div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item: any) => (
              <div key={item.id} className="flex items-center gap-4 border rounded-lg p-4">
                <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium">{item.product.name}</div>
                  <div className="text-sm text-muted-foreground">Qty: {item.qty}</div>
                </div>
                <div className="font-medium">RWF {Math.round(item.product.price * item.qty).toLocaleString()}</div>
                <Button variant="ghost" onClick={() => remove(item.id)}>Remove</Button>
              </div>
            ))}
          </div>
          <aside className="border rounded-lg p-4 h-fit sticky top-24">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">RWF {Math.round(total).toLocaleString()}</span>
            </div>
            <Button className="w-full mt-4 btn-hero" asChild>
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
