import { Truck, Shield, Clock, Leaf } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Fresh & Organic",
    description: "Sourced directly from local farms, ensuring maximum freshness and no harmful chemicals.",
    color: "text-green-600"
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day delivery available across Kigali. Get your fresh groceries within hours.",
    color: "text-blue-600"
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "100% satisfaction guarantee. If you're not happy, we'll make it right.",
    color: "text-purple-600"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our customer service team is always ready to help you with your orders.",
    color: "text-orange-600"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Why Choose Inzovu Market?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-4xl mx-auto">
            We're committed to bringing you the freshest, highest-quality groceries with unmatched service and convenience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center p-6 sm:p-8 rounded-2xl lg:rounded-3xl bg-white/50 backdrop-blur-sm border border-border/50 hover:bg-white/80 hover:border-primary/20 transition-all duration-500 hover:-translate-y-1 lg:hover:-translate-y-2 hover:shadow-xl lg:hover:shadow-2xl hover:shadow-primary/10 touch-manipulation active:scale-95"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className={`h-8 w-8 sm:h-10 sm:w-10 ${feature.color}`} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}