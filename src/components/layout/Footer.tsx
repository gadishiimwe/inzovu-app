import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-background">
      <div className="border-t py-8 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="rounded-2xl bg-background border p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-lg sm:text-xl font-semibold">Join the Feast</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Enjoy daily discounts & fresh finds</div>
            </div>
            <form className="flex w-full sm:w-auto gap-2" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
              <input type="email" required placeholder="Email" className="flex-1 rounded-md border bg-background px-3 py-2 text-sm" aria-label="Email address" />
              <button className="btn-hero px-4 py-2 rounded-md text-sm" type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      <div className="container mx-auto grid gap-8 md:grid-cols-4 py-10">
        <div>
          <h3 className="font-display text-lg font-semibold mb-3">Inzovu Market</h3>
          <p className="text-sm text-muted-foreground mb-4">Fresh groceries delivered fast. Quality you can taste, service you can trust.</p>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>📍 KN 5 Ave, Kimihurura, Kigali</p>
            <p>📞 +250 788 555 123</p>
            <p>✉️ info@inzovumarket.rw</p>
            <p>🕐 Mon-Sun: 7AM-9PM</p>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="story-link">All Products</Link></li>
            <li><Link to="/category/fruits" className="story-link">Fruits</Link></li>
            <li><Link to="/category/vegetables" className="story-link">Vegetables</Link></li>
            <li><Link to="/category/dairy" className="story-link">Dairy & Eggs</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="story-link">About</Link></li>
            <li><Link to="/contact" className="story-link">Contact</Link></li>
            <li><Link to="/faq" className="story-link">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-3">Stay in the loop</h4>
          <p className="text-sm text-muted-foreground mb-2">Get fresh deals and seasonal picks.</p>
          <form className="flex gap-2">
            <input type="email" placeholder="Your email" className="flex-1 rounded-md border bg-background px-3 py-2 text-sm" />
            <button className="rounded-md px-4 py-2 btn-hero text-sm">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Inzovu Market. All rights reserved.</div>
    </footer>
  );
}
