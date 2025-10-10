import Hero from "@/components/home/Hero";
import CustomerTestimonials from "@/components/home/CustomerTestimonials";
import PromotionalCards from "@/components/home/PromotionalCards";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { useProducts } from "@/contexts/ProductContext";
import { useCategories } from "@/contexts/CategoryContext";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/product/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";

const Index = () => {
  const { products } = useProducts();
  const { categories } = useCategories();
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const end = Date.now() + 1000 * 60 * 60 * 6; // 6 hours from mount
    const timer = setInterval(() => setTimeLeft(Math.max(0, end - Date.now())), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
    const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const categoryFeatures = [
    {
      slug: "bakery",
      title: "Bakery",
      description: "Fresh baked goods daily",
      image: categories.find(c => c.slug === "bakery")?.image
    },
    {
      slug: "dairy",
      title: "Dairy",
      description: "Farm fresh dairy products",
      image: categories.find(c => c.slug === "dairy")?.image
    },
    {
      slug: "pantry",
      title: "Pantry",
      description: "Essential pantry items",
      image: categories.find(c => c.slug === "pantry")?.image
    },
    {
      slug: "vegetables",
      title: "Vegetables",
      description: "Fresh vegetables daily",
      image: categories.find(c => c.slug === "vegetables")?.image
    },
    {
      slug: "fruits",
      title: "Fruits",
      description: "Sweet & fresh fruits",
      image: categories.find(c => c.slug === "fruits")?.image
    }
  ];

  return (
    <>
      <Hero />
      <main className="flex-1 bg-gradient-to-br from-yellow-50 to-orange-50">
        {/* Flash Sale Banner */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-6 px-4 sm:px-8 rounded-b-2xl shadow-xl mb-8 max-w-6xl mx-auto relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-2 right-4 text-2xl animate-bounce">🔥</div>
          <div className="absolute bottom-2 left-4 text-xl animate-pulse">⚡</div>

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-col lg:flex-row items-center gap-4 text-center lg:text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl mb-1">⏰</div>
                <div className="text-xs font-medium text-white/80 uppercase tracking-wider">Limited Time</div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-1 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  FLASH SALE LIVE!
                </h2>
                <p className="text-base sm:text-lg font-semibold mb-3 text-white/90">
                  Up to 50% OFF on Fresh Products
                </p>

                {/* Enhanced Countdown */}
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="flex items-center justify-center gap-3 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold text-yellow-300">{Math.floor(timeLeft / (1000 * 60 * 60))}</div>
                      <div className="text-xs text-white/70 uppercase tracking-wide">Hours</div>
                    </div>
                    <div className="text-yellow-300 text-lg font-bold">:</div>
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold text-yellow-300">{Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))}</div>
                      <div className="text-xs text-white/70 uppercase tracking-wide">Minutes</div>
                    </div>
                    <div className="text-yellow-300 text-lg font-bold">:</div>
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold text-yellow-300">{Math.floor((timeLeft % (1000 * 60)) / 1000)}</div>
                      <div className="text-xs text-white/70 uppercase tracking-wide">Seconds</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Link to="/deals" className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 font-black px-6 py-3 rounded-xl shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border-2 border-white/20">
                <span className="text-base">SHOP NOW</span>
                <div className="text-xs opacity-80 group-hover:opacity-100 transition-opacity">Don't Miss Out!</div>
              </Link>

              <div className="flex items-center gap-2 text-xs text-white/80">
                <span>🚚</span>
                <span>Free Delivery on Orders Over 2000 RWF</span>
              </div>
            </div>
          </div>
        </div>


        <FeaturedProducts />



        <WhyChooseUs />
        <PromotionalCards />
        <CustomerTestimonials />
      </main>


    </>
  );
};

export default Index;
