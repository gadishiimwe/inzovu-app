import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, Truck, CreditCard, RefreshCw, Shield, Clock, MapPin, Phone } from "lucide-react";

export default function FAQ() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-6xl">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">Frequently Asked <span className="text-primary">Questions</span></h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-8 px-2 sm:px-0">
          Find answers to common questions about our services, products, and policies.
          Can't find what you're looking for? Contact our support team.
        </p>
        <div className="flex justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            <span>Call Us Anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>Nationwide Delivery</span>
          </div>
        </div>
      </div>

      {/* Quick Help Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
          <CardContent className="pt-0">
            <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Delivery</h3>
            <p className="text-sm text-muted-foreground">
              Questions about shipping, tracking, and delivery times
            </p>
          </CardContent>
        </Card>

        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
          <CardContent className="pt-0">
            <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Payments</h3>
            <p className="text-sm text-muted-foreground">
              Payment methods, security, and billing inquiries
            </p>
          </CardContent>
        </Card>

        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
          <CardContent className="pt-0">
            <RefreshCw className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Returns</h3>
            <p className="text-sm text-muted-foreground">
              Return policies, refunds, and exchanges
            </p>
          </CardContent>
        </Card>

        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
          <CardContent className="pt-0">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Quality</h3>
            <p className="text-sm text-muted-foreground">
              Product freshness, sourcing, and quality assurance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Accordion */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Detailed Answers</h2>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="shipping">
            <AccordionTrigger className="text-left">What are your shipping options and delivery times?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-3">We offer fast and reliable delivery across all major cities in Rwanda:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Kigali:</strong> Same-day delivery for orders placed before 2 PM (2-4 hours)</li>
                <li><strong>Major Cities:</strong> Next-day delivery (Musanze, Rubavu, Huye, Muhanga)</li>
                <li><strong>Free Delivery:</strong> Orders above 10,000 RWF qualify for free delivery</li>
                <li><strong>Express Delivery:</strong> Available for urgent orders (additional fee applies)</li>
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">
                All deliveries are tracked and you receive SMS updates throughout the process.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="returns">
            <AccordionTrigger className="text-left">What is your return and refund policy?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-3">We stand behind our products with a comprehensive return policy:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Return Window:</strong> 7 days from delivery date</li>
                <li><strong>Conditions:</strong> Products must be unopened, unused, and in original packaging</li>
                <li><strong>Perishables:</strong> Fruits and vegetables cannot be returned due to freshness concerns</li>
                <li><strong>Refund Process:</strong> Refunds processed within 3-5 business days</li>
                <li><strong>Exchanges:</strong> Available for damaged or incorrect items</li>
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">
                Contact our support team to initiate a return. We'll guide you through the process.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="payment">
            <AccordionTrigger className="text-left">What payment methods do you accept?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-3">We offer multiple secure payment options:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Mobile Money:</strong> MTN Mobile Money and Airtel Money</li>
                <li><strong>Credit/Debit Cards:</strong> Visa, Mastercard, and American Express</li>
                <li><strong>Bank Transfer:</strong> Direct bank transfers</li>
                <li><strong>Cash on Delivery:</strong> Pay when you receive your order</li>
                <li><strong>Digital Wallets:</strong> PayPal and other digital payment methods</li>
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">
                All transactions are secured with SSL encryption. Your payment information is never stored on our servers.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="freshness">
            <AccordionTrigger className="text-left">How do you ensure product freshness and quality?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-3">Freshness is our top priority at Inzovu Market:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Local Sourcing:</strong> Direct partnerships with 200+ Rwandan farmers</li>
                <li><strong>Daily Harvest:</strong> Products harvested the same day or night before delivery</li>
                <li><strong>Temperature Control:</strong> Specialized packaging and refrigerated transport</li>
                <li><strong>Quality Checks:</strong> Multiple quality inspections before shipping</li>
                <li><strong>Sustainability:</strong> Supporting eco-friendly farming practices</li>
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">
                Each product comes with a freshness guarantee. If you're not satisfied, we'll make it right.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ordering">
            <AccordionTrigger className="text-left">How do I place an order and what are the minimum requirements?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-3">Ordering with Inzovu Market is simple and convenient:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Minimum Order:</strong> No minimum order value required</li>
                <li><strong>Order Process:</strong> Add items to cart, checkout, and confirm payment</li>
                <li><strong>Order Confirmation:</strong> Receive SMS and email confirmation</li>
                <li><strong>Order Modification:</strong> Contact us within 30 minutes to modify orders</li>
                <li><strong>Bulk Orders:</strong> Special arrangements for large quantities</li>
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">
                New customers receive a welcome discount on their first order!
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="account">
            <AccordionTrigger className="text-left">Do I need to create an account to shop?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-3">While an account is not required, creating one offers many benefits:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Order History:</strong> Track all your previous orders</li>
                <li><strong>Faster Checkout:</strong> Saved addresses and payment methods</li>
                <li><strong>Exclusive Deals:</strong> Member-only discounts and promotions</li>
                <li><strong>Loyalty Points:</strong> Earn points on every purchase</li>
                <li><strong>Personalized Recommendations:</strong> Based on your shopping preferences</li>
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">
                Guest checkout is available for one-time purchases. You can create an account anytime.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="substitutions">
            <AccordionTrigger className="text-left">What happens if an item is out of stock?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-3">We handle out-of-stock situations thoughtfully:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Automatic Substitutions:</strong> We select similar quality alternatives</li>
                <li><strong>Customer Notification:</strong> SMS and email alerts for substitutions</li>
                <li><strong>Refund Options:</strong> Full refund for unavailable items</li>
                <li><strong>Seasonal Adjustments:</strong> Recommendations based on seasonal availability</li>
                <li><strong>Quality Guarantee:</strong> All substitutions meet our quality standards</li>
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">
                You can specify substitution preferences in your order notes or contact us directly.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="safety">
            <AccordionTrigger className="text-left">What safety measures do you have in place?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-3">Your safety and satisfaction are our priorities:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Contactless Delivery:</strong> No-contact delivery options available</li>
                <li><strong>Sanitization:</strong> All products and packaging sanitized</li>
                <li><strong>Driver Safety:</strong> Health screenings for all delivery personnel</li>
                <li><strong>Quality Assurance:</strong> Regular testing of products and processes</li>
                <li><strong>Customer Support:</strong> 24/7 assistance for any concerns</li>
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">
                We follow all local health and safety guidelines to ensure safe delivery.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sustainability">
            <AccordionTrigger className="text-left">How do you support sustainable farming?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-3">Sustainability is at the heart of our operations:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Local Farmers:</strong> Direct support for Rwandan agricultural community</li>
                <li><strong>Eco-Friendly Packaging:</strong> Biodegradable and recyclable materials</li>
                <li><strong>Carbon Footprint:</strong> Optimized delivery routes to reduce emissions</li>
                <li><strong>Water Conservation:</strong> Supporting sustainable irrigation practices</li>
                <li><strong>Community Impact:</strong> Contributing to local economic development</li>
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">
                By shopping with Inzovu, you're supporting sustainable agriculture in Rwanda.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Contact Section */}
      <div className="bg-muted/30 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our customer support team is here to help. Reach out to us through any of these channels
          and we'll get back to you as soon as possible.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-primary" />
            <span>Call: +250 788 555 123</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span>Email: support@inzovumarket.rw</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span>Mon-Sun: 7AM-9PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
