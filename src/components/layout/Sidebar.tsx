import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "@/data/inzovu";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className="w-56 lg:w-64 bg-card border-r border-border sticky top-[120px] lg:top-[140px] h-[calc(100vh-120px)] lg:h-[calc(100vh-140px)] overflow-y-auto">
      <div className="p-3 lg:p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left font-medium text-foreground hover:text-primary transition-colors mb-4"
        >
          <span className="text-sm font-semibold">All Categories</span>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        
        {isOpen && (
          <div className="space-y-1">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors group"
              >
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-6 h-6 rounded object-cover"
                />
                <span className="group-hover:font-medium transition-all">
                  {category.title}
                </span>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-border/50">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Quick Links
          </h3>
          <div className="space-y-1">
            <Link to="/shop" className="block px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              New Arrivals
            </Link>
            <Link to="/shop" className="block px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Best Sellers
            </Link>
            <Link to="/shop" className="block px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Special Offers
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}