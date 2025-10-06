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
import { Edit, Trash2 } from "lucide-react";

interface ProductsPageProps {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

export default function ProductsPage({ products, addProduct, updateProduct, deleteProduct }: ProductsPageProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
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

  const submitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.categorySlug) {
      alert("Category required");
      return;
    }
    if (editingId) {
      updateProduct({
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
      addProduct({
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
  };

  const removeProduct = (id: string) => {
    deleteProduct(id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={startAdd} className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div
                className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                  (product as any).available === false ? "bg-red-500 text-white" : "bg-green-500 text-white"
                }`}
              >
                {(product as any).available === false ? "Unavailable" : "Available"}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-1">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">
                RWF {product.price} {product.unit}
              </p>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(product)} className="flex-1">
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive" className="flex-1">
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>This action cannot be undone. This will permanently delete the product "{product.name}".</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => removeProduct(product.id)} className="bg-red-600 hover:bg-red-700">
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
              <Button type="submit" className="flex-1">
                {editingId ? "Update Product" : "Add Product"}
              </Button>
              <Button type="button" variant="secondary" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
