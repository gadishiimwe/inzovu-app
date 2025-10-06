import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Package, Users, ShoppingCart, DollarSign } from "lucide-react";
import { categories } from "@/data/inzovu";
import type { Product } from "@/data/inzovu";
import { useProducts } from "@/contexts/ProductContext";

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    categorySlug: "",
    unit: "piece",
    description: ""
  });

  // Mock stats - in a real app, these would come from an API
  const stats = {
    totalProducts: products.length,
    totalCategories: categories.length,
    totalOrders: 0, // Would be fetched from API
    totalRevenue: 0 // Would be fetched from API
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : `p${Date.now()}`,
      name: formData.name,
      price: parseFloat(formData.price),
      image: formData.image,
      categorySlug: formData.categorySlug,
      unit: formData.unit,
      description: formData.description
    };

    if (editingProduct) {
      updateProduct(newProduct);
      setEditingProduct(null);
    } else {
      addProduct(newProduct);
    }

    setFormData({
      name: "",
      price: "",
      image: "",
      categorySlug: "",
      unit: "piece",
      description: ""
    });
    setIsAddDialogOpen(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      categorySlug: product.categorySlug,
      unit: product.unit || "piece",
      description: product.description || ""
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      image: "",
      categorySlug: "",
      unit: "piece",
      description: ""
    });
    setEditingProduct(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your products and store settings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCategories}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">RWF {stats.totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Products Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Products Management</CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Product Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Price (RWF)</label>
                    <Input
                      type="number"
                      step="1"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="Enter price in RWF"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Image URL</label>
                    <Input
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="Enter image URL"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <Select value={formData.categorySlug} onValueChange={(value) => setFormData(prev => ({ ...prev, categorySlug: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.slug} value={category.slug}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Unit</label>
                    <Input
                      value={formData.unit}
                      onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                      placeholder="e.g., piece, kg, liter"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter product description"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingProduct ? "Update Product" : "Add Product"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-square overflow-hidden bg-muted/20">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-lg font-bold text-primary mb-2">
                    RWF {product.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {categories.find(c => c.slug === product.categorySlug)?.title || product.categorySlug} • {product.unit || 'piece'}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(product)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
