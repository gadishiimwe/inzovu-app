import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Checkout() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const total = cart.reduce((sum: number, it: any) => sum + (it.product.price * it.qty), 0);
  const [paymentMethod, setPaymentMethod] = useState<"momo" | "cod">("momo");
  const [phone, setPhone] = useState("");

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order placed! This is a demo checkout.");
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cart:updated"));
    window.location.href = "/";
  };

  const orderViaWhatsApp = () => {
    const items = cart
      .map((item: any) => `- ${item.qty}x ${item.product.name}`)
      .join("\n");
    
    const codes = paymentMethod === "momo" ? "(Use codes 07772 or 07773)" : "";
    const paymentInfo = paymentMethod === "momo" 
      ? `I will pay via MTN MoMo ${codes}. My number: ${phone || "[Your Phone]"}`
      : "I will pay Cash on Delivery";
    
    const message = `Hello, I am [Full Name]. I have ordered ${cart.map((i:any)=>i.product.name).join(", ")}.\n\nOrder Details:\n${items}\n\nTotal: ${Math.round(total).toLocaleString()} RWF\n\n${paymentInfo}.`;
    
    const whatsappUrl = `https://wa.me/250788654321?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="font-display text-3xl font-semibold mb-6">Checkout</h1>
      <form className="grid md:grid-cols-3 gap-8" onSubmit={placeOrder}>
        <div className="md:col-span-2 space-y-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Contact information</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <input className="rounded-md border bg-background px-3 py-2 text-sm" placeholder="First name" required />
              <input className="rounded-md border bg-background px-3 py-2 text-sm" placeholder="Last name" required />
              <input className="rounded-md border bg-background px-3 py-2 text-sm sm:col-span-2" type="email" placeholder="Email" required />
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Delivery address</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <input className="rounded-md border bg-background px-3 py-2 text-sm sm:col-span-2" placeholder="Address line" required />
              <input className="rounded-md border bg-background px-3 py-2 text-sm" placeholder="City" required />
              <input className="rounded-md border bg-background px-3 py-2 text-sm" placeholder="Postal code" required />
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Payment Method</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="momo"
                  checked={paymentMethod === "momo"}
                  onChange={() => setPaymentMethod("momo")}
                  className="w-4 h-4"
                />
                <span className="text-sm">Mobile Money (MoMo)</span>
              </label>
              {paymentMethod === "momo" && (
                <input
                  className="rounded-md border bg-background px-3 py-2 text-sm w-full"
                  placeholder="MoMo Phone Number (e.g., 0788 123 456)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              )}
            {paymentMethod === "momo" && (
              <div className="text-xs text-muted-foreground">
                Use MTN MoMo codes: <span className="font-semibold">07772</span> or <span className="font-semibold">07779</span>
              </div>
            )}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="w-4 h-4"
                />
                <span className="text-sm">Cash on Delivery (COD)</span>
              </label>
            </div>
          </div>
        </div>

        <aside className="border rounded-lg p-4 h-fit">
          <h3 className="font-medium mb-3">Order summary</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {cart.map((item: any) => (
              <li key={item.id} className="flex items-center justify-between">
                <span>{item.product.name} × {item.qty}</span>
                <span className="text-foreground">RWF {Math.round(item.product.price * item.qty).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-muted-foreground">Total</span>
            <span className="font-semibold">RWF {Math.round(total).toLocaleString()}</span>
          </div>
          <Button className="w-full mt-4 btn-hero" type="submit">Place order</Button>
          <Button
            variant="outline"
            className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white border-green-600"
            type="button"
            onClick={orderViaWhatsApp}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Order on WhatsApp
          </Button>
          <Button variant="secondary" className="w-full mt-2" asChild>
            <Link to="/cart">Back to cart</Link>
          </Button>
        </aside>
      </form>
    </div>
  );
}
