import { Link } from "react-router-dom";
import { Menu, Search, User, Heart, ShoppingCart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories } from "@/data/inzovu";
import { useState, useEffect } from "react";

export default function MobileMenu() {
  const [cartCount, setCartCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.reduce((sum: number, item: any) => sum + item.qty, 0));
    };

    updateCartCount();
    window.addEventListener("cart:updated", updateCartCount);
    return () => window.removeEventListener("cart:updated", updateCartCount);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="lg:hidden h-10 w-10 hover:bg-muted/50 rounded-full touch-manipulation" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm p-0 bg-white border-r border-border/50">
        <div className="flex flex-col h-full">
          {/* Clean Header */}
          <SheetHeader className="px-6 py-6 border-b border-border/30 bg-white">
            <SheetTitle className="text-left flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">I</span>
                </div>
                <div>
                  <span className="font-display text-xl font-bold text-foreground">INZOVU</span>
                  <p className="text-sm text-muted-foreground">Fresh Market</p>
                </div>
              </div>
            </SheetTitle>
          </SheetHeader>

          {/* Clean Search */}
          <div className="px-6 py-4 border-b border-border/30">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 h-11 bg-muted/30 border-0 focus:bg-white rounded-lg transition-colors"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const query = (e.target as HTMLInputElement).value;
                    window.location.href = `/shop?q=${encodeURIComponent(query)}`;
                  }
                }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <nav className="px-6 py-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <Link to="/cart" onClick={() => setOpen(false)} className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-muted/50 transition-colors touch-manipulation">
                  <div className="relative w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-primary" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                        {cartCount > 9 ? '9+' : cartCount}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-center">Cart</span>
                </Link>

                <button className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-muted/50 transition-colors touch-manipulation">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <span className="text-xs font-medium text-center">Wishlist</span>
                </button>

                <Link to="/account" onClick={() => setOpen(false)} className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-muted/50 transition-colors touch-manipulation">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <span className="text-xs font-medium text-center">Account</span>
                </Link>
              </div>

              {/* Categories */}
              <div className="space-y-1 mb-8">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Categories</h3>
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    to={`/category/${category.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors touch-manipulation group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={category.image}
                          alt={category.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">{category.title}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>

              {/* Navigation */}
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Menu</h3>
                <Link to="/shop" onClick={() => setOpen(false)} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors touch-manipulation group">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">Shop All</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
                <Link to="/new-in" onClick={() => setOpen(false)} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors touch-manipulation group">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">New In</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
                <Link to="/good-stuff" onClick={() => setOpen(false)} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors touch-manipulation group">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">Good Stuff</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
                <Link to="/about" onClick={() => setOpen(false)} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors touch-manipulation group">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">About</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
                <Link to="/contact" onClick={() => setOpen(false)} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors touch-manipulation group">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">Contact</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
                <Link to="/faq" onClick={() => setOpen(false)} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors touch-manipulation group">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">FAQ</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              </div>
            </nav>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border/30 bg-muted/20">
            <Button asChild className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-md" onClick={() => setOpen(false)}>
              <Link to="/deals">🎁 View Exclusive Deals</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
