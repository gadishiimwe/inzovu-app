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
