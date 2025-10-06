import { MapPin, Phone, Mail, Clock, MessageSquare, Users, Truck, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Contact() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-6xl">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">Contact <span className="text-primary">Inzovu</span> Market</h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-8 px-2 sm:px-0">
          We're here to help! Whether you have questions about your order, need support with delivery,
          or want to share feedback, our team is ready to assist you. Get in touch with us today.
        </p>
        <div className="flex justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-primary" />
            <span>Fast Response</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-primary" />
            <span>Customer First</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <div className="space-y-6">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Our Location</h3>
                    <p className="text-muted-foreground text-sm">
                      KN 5 Ave, Kimihurura<br />
                      Gasabo District<br />
                      Kigali, Rwanda
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone Support</h3>
                    <p className="text-muted-foreground text-sm mb-1">+250 788 555 123</p>
                    <p className="text-muted-foreground text-sm mb-1">+250 788 555 124</p>
                    <p className="text-xs text-muted-foreground">Mon-Sun: 7AM-9PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-muted-foreground text-sm mb-1">info@inzovumarket.rw</p>
                    <p className="text-muted-foreground text-sm mb-1">support@inzovumarket.rw</p>
                    <p className="text-xs text-muted-foreground">We respond within 2 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-muted-foreground text-sm mb-1">Monday - Sunday</p>
                    <p className="text-muted-foreground text-sm">7:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="p-8">
            <CardContent className="p-0">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block mb-2 font-semibold text-foreground">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block mb-2 font-semibold text-foreground">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 font-semibold text-foreground">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block mb-2 font-semibold text-foreground">Phone Number (Optional)</label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="+250 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block mb-2 font-semibold text-foreground">Subject</label>
                  <select
                    id="subject"
                    required
                    className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="delivery">Delivery Issue</option>
                    <option value="product">Product Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 font-semibold text-foreground">Message</label>
                  <textarea
                    id="message"
                    rows={6}
                    required
                    className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-vertical"
                    placeholder="Please describe your inquiry in detail..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="newsletter"
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <label htmlFor="newsletter" className="text-sm text-muted-foreground">
                    Subscribe to our newsletter for exclusive deals and fresh product updates
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/80 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                >
                  Send Message
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card className="text-center p-6">
          <CardContent className="pt-0">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
            <p className="text-sm text-muted-foreground">
              Our dedicated support team is here to help with any questions about your orders or our services.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center p-6">
          <CardContent className="pt-0">
            <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Delivery Support</h3>
            <p className="text-sm text-muted-foreground">
              Questions about delivery times, tracking, or rescheduling? We're here to assist.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center p-6">
          <CardContent className="pt-0">
            <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Feedback</h3>
            <p className="text-sm text-muted-foreground">
              We value your feedback! Share your thoughts on our products and services.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center p-6">
          <CardContent className="pt-0">
            <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Bulk Orders</h3>
            <p className="text-sm text-muted-foreground">
              Planning an event or need wholesale quantities? Contact us for special arrangements.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="bg-muted/30 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Quick Answers</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">How quickly do you respond?</h3>
            <p className="text-sm text-muted-foreground">We typically respond to all inquiries within 2 hours during business hours.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Do you offer phone support?</h3>
            <p className="text-sm text-muted-foreground">Yes! Call us directly at +250 788 555 123 for immediate assistance.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I visit your location?</h3>
            <p className="text-sm text-muted-foreground">Our office is located in Kigali. Please call ahead to schedule a visit.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Do you serve all of Rwanda?</h3>
            <p className="text-sm text-muted-foreground">Yes, we deliver to major cities across Rwanda including Kigali, Musanze, Rubavu, Huye, and Muhanga.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
