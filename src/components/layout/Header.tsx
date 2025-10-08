import { Search, ShoppingCart, Menu, Heart, User, ChevronDown, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger as NavTrigger } from "@/components/ui/navigation-menu";
import MobileMenu from "./MobileMenu";
import { useState, useEffect } from "react";
import { useCategories } from "@/contexts/CategoryContext";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { categories } = useCategories();
  const [cartCount, setCartCount] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.reduce((sum: number, item: any) => sum + item.qty, 0));
    };

    updateCartCount();
    window.addEventListener("cart:updated", updateCartCount);
    return () => window.removeEventListener("cart:updated", updateCartCount);
  }, []);

  useEffect(() => {
    // Check auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    
    setIsAdmin(!!data);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const mainCategories = [
    { name: "FRUITS", href: "/category/fruits" },
    { name: "VEG", href: "/category/vegetables" },
    { name: "DAIRY & EGGS", href: "/category/dairy" },
    { name: "BAKERY", href: "/category/bakery" },
    { name: "PANTRY", href: "/category/pantry" },
  ];

  const additionalMenus = [
    { name: "DELI", href: "/shop" },
    { name: "NEW IN", href: "/new-in" },
    { name: "GOOD STUFF", href: "/good-stuff" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <>
      {/* Marquee Announcement Bar */}
      <div className="bg-primary text-primary-foreground py-3 text-sm font-medium overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-8">🎉 New to Inzovu Market? Use code NEWCUSTOMER2025 and get 250 RWF discount on orders above 1000 RWF! 🚚💨</span>
          <span className="mx-8">🎉 New to Inzovu Market? Use code NEWCUSTOMER2025 and get 250 RWF discount on orders above 1000 RWF! 🚚💨</span>
          <span className="mx-8">🎉 New to Inzovu Market? Use code NEWCUSTOMER2025 and get 250 RWF discount on orders above 1000 RWF! 🚚💨</span>
          <span className="mx-8">🎉 New to Inzovu Market? Use code NEWCUSTOMER2025 and get 250 RWF discount on orders above 1000 RWF! 🚚💨</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-2 sm:px-4">
          {/* Top Navigation Bar - Hidden on Mobile */}
          <div className="hidden md:flex items-center justify-between h-10 lg:h-12 text-xs text-muted-foreground border-b border-border/50">
            <div className="flex items-center gap-4 lg:gap-6 overflow-hidden">
              <span className="whitespace-nowrap text-xs lg:text-sm truncate">FRUITS | VEG | DAIRY & EGGS | BAKERY | PANTRY</span>
            </div>
            <div className="flex items-center gap-3 lg:gap-4 text-xs lg:text-sm">
              <span className="hidden lg:inline">My Account</span>
              <span className="hidden lg:inline">My Cart</span>
              <span>RWF 0</span>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Left side - Mobile Menu & EST */}
            <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
              <MobileMenu />
              <span className="hidden lg:inline text-xs text-muted-foreground font-medium tracking-wider">EST. 2024</span>
            </div>

            {/* Logo - Responsive */}
            <Link to="/" className="flex flex-col items-center lg:items-start group flex-shrink-0">
              <span className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-primary group-hover:text-primary/80 transition-colors">INZOVU</span>
              <span className="text-xs text-accent font-semibold -mt-1 tracking-wider">Food Market</span>
            </Link>

            {/* Right side - Actions */}
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-6 flex-shrink-0">
              {/* Desktop Search - Hidden on Mobile/Tablet */}
              <div className="hidden xl:block flex-1 max-w-md">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search for products..."
                    className="w-full h-10 pr-20 bg-muted/30 border-muted-foreground/20 focus:bg-background transition-all focus:ring-2 focus:ring-primary/20"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const query = (e.target as HTMLInputElement).value;
                        navigate(`/shop?q=${encodeURIComponent(query)}`);
                      }
                    }}
                  />
                  <Button size="sm" className="absolute right-1 top-1 btn-hero h-8 px-3 text-xs" onClick={() => {
                    if (searchValue.trim()) {
                      navigate(`/shop?q=${encodeURIComponent(searchValue.trim())}`);
                    }
                  }}>
                    Search
                  </Button>
                </div>
              </div>

              {/* Mobile Search Icon */}
              <Button variant="ghost" size="icon" className="xl:hidden h-9 w-9 lg:h-10 lg:w-10 hover:bg-muted/50 rounded-full touch-manipulation" onClick={() => setShowMobileSearch(!showMobileSearch)}>
                <Search className="h-4 w-4 lg:h-5 lg:w-5" />
              </Button>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-2 lg:gap-3">
                <Link to="/liked" className="p-2 hover:bg-muted/50 rounded-full transition-colors">
                  <Heart className="h-4 w-4 lg:h-5 lg:w-5" />
                </Link>

                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="hidden xl:flex items-center gap-2 p-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer">
                        <User className="h-4 w-4 lg:h-5 lg:w-5" />
                        <div className="flex flex-col text-xs">
                          <span className="font-medium">My Account</span>
                          <span className="text-muted-foreground truncate max-w-[100px]">{user.email}</span>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link to="/account" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          My Account
                        </Link>
                      </DropdownMenuItem>
                      {isAdmin && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link to="/admin" className="cursor-pointer">
                              <Settings className="mr-2 h-4 w-4" />
                              Admin Panel
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to="/auth" className="hidden xl:flex items-center gap-2 p-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer">
                    <User className="h-4 w-4 lg:h-5 lg:w-5" />
                    <div className="flex flex-col text-xs">
                      <span className="font-medium">My Account</span>
                      <span className="text-muted-foreground">Log In</span>
                    </div>
                  </Link>
                )}
              </div>

              {/* Cart - Always visible with responsive sizing */}
              <Link
                to="/cart"
                className="relative p-2 lg:p-3 hover:bg-muted/50 rounded-full lg:rounded-lg transition-colors flex items-center gap-1 lg:gap-2 touch-manipulation"
                aria-label={`Cart with ${cartCount} items`}
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                <div className="hidden xl:flex flex-col text-xs">
                  <span className="font-medium">My Cart</span>
                  <span className="text-primary font-semibold">RWF 0</span>
                </div>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 flex items-center justify-center font-bold animate-pulse">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search Input */}
          {showMobileSearch && (
            <div className="xl:hidden px-2 pb-4">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="w-full h-10 pr-20 bg-muted/30 border-muted-foreground/20 focus:bg-background transition-all focus:ring-2 focus:ring-primary/20"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const query = (e.target as HTMLInputElement).value;
                      if (query.trim()) {
                        navigate(`/shop?q=${encodeURIComponent(query)}`);
                        setShowMobileSearch(false);
                      }
                    }
                  }}
                />
                <Button size="sm" className="absolute right-1 top-1 btn-hero h-8 px-3 text-xs" onClick={() => {
                  if (searchValue.trim()) {
                    navigate(`/shop?q=${encodeURIComponent(searchValue.trim())}`);
                    setShowMobileSearch(false);
                  }
                }}>
                  Search
                </Button>
              </div>
            </div>
          )}

          {/* Mega Menu */}
          <div className="hidden lg:block border-t border-border/50">
            <div className="container mx-auto px-2 sm:px-4 py-3">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavTrigger className="text-sm">All Categories</NavTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-4 gap-4 p-4 w-[800px]">
                        {categories.map((category) => (
                          <Link key={category.slug} to={`/category/${category.slug}`} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
                            <img src={category.image} alt={category.title} className="w-10 h-10 rounded object-cover" />
                            <div>
                              <div className="text-sm font-medium">{category.title}</div>
                              <div className="text-xs text-muted-foreground">Shop {category.title.toLowerCase()}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  {mainCategories.map((item) => (
                    <NavigationMenuItem key={item.name}>
                      <Link to={item.href} className={`text-sm px-3 py-2 rounded-md hover:bg-muted ${location.pathname === item.href ? 'text-primary font-semibold' : ''}`}>{item.name}</Link>
                    </NavigationMenuItem>
                  ))}
                  {additionalMenus.map((item) => (
                    <NavigationMenuItem key={item.name}>
                      <Link to={item.href} className={`text-sm px-3 py-2 rounded-md hover:bg-muted ${location.pathname === item.href ? 'text-primary font-semibold' : ''}`}>{item.name}</Link>
                    </NavigationMenuItem>
                  ))}
                  <NavigationMenuItem className="ml-auto">
                    <Button asChild className="btn-hero text-sm h-9 px-5">
                      <Link to="/deals">🎁 Exclusive Deals !!</Link>
                    </Button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
