import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Impressed by the quality of fresh foods and the efficiency of delivery. The products are excellent.",
    location: "Kigali, Rwanda"
  },
  {
    id: 2,
    name: "James Uwimana",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Outstanding service and incredibly fresh vegetables. Inzovu Market has become my go-to choice for groceries.",
    location: "Kigali, Rwanda"
  },
  {
    id: 3,
    name: "Marie Claire",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Great experience at Inzovu AK. Their staff were extremely welcoming with great service. Highly recommended!",
    location: "Kigali, Rwanda"
  },
  {
    id: 4,
    name: "David Nzeyimana",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Fast delivery, fresh food and reasonable prices. Fantastic budget and convenience. Thanks for the excellent service.",
    location: "Kigali, Rwanda"
  }
];

export default function CustomerTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-block mb-4">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wide">
              Testimonials
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
            What our customers say about Inzovu
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hear from our satisfied customers about their experience with fresh, quality products and exceptional service.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: 1,
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-4 basis-full sm:basis-1/3 lg:basis-1/4">
                  <div className="group relative bg-gradient-to-br from-white to-white/95 dark:from-gray-900 dark:to-gray-900/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-md hover:shadow-lg border border-border/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 h-full">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-3xl rounded-tr-2xl"></div>
                    
                    <div className="flex flex-col items-center text-center gap-3 sm:gap-4 mb-4 sm:mb-5 relative z-10">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-2 ring-white dark:ring-gray-800 shadow-md group-hover:ring-primary/30 transition-all duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-primary to-primary/80 text-white rounded-full p-1 shadow-md">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors mb-1">
                          {testimonial.name}
                        </h3>
                        <p className="text-xs sm:text-xs text-muted-foreground/80 mb-2 font-medium">{testimonial.location}</p>
                        <div className="flex items-center justify-center gap-1 mb-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star 
                              key={i} 
                              className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400 drop-shadow-sm" 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -top-1 -left-1 text-primary/20 text-4xl font-serif">"</div>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed italic text-center relative z-10 px-1">
                        {testimonial.text}
                      </p>
                      <div className="absolute -bottom-3 -right-1 text-primary/20 text-4xl font-serif rotate-180">"</div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 sm:-left-4 lg:-left-12 bg-white dark:bg-gray-800 hover:bg-primary hover:text-white shadow-xl" />
            <CarouselNext className="right-0 sm:-right-4 lg:-right-12 bg-white dark:bg-gray-800 hover:bg-primary hover:text-white shadow-xl" />
          </Carousel>

          {/* Enhanced dots indicator */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 touch-manipulation rounded-full ${
                  index === currentIndex 
                    ? 'w-8 sm:w-10 h-3 sm:h-3.5 bg-gradient-to-r from-primary to-accent shadow-lg' 
                    : 'w-3 sm:w-3.5 h-3 sm:h-3.5 bg-border hover:bg-border/80'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
