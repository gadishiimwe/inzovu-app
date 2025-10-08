import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Pencil, Trash2, Eye, EyeOff, Loader2, Tags, Package, TrendingUp } from "lucide-react";
import { useProducts } from "@/contexts/ProductContext";
import { useCategories } from "@/contexts/CategoryContext";
import { useToast } from "@/hooks/use-toast";

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
  const { categories, addCategory, deleteCategory } = useCategories();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newCategory, setNewCategory] = useState<Category>({ slug: "", title: "", image: "" });
  const [submitting, setSubmitting] = useState(false);

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

  const submitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.slug || !newCategory.title) {
      toast({ title: "Error", description: "Slug and Title are required", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await addCategory(newCategory);
      setNewCategory({ slug: "", title: "", image: "" });
      setDialogOpen(false);
      toast({ title: "Success", description: "Category added successfully" });
    } catch (error) {
      console.error("Error adding category:", error);
      toast({ title: "Error", description: "Failed to add category", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
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

  const handleDeleteCategory = async (categorySlug: string, categoryTitle: string) => {
    if (window.confirm(`Are you sure you want to delete the "${categoryTitle}" category? This action cannot be undone.`)) {
      try {
        await deleteCategory(categorySlug);
        toast({ title: "Success", description: "Category deleted successfully" });
      } catch (error) {
        console.error("Error deleting category:", error);
        toast({ title: "Error", description: "Failed to delete category", variant: "destructive" });
      }
    }
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
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent">
            Category Management
          </h1>
          <p className="text-slate-600 text-lg">Organize and manage your product categories</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Category
            </Button>
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
                <Button type="submit" disabled={submitting} className="flex-1">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Add Category
                </Button>
                <Button type="button" variant="secondary" onClick={() => setDialogOpen(false)} disabled={submitting}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 opacity-50"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Total Categories</CardTitle>
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg">
              <Tags className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-purple-600 mb-1">{categories.length}</div>
            <p className="text-sm text-slate-500 font-medium">Active categories</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-50"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Total Products</CardTitle>
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-lg">
              <Package className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-green-600 mb-1">{products.length}</div>
            <p className="text-sm text-slate-500 font-medium">Across all categories</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 opacity-50"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Avg Products</CardTitle>
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {categories.length > 0 ? Math.round(products.length / categories.length) : 0}
            </div>
            <p className="text-sm text-slate-500 font-medium">Per category</p>
          </CardContent>
        </Card>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category, index) => {
          const productCount = products.filter(p => p.categorySlug === category.slug).length;
          return (
            <Card
              key={category.slug}
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer animate-in slide-in-from-bottom delay-100"
              onClick={() => setSelectedCategory(category)}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-10 translate-x-10"></div>

              <div className="relative h-48 bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 flex items-center justify-center overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-2xl group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <CardContent className="relative p-6 text-center space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-purple-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-slate-600 text-sm">Click to manage products</p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Badge variant="secondary" className="px-3 py-1 bg-purple-100 text-purple-700 hover:bg-purple-200">
                    <Package className="w-3 h-3 mr-1" />
                    {productCount} products
                  </Badge>
                </div>

                {/* Delete button - appears on hover */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category.slug, category.title);
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
