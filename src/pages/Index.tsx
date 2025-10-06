import Hero from "@/components/home/Hero";
import CustomerTestimonials from "@/components/home/CustomerTestimonials";
import PromotionalCards from "@/components/home/PromotionalCards";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { categories } from "@/data/inzovu";
import { useProducts } from "@/contexts/ProductContext";
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
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white py-6 px-6 sm:px-12 rounded-b-3xl shadow-2xl mb-10 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight animate-pulse select-none">⚡ Flash Sale is Live! ⚡</span>
              <span className="text-lg sm:text-xl font-semibold">Limited time offers on fresh products.</span>
            </div>
            <Link to="/deals" className="bg-white text-red-700 font-extrabold px-8 py-4 rounded-full shadow-2xl hover:bg-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:scale-110 select-none">
              Shop Now
            </Link>
          </div>
        </div>
        {/* Categories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Explore our wide range of fresh categories, from farm-fresh produce to pantry essentials.
              </p>
            </div>

            <Carousel
              opts={{
                align: "start",
                slidesToScroll: 1,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-3">
                {categoryFeatures.map((category) => (
                  <CarouselItem key={category.slug} className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <Link to={`/category/${category.slug}`} className="group block">
                      <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                        <div className="aspect-square rounded-xl overflow-hidden mb-3">
                          <img
                            src={category.image}
                            alt={category.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="font-semibold text-center text-sm sm:text-base">{category.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground text-center mt-1">{category.description}</p>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </section>

        <FeaturedProducts />
        <WhyChooseUs />
        <PromotionalCards />
        <CustomerTestimonials />
      </main>


    </>
  );
};

export default Index;
