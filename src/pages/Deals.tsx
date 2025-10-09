import { Tag, Clock, TrendingDown, ShoppingBag, Percent, Gift, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";
import { useProducts } from "@/contexts/ProductContext";

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
  const dealProducts = products.filter(p => p.available !== false).slice(0, 8); // Show first 8 products as deals

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-3 bg-red-100 text-red-600 px-6 py-3 rounded-full mb-6 shadow-lg">
          <Tag className="h-6 w-6" />
          <span className="text-base font-bold uppercase tracking-wide">Exclusive Deals</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
          Amazing <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Savings</span> Await
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Don't miss out on our exclusive offers! Fresh products at unbeatable prices.
        </p>
      </div>

      {/* Featured Deals */}
      <div className="mb-12 sm:mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Featured Offers</h2>
          <Badge variant="secondary" className="hidden sm:inline-flex px-4 py-2 text-base">
            <Clock className="h-5 w-5 mr-2" />
            Limited Time
          </Badge>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {exclusiveDeals.map((deal) => (
            <Card key={deal.id} className={`relative overflow-hidden ${deal.color} text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 rounded-3xl`}>
              <CardContent className="p-8 sm:p-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                <div className="relative z-10">
                  <deal.icon className="h-12 w-12 sm:h-16 sm:w-16 mb-6 opacity-90" />
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">{deal.title}</h3>
                  <div className="text-4xl sm:text-5xl font-extrabold mb-4">{deal.discount}</div>
                  <p className="text-white/90 mb-6 text-base sm:text-lg">{deal.description}</p>
                  <div className="flex items-center gap-3 text-sm sm:text-base opacity-90">
                    <Clock className="h-5 w-5" />
                    <span>{deal.endTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Daily Deals */}
      <div className="mb-12 sm:mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Today's Best Deals</h2>
            <p className="text-gray-700 text-lg sm:text-xl">Fresh products at special prices</p>
          </div>
          <Button asChild variant="outline" className="hidden sm:inline-flex px-6 py-3 text-lg font-semibold">
            <Link to="/shop">View All</Link>
          </Button>
        </div>

        {/* Unified grid without horizontal scroll */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>


      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl sm:rounded-4xl p-8 sm:p-12 shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 sm:mb-14 text-gray-900">How to Save More</h2>
        <div className="grid sm:grid-cols-3 gap-8 sm:gap-10">
          <div className="text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Percent className="h-10 w-10 sm:h-12 sm:w-12 text-red-600" />
            </div>
            <h3 className="font-bold text-xl sm:text-2xl mb-3 text-gray-900">1. Browse Deals</h3>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Check our exclusive deals page regularly for the latest offers and discounts
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <ShoppingBag className="h-10 w-10 sm:h-12 sm:w-12 text-green-600" />
            </div>
            <h3 className="font-bold text-xl sm:text-2xl mb-3 text-gray-900">2. Add to Cart</h3>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Select your favorite products and add them to your cart to enjoy special prices
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <TrendingDown className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600" />
            </div>
            <h3 className="font-bold text-xl sm:text-2xl mb-3 text-gray-900">3. Save Big</h3>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Complete your purchase and enjoy amazing savings on quality products
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
