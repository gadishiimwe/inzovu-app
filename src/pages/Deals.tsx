import { Tag, Clock, TrendingDown, ShoppingBag, Percent, Gift, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";
import { useProducts } from "@/contexts/ProductContext";
import CategorySidebar from "@/components/common/CategorySidebar";

const exclusiveDeals = [
  {
    id: 1,
    title: "Weekend Flash Sale",
    discount: "30% OFF",
    description: "All fresh fruits and vegetables",
    endTime: "Ends Sunday 11:59 PM",
    color: "bg-gradient-to-r from-orange-500 to-red-500",
    icon: Zap
  },
  {
    id: 2,
    title: "Dairy Delight",
    discount: "Buy 2 Get 1 FREE",
    description: "Selected dairy products",
    endTime: "Limited time offer",
    color: "bg-gradient-to-r from-blue-500 to-indigo-500",
    icon: Gift
  },
  {
    id: 3,
    title: "Bulk Buy Special",
    discount: "25% OFF",
    description: "Orders above RWF 50,000",
    endTime: "Valid all week",
    color: "bg-gradient-to-r from-green-500 to-emerald-500",
    icon: ShoppingBag
  }
];

export default function Deals() {
  const { products } = useProducts();
  // Show all available products
  const dealProducts = products.filter(p => p.available !== false).slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-yellow-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-300 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-300 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-300 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-4 shadow-md">
            <Tag className="h-5 w-5" />
            <span className="text-sm font-bold uppercase tracking-wide">Exclusive Deals</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">
            Amazing <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Savings</span> Await
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Don't miss out on our exclusive offers! Fresh products at unbeatable prices.
          </p>
        </div>

        {/* Featured Deals */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Featured Offers</h2>
            <Badge variant="secondary" className="hidden sm:inline-flex px-3 py-1 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              Limited Time
            </Badge>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {exclusiveDeals.map((deal) => (
              <Card key={deal.id} className={`relative overflow-hidden ${deal.color} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl group`}>
                <CardContent className="p-6 sm:p-8">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="relative z-10">
                    <deal.icon className="h-10 w-10 sm:h-12 sm:w-12 mb-4 opacity-90" />
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{deal.title}</h3>
                    <div className="text-3xl sm:text-4xl font-extrabold mb-3">{deal.discount}</div>
                    <p className="text-white/90 mb-4 text-sm sm:text-base">{deal.description}</p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm opacity-90">
                      <Clock className="h-4 w-4" />
                      <span>{deal.endTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Daily Deals */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Today's Best Deals</h2>
              <p className="text-gray-700 text-base sm:text-lg">Fresh products at special prices</p>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold">
              <Link to="/shop">View All</Link>
            </Button>
          </div>

          {/* Unified grid without horizontal scroll */}
          <div className="flex gap-8">
            <div className="hidden lg:block">
              <CategorySidebar />
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {dealProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-8 sm:mb-10 text-gray-900">How to Save More</h2>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <Percent className="h-8 w-8 sm:h-10 sm:w-10 text-red-600" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl mb-2 text-gray-900">1. Browse Deals</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Check our exclusive deals page regularly for the latest offers and discounts
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <ShoppingBag className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl mb-2 text-gray-900">2. Add to Cart</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Select your favorite products and add them to your cart to enjoy special prices
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <TrendingDown className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl mb-2 text-gray-900">3. Save Big</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Complete your purchase and enjoy amazing savings on quality products
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
