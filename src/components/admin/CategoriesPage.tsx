import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { useProducts } from "@/contexts/ProductContext";
import { useToast } from "@/hooks/use-toast";
import { categories as initialCategories } from "@/data/inzovu";

interface Category {
  slug: string;
  title: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  unit?: string;
  categorySlug: string;
  image: string;
  description?: string;
  available?: boolean;
}

export default function CategoriesPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newCategory, setNewCategory] = useState<Category>({ slug: "", title: "", image: "" });

  // Product form state
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    unit: "",
    category_slug: "",
    image_url: "",
    description: "",
    available: true
  });

  const submitCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.slug || !newCategory.title) {
      toast({ title: "Error", description: "Slug and Title are required", variant: "destructive" });
      return;
    }
    setCategories((prev) => [...prev, newCategory]);
    setNewCategory({ slug: "", title: "", image: "" });
    setDialogOpen(false);
    toast({ title: "Success", description: "Category added successfully" });
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      toast({ title: "Error", description: "Name and Price are required", variant: "destructive" });
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: productForm.name,
      price: parseFloat(productForm.price),
      unit: productForm.unit,
      categorySlug: selectedCategory!.slug,
      image: productForm.image_url,
      description: productForm.description,
      available: productForm.available
    };

    addProduct(newProduct);
    setProductForm({
      name: "",
      price: "",
      unit: "",
      category_slug: "",
      image_url: "",
      description: "",
      available: true
    });
    toast({ title: "Success", description: "Product added successfully" });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      unit: product.unit || "",
      category_slug: product.categorySlug,
      image_url: product.image,
      description: product.description || "",
      available: product.available ?? true
    });
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const updatedProduct: Product = {
      ...editingProduct,
      name: productForm.name,
      price: parseFloat(productForm.price),
      unit: productForm.unit,
      image: productForm.image_url,
      description: productForm.description,
      available: productForm.available
    };

    updateProduct(updatedProduct);
    setEditingProduct(null);
    setProductForm({
      name: "",
      price: "",
      unit: "",
      category_slug: "",
      image_url: "",
      description: "",
      available: true
    });
    toast({ title: "Success", description: "Product updated successfully" });
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
      toast({ title: "Success", description: "Product deleted successfully" });
    }
  };

  const toggleProductAvailability = (product: Product) => {
    const updatedProduct = { ...product, available: !(product.available ?? true) };
    updateProduct(updatedProduct);
    toast({
      title: "Success",
      description: `Product ${updatedProduct.available ? "enabled" : "disabled"}`
    });
  };

  const categoryProducts = selectedCategory
    ? products.filter(p => p.categorySlug === selectedCategory.slug)
    : [];

  if (selectedCategory) {
    return (
      <div>
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Categories
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{selectedCategory.title}</h1>
            <p className="text-gray-600">Manage products in this category</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add/Edit Product Form */}
          <Card>
            <CardHeader>
              <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      value={productForm.unit}
                      onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}
                      placeholder="e.g., /kg, each"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    value={productForm.image_url}
                    onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="available"
                    checked={productForm.available}
                    onCheckedChange={(checked) => setProductForm({ ...productForm, available: checked })}
                  />
                  <Label htmlFor="available">Available</Label>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingProduct ? "Update Product" : "Add Product"}
                  </Button>
                  {editingProduct && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingProduct(null);
                        setProductForm({
                          name: "",
                          price: "",
                          unit: "",
                          category_slug: "",
                          image_url: "",
                          description: "",
                          available: true
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Products List */}
          <Card>
            <CardHeader>
              <CardTitle>Products ({categoryProducts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {categoryProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-600">
                          RWF {product.price} {product.unit}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={product.available !== false ? "default" : "secondary"}>
                        {product.available !== false ? "Available" : "Unavailable"}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleProductAvailability(product)}
                      >
                        {product.available !== false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {categoryProducts.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No products in this category yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">Add Category</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>Fill in the details to add a new category.</DialogDescription>
            </DialogHeader>
            <form onSubmit={submitCategory} className="space-y-4">
              <div>
                <Label htmlFor="category-slug">Category Slug</Label>
                <Input
                  id="category-slug"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                  placeholder="e.g., vegetables"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category-title">Category Title</Label>
                <Input
                  id="category-title"
                  value={newCategory.title}
                  onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                  placeholder="e.g., Fresh Vegetables"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category-image">Image URL</Label>
                <Input
                  id="category-image"
                  value={newCategory.image}
                  onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  Add Category
                </Button>
                <Button type="button" variant="secondary" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const productCount = products.filter(p => p.categorySlug === category.slug).length;
          return (
            <Card
              key={category.slug}
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white border-0 shadow-lg rounded-xl overflow-hidden"
              onClick={() => setSelectedCategory(category)}
            >
              <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <img src={category.image} alt={category.title} className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg" />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-2">{productCount} products</p>
                <p className="text-sm text-gray-500">Click to manage products</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
