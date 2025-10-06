import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { products } from "@/data/inzovu";
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
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <Link to={`/product/${relatedProduct.id}`}>
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                        <p className="text-green-600 font-bold">
                          RWF {Math.round(relatedProduct.price).toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
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
