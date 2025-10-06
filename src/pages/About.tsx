import { MapPin, Phone, Mail, Clock, Users, Award, Truck, Heart, Leaf, Star, Shield, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import aboutFarmImage from "@/assets/about-farm.jpg";

export default function About() {
  return (
    <div className="bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Leaf className="h-4 w-4" />
            <span className="text-sm font-semibold uppercase tracking-wide">About Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Welcome to <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Inzovu</span> Market
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto mb-8 px-2 sm:px-0 leading-relaxed">
            Your trusted partner for fresh, quality groceries delivered straight to your doorstep in Rwanda.
            We're committed to bringing you the finest selection of fruits, vegetables, dairy, bakery, meat, and pantry essentials
            from local farms and trusted suppliers.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm sm:text-base">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
              <Star className="h-5 w-5 text-accent fill-accent" />
              <span className="font-medium">Premium Quality</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
              <Leaf className="h-5 w-5 text-green-500" />
              <span className="font-medium">Farm Fresh</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">Fast Delivery</span>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-16 sm:mb-20">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">Our Story</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-6"></div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Founded in 2024, Inzovu Market began with a simple mission: to make fresh, high-quality groceries
              accessible to everyone in Rwanda. We believe that everyone deserves access to nutritious, delicious food
              without compromising on quality or convenience.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our journey started with a small team passionate about connecting local farmers with urban consumers.
              Today, we're proud to serve thousands of customers across Rwanda, delivering farm-fresh produce
              and premium products right to your door within hours of harvest.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We work directly with over 200 local farmers and suppliers across Rwanda to ensure that every product
              in our store meets our high standards for freshness, quality, and sustainability. From the lush hills
              of Rwanda's countryside to your kitchen table, we bridge the gap between farm and fork.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our commitment to Rwanda's agricultural community means supporting fair prices for farmers,
              promoting sustainable farming practices, and contributing to the local economy. When you shop with Inzovu,
              you're not just buying groceries – you're supporting a healthier Rwanda.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
            <img
              src={aboutFarmImage}
              alt="Fresh produce from Rwandan farms"
              className="relative rounded-3xl shadow-2xl w-full h-96 sm:h-[500px] object-cover ring-1 ring-border/50 group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl">
              <p className="text-base sm:text-lg font-bold text-foreground mb-1">Fresh from Rwandan Farms</p>
              <p className="text-sm text-muted-foreground">Supporting local agriculture & sustainable practices</p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
          <Card className="p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-white to-primary/5 dark:from-gray-900 dark:to-primary/5">
            <CardContent className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To revolutionize grocery shopping in Rwanda by providing unparalleled access to fresh, locally-sourced
                products while supporting our farming community and promoting healthy eating habits across the nation.
              </p>
            </CardContent>
          </Card>
          <Card className="p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 hover:border-accent/20 bg-gradient-to-br from-white to-accent/5 dark:from-gray-900 dark:to-accent/5">
            <CardContent className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-accent to-accent/70 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become Rwanda's leading online grocery platform, setting the standard for quality, freshness,
                and customer service while contributing significantly to the growth of sustainable agriculture
                in East Africa.
              </p>
            </CardContent>
          </Card>
        </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-muted-foreground">
                We never compromise on the quality of our products, ensuring every item meets our strict standards
                for freshness, nutrition, and taste.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Focus</h3>
              <p className="text-muted-foreground">
                Supporting local farmers and building a stronger Rwandan community through sustainable practices
                and fair trade partnerships.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Convenience</h3>
              <p className="text-muted-foreground">
                Making grocery shopping easy and convenient with fast, reliable delivery services across
                all major cities in Rwanda.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-muted-foreground">
                Striving for excellence in everything we do, from product selection to customer service,
                setting new standards for online grocery shopping.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-6">
            <CardContent>
              <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Farmers & Suppliers</h3>
              <p className="text-muted-foreground">
                Our network of dedicated farmers and suppliers work tirelessly to bring you the freshest produce
                Rwanda has to offer.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent>
              <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Truck className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Delivery Team</h3>
              <p className="text-muted-foreground">
                Our professional delivery drivers ensure your groceries arrive fresh and on time,
                with care and attention to detail.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent>
              <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Service</h3>
              <p className="text-muted-foreground">
                Our friendly support team is always ready to help with any questions or concerns
                you may have about your orders.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

        {/* Contact Info */}
        <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-3xl p-8 sm:p-12 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-12">Visit Us in Kigali</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div className="text-center bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Address</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">KN 5 Ave, Kimihurura<br />Kigali, Rwanda</p>
            </div>
            <div className="text-center bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground">+250 788 555 123</p>
            </div>
            <div className="text-center bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">info@inzovumarket.rw</p>
            </div>
            <div className="text-center bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Hours</h3>
              <p className="text-sm text-muted-foreground">Mon-Sun: 7AM-9PM</p>
            </div>
          </div>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We serve customers across Rwanda with fast delivery to major cities including Kigali, Musanze, Rubavu, Huye, and Muhanga.
            </p>
            <p className="text-sm text-muted-foreground">
              For bulk orders or special requests, please contact our team directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
