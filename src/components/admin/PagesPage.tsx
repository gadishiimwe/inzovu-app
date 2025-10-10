import React, { useState } from "react";
import { Product } from "@/data/inzovu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FileText, Star, Zap, Tag } from "lucide-react";

interface PagesPageProps {
  products: Product[];
  updateProduct: (id: string, updates: Partial<Product>) => void;
}

export default function PagesPage({ products, updateProduct }: PagesPageProps) {
  const [updating, setUpdating] = useState<string | null>(null);

  const handleToggleFlag = async (productId: string, flag: keyof Product, value: boolean) => {
    setUpdating(productId);
    try {
      updateProduct(productId, { [flag]: value });
    } finally {
      setUpdating(null);
    }
  };

  const getPageStats = () => {
    const newCount = products.filter(p => p.is_new).length;
    const featuredCount = products.filter(p => p.is_featured).length;
    const dealCount = products.filter(p => p.is_deal).length;

    return { newCount, featuredCount, dealCount };
  };

  const stats = getPageStats();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-teal-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pages Management</h1>
          <p className="text-gray-600">Manage product flags for different pages</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Zap className="h-5 w-5" />
              New Arrivals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{stats.newCount}</div>
            <p className="text-blue-700">Products marked as new</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Star className="h-5 w-5" />
              Good Stuff
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">{stats.featuredCount}</div>
            <p className="text-purple-700">Featured products</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-red-800">
              <Tag className="h-5 w-5" />
              Deals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-900">{stats.dealCount}</div>
            <p className="text-red-700">Products on deal</p>
          </CardContent>
        </Card>
      </div>

      {/* Products List */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.categorySlug}</p>
                    <div className="flex gap-2 mt-1">
                      {product.is_new && <Badge variant="secondary" className="text-xs">New</Badge>}
                      {product.is_featured && <Badge variant="secondary" className="text-xs">Featured</Badge>}
                      {product.is_deal && <Badge variant="secondary" className="text-xs">Deal</Badge>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      id={`new-${product.id}`}
                      checked={product.is_new || false}
                      onCheckedChange={(checked) => handleToggleFlag(product.id, 'is_new', checked)}
                      disabled={updating === product.id}
                    />
                    <Label htmlFor={`new-${product.id}`} className="text-sm">New</Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      id={`featured-${product.id}`}
                      checked={product.is_featured || false}
                      onCheckedChange={(checked) => handleToggleFlag(product.id, 'is_featured', checked)}
                      disabled={updating === product.id}
                    />
                    <Label htmlFor={`featured-${product.id}`} className="text-sm">Featured</Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      id={`deal-${product.id}`}
                      checked={product.is_deal || false}
                      onCheckedChange={(checked) => handleToggleFlag(product.id, 'is_deal', checked)}
                      disabled={updating === product.id}
                    />
                    <Label htmlFor={`deal-${product.id}`} className="text-sm">Deal</Label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
