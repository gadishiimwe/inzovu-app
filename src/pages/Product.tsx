import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useProducts } from "@/contexts/ProductContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Truck, Shield, Leaf, Clock, Users, Heart, Share2 } from "lucide-react";

export default function Product() {
  const { id } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const { products } = useProducts();
  const product = products.find((p) => p.id === id);
  const params = new URLSearchParams(search);
  const from = params.get("from");

  const addToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const idx = cart.findIndex((c: any) => c.id === product.id);
    if (idx > -1) cart[idx].qty += 1; else cart.push({ id: product.id, qty: 1, product });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart:updated"));
  };

  const addToWishlist = () => {
    if (!product) return;
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (!wishlist.find((w: any) => w.id === product.id)) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      window.dispatchEvent(new Event("wishlist:updated"));
    }
  };

  // Get related products from same category
  const relatedProducts = products
    .filter(p => p.categorySlug === product?.categorySlug && p.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-2xl font-semibold mb-2">Product not found</h1>
        <Link to="/shop" className="story-link">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs items={[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/shop" },
            ...(product ? [{ label: product.categorySlug, to: `/category/${product.categorySlug}` }] : []),
            { label: product.name }
          ]} />
        </div>

        {/* Back Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2" onClick={() => {
            if (from) navigate(from);
            else navigate(-1);
          }}>
            ← Back
          </button>
          <div className="text-sm text-gray-500">
            <Link to="/shop" className="text-blue-600 hover:text-blue-800">Shop</Link>
            {product && <> / <Link to={`/category/${product.categorySlug}`} className="text-blue-600 hover:text-blue-800">{product.categorySlug}</Link> / <span>{product.name}</span></>}
          </div>
        </div>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.image}
                alt={`${product.name} - Inzovu Market product image`}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
                loading="lazy"
              />
              <Badge className="absolute top-4 left-4 bg-green-500 hover:bg-green-600">
                <Leaf className="w-3 h-3 mr-1" />
                Fresh
              </Badge>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {/* Additional product images would go here */}
              <img src={product.image} alt="" className="w-full h-20 object-cover rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-500" />
              <img src={product.image} alt="" className="w-full h-20 object-cover rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-500" />
              <img src={product.image} alt="" className="w-full h-20 object-cover rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-500" />
              <img src={product.image} alt="" className="w-full h-20 object-cover rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-500" />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(4.8) • 127 reviews</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-green-600">
                RWF {Math.round(product.price).toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">{product.unit || "per unit"}</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                In Stock
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={addToCart} size="lg" className="flex-1 bg-green-600 hover:bg-green-700">
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" onClick={addToWishlist}>
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <div className="text-sm font-medium">Free Delivery</div>
                <div className="text-xs text-gray-500">Orders over RWF 10,000</div>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="text-sm font-medium">Quality Assured</div>
                <div className="text-xs text-gray-500">Farm to table</div>
              </div>
              <div className="text-center">
                <Clock className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                <div className="text-sm font-medium">Fresh Today</div>
                <div className="text-xs text-gray-500">Picked this morning</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="details" className="mb-12">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  Product Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Origin & Sourcing</h4>
                  <p className="text-gray-600">
                    This premium {product.categorySlug} is sourced directly from local Rwandan farms,
                    ensuring maximum freshness and supporting our local agricultural community.
                    Each item is carefully selected and quality-checked before reaching your table.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Quality Standards</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Organic farming practices</li>
                    <li>No artificial preservatives</li>
                    <li>Regular quality inspections</li>
                    <li>Sustainable harvesting methods</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Usage Tips</h4>
                  <p className="text-gray-600">
                    Perfect for fresh consumption, cooking, or meal preparation.
                    This versatile {product.categorySlug} adds nutrition and flavor to any dish.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Nutritional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Per 100g serving</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Energy</span>
                        <span>52 kcal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Protein</span>
                        <span>1.2g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Carbohydrates</span>
                        <span>12.5g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fiber</span>
                        <span>2.4g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vitamin C</span>
                        <span>48mg</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Health Benefits</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Rich in antioxidants</li>
                      <li>Supports immune system</li>
                      <li>Good source of fiber</li>
                      <li>Low in calories</li>
                      <li>Natural vitamins and minerals</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="storage" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Storage & Care Instructions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Refrigeration</h4>
                  <p className="text-gray-600">
                    Store in the refrigerator crisper drawer at 4°C (39°F) for maximum freshness.
                    Keep away from ethylene-producing fruits like apples and tomatoes.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Shelf Life</h4>
                  <p className="text-gray-600">
                    Best consumed within 5-7 days of purchase. Check regularly for freshness
                    and consume immediately if any signs of spoilage appear.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Freezing</h4>
                  <p className="text-gray-600">
                    Can be frozen for up to 3 months. Wash, dry, and store in airtight containers
                    or freezer bags. Thaw in refrigerator before use.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    Customer Reviews (127)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Sophie M.</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-gray-600">
                        "Outstanding quality and incredibly fresh! The delivery was fast and the packaging
                        kept everything in perfect condition. Will definitely order again."
                      </p>
                    </div>

                    <div className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">James K.</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">1 week ago</span>
                      </div>
                      <p className="text-gray-600">
                        "Very fresh and tasty. The quality is consistently excellent. Love supporting
                        local farmers through this platform."
                      </p>
                    </div>

                    <div className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Marie L.</span>
                          <div className="flex">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <Star className="w-4 h-4 text-gray-300" />
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">2 weeks ago</span>
                      </div>
                      <p className="text-gray-600">
                        "Great product, though delivery took a bit longer than expected. Quality was
                        still excellent when it arrived."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">How fresh is this product?</h4>
                  <p className="text-gray-600">
                    All our products are sourced fresh daily from local farms. This item was harvested/picked
                    within the last 24-48 hours and delivered directly to maintain maximum freshness.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">What if I'm not satisfied with the quality?</h4>
                  <p className="text-gray-600">
                    We stand behind our quality guarantee. If you're not completely satisfied,
                    contact our customer service within 24 hours of delivery for a full refund or replacement.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Can I cancel or modify my order?</h4>
                  <p className="text-gray-600">
                    Orders can be modified or cancelled up to 2 hours before scheduled delivery.
                    Please contact our customer service team for assistance.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Do you offer bulk discounts?</h4>
                  <p className="text-gray-600">
                    Yes! We offer bulk pricing for orders of 5+ units. Contact our sales team
                    for custom pricing on larger quantities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  You might also like
                </h2>
                <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover more fresh, high-quality products from our curated selection
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <Card key={relatedProduct.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white border-0 rounded-2xl shadow-lg hover:shadow-green-500/10">
                  <CardContent className="p-0">
                    <Link to={`/product/${relatedProduct.id}`} className="block">
                      <div className="relative overflow-hidden">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Sale Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                            Sale
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="absolute top-3 right-3">
                          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-semibold text-gray-800">4.5</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-green-600 transition-colors line-clamp-2 leading-tight">
                          {relatedProduct.name}
                        </h3>

                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl font-bold text-green-600">
                            RWF {Math.round(relatedProduct.price).toLocaleString()}
                          </span>
                          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            per {relatedProduct.unit || "unit"}
                          </span>
                        </div>

                        <div className="flex items-center justify-center">
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                          >
                            <span className="flex items-center gap-2">
                              View Details
                              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* View More CTA */}
            <div className="text-center mt-10">
              <Link to="/shop">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-xl px-8 py-3 font-semibold transition-all duration-300 hover:scale-105"
                >
                  Explore All Products
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Love fresh, local produce?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Inzovu Market for their daily fresh food needs.
            Quality you can taste, freshness you can see.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link to="/shop">Shop More Products</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/about">Learn About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
