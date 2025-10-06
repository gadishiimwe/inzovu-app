import heroBackground from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section 
      className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] xl:h-[80vh] flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-white">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            Quality Produce <br className="hidden sm:block"/>
            <span className="text-accent block sm:inline"> Unbeatable Prices</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Craving second to none delicacies served hot and fast? How about your fruits and vegetables plated in the bloom of their freshness?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
            <Button asChild size="lg" className="btn-hero text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 bg-primary/90 hover:bg-primary w-full sm:w-auto rounded-full touch-manipulation active:scale-95 transition-all duration-300" aria-label="Shop now">
              <Link to="/shop">🛒 SHOP NOW</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 bg-white/10 border-white/30 text-white hover:bg-white/20 w-full sm:w-auto rounded-full touch-manipulation active:scale-95 transition-all duration-300" aria-label="Shop fresh fruits">
              <Link to="/category/fruits">🍎 FRESH FRUITS</Link>
            </Button>
          </div>

          {/* Mobile-friendly trust indicators */}
          <div className="mt-6 sm:mt-8 lg:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-8 text-xs sm:text-sm lg:text-base opacity-90">
            <div className="flex items-center gap-1 sm:gap-2">
              <span>🚚</span>
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <span>🌿</span>
              <span>100% Fresh</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <span>⚡</span>
              <span>Same Day</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}