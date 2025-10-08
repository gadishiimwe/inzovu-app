import React, { useState } from "react";
import type { Product } from "@/data/inzovu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2, Loader2, Package, Plus, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductsPageProps {
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loading: boolean;
}

export default function ProductsPage({ products, addProduct, updateProduct, deleteProduct, loading }: ProductsPageProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<Omit<Product, "id"> & { id?: string; available?: boolean }>({
    name: "",
    price: 0,
    unit: "",
    categorySlug: "",
    image: "",
    description: "",
    available: true,
  });

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      id: p.id,
      name: p.name,
      price: p.price,
      unit: p.unit || "",
      categorySlug: p.categorySlug,
      image: p.image,
      description: p.description || "",
      available: (p as any).available !== false,
    });
    setDialogOpen(true);
  };

  const startAdd = () => {
    setEditingId(null);
    setForm({
      name: "",
      price: 0,
      unit: "",
      categorySlug: "",
      image: "",
      description: "",
      available: true,
    });
    setDialogOpen(true);
  };

  const clearForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      price: 0,
      unit: "",
      categorySlug: "",
      image: "",
      description: "",
      available: true,
    });
    setDialogOpen(false);
  };

  const submitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.categorySlug) {
      alert("Category required");
      return;
    }
    setSubmitting(true);
    try {
      if (editingId) {
        await updateProduct({
          id: editingId,
          name: form.name,
          price: Number(form.price),
          unit: form.unit,
          categorySlug: form.categorySlug,
          image: form.image,
          description: form.description,
          available: form.available,
        } as any);
      } else {
        const id = crypto.randomUUID();
        await addProduct({
          id,
          name: form.name,
          price: Number(form.price),
          unit: form.unit,
          categorySlug: form.categorySlug,
          image: form.image,
          description: form.description,
          available: form.available,
        } as any);
      }
      clearForm();
    } catch (error) {
      console.error('Error submitting product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const removeProduct = (id: string) => {
    deleteProduct(id);
  };

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
            Product Management
          </h1>
          <p className="text-slate-600 text-lg">Manage your product catalog and inventory</p>
        </div>
        <Button onClick={startAdd} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Total Products</CardTitle>
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
              <Package className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-blue-600 mb-1">{products.length}</div>
            <p className="text-sm text-slate-500 font-medium">In catalog</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-50"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Available</CardTitle>
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-lg">
              <Package className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {products.filter(p => (p as any).available !== false).length}
            </div>
            <p className="text-sm text-slate-500 font-medium">Ready for sale</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 opacity-50"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Categories</CardTitle>
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
              <Filter className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {new Set(products.map(p => p.categorySlug)).size}
            </div>
            <p className="text-sm text-slate-500 font-medium">Product categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <Card key={product.id} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-in slide-in-from-bottom delay-100">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-10 translate-x-10"></div>

            <div className="relative">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Availability Badge */}
              <div className="absolute top-3 right-3">
                <Badge
                  variant={(product as any).available === false ? "destructive" : "default"}
                  className={`px-3 py-1 text-xs font-medium shadow-lg ${
                    (product as any).available === false
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {(product as any).available === false ? "Unavailable" : "Available"}
                </Badge>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="px-2 py-1 text-xs font-medium bg-white/90 text-slate-700 shadow-md">
                  {product.categorySlug}
                </Badge>
              </div>
            </div>

            <CardContent className="relative p-5 space-y-3">
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-2">{product.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-900">
                    RWF {product.price.toLocaleString()}
                  </span>
                  {product.unit && (
                    <span className="text-sm text-slate-500">per {product.unit}</span>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startEdit(product)}
                  className="flex-1 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-blue-200 text-blue-700 hover:text-blue-800 transition-all duration-300"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Product</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{product.name}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => removeProduct(product.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>{editingId ? "Update the product details below." : "Fill in the details to add a new product."}</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitProduct} className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="price">Price (RWF)</Label>
              <Input id="price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required />
            </div>
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Input id="unit" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="/kg, each, /l" />
            </div>
            <div>
              <Label htmlFor="categorySlug">Category Slug</Label>
              <Input id="categorySlug" value={form.categorySlug} onChange={(e) => setForm({ ...form, categorySlug: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="available" checked={form.available !== false} onCheckedChange={(v) => setForm({ ...form, available: !!v })} />
              <Label htmlFor="available">Available</Label>
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={submitting} className="flex-1">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {editingId ? "Update Product" : "Add Product"}
              </Button>
              <Button type="button" variant="secondary" onClick={() => setDialogOpen(false)} disabled={submitting}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
