import { Link } from "react-router-dom";
import promoMeat from "@/assets/promo/meat.jpg";
import promoProduce from "@/assets/promo/produce.jpg";
import promoVegetables from "@/assets/promo/vegetables.jpg";
import promoBakery from "@/assets/promo/bakery.jpg";
import promoPantry from "@/assets/promo/pantry.jpg";

const promotionalOffers = [
  {
    id: 1,
    title: "PREMIUM MEATS",
    subtitle: "Fresh cuts, quality guaranteed",
    image: promoMeat,
    bgColor: "bg-slate-800",
    textColor: "text-white",
    link: "/category/meat"
  },
  {
    id: 2,
    title: "FRESH PRODUCE", 
    subtitle: "Farm-fresh daily",
    image: promoProduce,
    bgColor: "bg-orange-600",
    textColor: "text-white",
    link: "/category/fruits"
  },
  {
    id: 3,
    title: "ORGANIC VEGGIES",
    subtitle: "Crisp and nutritious",
    image: promoVegetables,
    bgColor: "bg-green-600",
    textColor: "text-white",
    link: "/category/vegetables"
  },
  {
    id: 4,
    title: "ARTISAN BAKERY",
    subtitle: "Baked fresh daily",
    image: promoBakery,
    bgColor: "bg-amber-600",
    textColor: "text-white",
    link: "/category/bakery"
  },
  {
    id: 5,
    title: "PANTRY ESSENTIALS",
    subtitle: "Quality ingredients",
    image: promoPantry,
    bgColor: "bg-blue-600",
    textColor: "text-white",
    link: "/category/pantry"
  }
];

export default function PromotionalCards() {
  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-foreground">
            Discover Fresh Flavors
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Handpicked selections just for you
          </p>
        </div>
        
        {/* Mobile: Horizontal scroll with compact cards */}
        <div className="block sm:hidden overflow-x-auto pb-3 scrollbar-hide">
          <div className="flex gap-3 px-1">
            {promotionalOffers.map((offer) => (
              <Link
                key={offer.id}
                to={offer.link}
                className="group relative flex-shrink-0 w-36 aspect-[3/4] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className={`absolute inset-0 ${offer.bgColor}`}>
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                <div className={`absolute bottom-0 left-0 right-0 p-3 ${offer.textColor}`}>
                  <h3 className="font-display text-xs font-bold mb-1 leading-tight drop-shadow-lg line-clamp-2">
                    {offer.title}
                  </h3>
                  <p className="text-[10px] opacity-90 drop-shadow-md line-clamp-1">
                    {offer.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tablet & Desktop: Grid layout */}
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {promotionalOffers.map((offer) => (
            <Link
              key={offer.id}
              to={offer.link}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden hover-scale shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className={`absolute inset-0 ${offer.bgColor}`}>
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className={`absolute bottom-0 left-0 right-0 p-4 sm:p-5 ${offer.textColor}`}>
                <h3 className="font-display text-base sm:text-lg font-bold mb-1 sm:mb-2 leading-tight drop-shadow-lg">
                  {offer.title}
                </h3>
                <p className="text-xs sm:text-sm opacity-95 drop-shadow-md mb-2">
                  {offer.subtitle}
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                  <span>Shop Now</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
