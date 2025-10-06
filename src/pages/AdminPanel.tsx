import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff, Package, ShoppingCart, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useProducts } from "@/contexts/ProductContext";
import { categories as initialCategories } from "@/data/inzovu";
import ProductCard from "@/components/product/ProductCard";

type Category = {
  id: string;
  slug: string;
  title: string;
  image_url: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  unit?: string;
  categorySlug: string;
  image: string;
  description?: string;
  available?: boolean;
};

type Order = {
  id: string;
  user_id: string;
  items: Array<{
    id: string;
    product: Product;
    qty: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  customer_info?: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
};

export default function AdminPanel() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

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

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    slug: "",
    title: "",
    image_url: ""
  });

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/");
        return;
      }

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      const isDevAdmin = (user.email || "").toLowerCase() === "admin@gmail.com";
      if (!roleData && !isDevAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive"
      });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      fetchData();
      loadOrders();
    } catch (error) {
      console.error("Error checking admin status:", error);
      navigate("/");
    }
  };

  const fetchData = async () => {
    try {
      // Load categories from Supabase or use initial data
      const categoriesRes = await supabase.from("categories").select("*").order("title");
      if (categoriesRes.data && categoriesRes.data.length > 0) {
        setCategories(categoriesRes.data);
      } else {
        // Use initial categories if database is empty
        setCategories(initialCategories.map(cat => ({
          id: cat.slug,
          slug: cat.slug,
          title: cat.title,
          image_url: cat.image
        })));
      }
    } catch (error) {
      // Fallback to initial categories
      setCategories(initialCategories.map(cat => ({
        id: cat.slug,
        slug: cat.slug,
        title: cat.title,
        image_url: cat.image
      })));
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = () => {
    // Load orders from localStorage (in a real app, this would be from database)
    const savedOrders = localStorage.getItem('admin_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  };

  const saveOrders = (updatedOrders: Order[]) => {
    localStorage.setItem('admin_orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      id: `p${Date.now()}`,
      name: productForm.name,
      price: parseFloat(productForm.price),
      unit: productForm.unit,
      categorySlug: productForm.category_slug,
      image: productForm.image_url,
      description: productForm.description,
      available: productForm.available
    };

    addProduct(newProduct);

    toast({
      title: "Success",
      description: "Product added successfully"
    });

    setProductForm({
      name: "",
      price: "",
      unit: "",
      category_slug: "",
      image_url: "",
      description: "",
      available: true
    });
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingProduct) return;

    const updatedProduct = {
      ...editingProduct,
      name: productForm.name,
      price: parseFloat(productForm.price),
      unit: productForm.unit,
      categorySlug: productForm.category_slug,
      image: productForm.image_url,
      description: productForm.description,
      available: productForm.available
    };

    updateProduct(updatedProduct);

    toast({
      title: "Success",
      description: "Product updated successfully"
    });

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

  const handleDeleteProduct = (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    deleteProduct(id);

    toast.toast({
      title: "Success",
      description: "Product deleted successfully"
    });
  };

  const toggleProductAvailability = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const updatedProduct = {
        ...product,
        available: !(product.available ?? true)
      };
      updateProduct(updatedProduct);
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId
        ? { ...order, status: newStatus }
        : order
    );
    saveOrders(updatedOrders);
    toast({
      title: "Success",
      description: "Order status updated"
    });
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("categories").insert({
        slug: categoryForm.slug,
        title: categoryForm.title,
        image_url: categoryForm.image_url
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Category added successfully"
      });

      setCategoryForm({
        slug: "",
        title: "",
        image_url: ""
      });

      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add category",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading || isAdmin === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {!selectedCategory ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Select a Category</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
                onClick={() => setSelectedCategory(category)}
              >
                <img
                  src={category.image_url}
                  alt={category.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{category.title}</h2>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Orders</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <CardTitle>Order #{order.id}</CardTitle>
                    <CardDescription>
                      Status: <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      <br />
                      Total: RWF {order.total}
                      <br />
                      Date: {new Date(order.created_at).toLocaleDateString()}
                      {order.customer_info && (
                        <>
                          <br />
                          Customer: {order.customer_info.name} ({order.customer_info.email}) - {order.customer_info.phone}
                          <br />
                          Address: {order.customer_info.address}
                        </>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Select onValueChange={(value) => updateOrderStatus(order.id, value as Order['status'])}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-4">
            <Button onClick={() => setSelectedCategory(null)} variant="outline">
              Back to Categories
            </Button>
          </div>
          <h1 className="text-3xl font-bold mb-6">{selectedCategory.title} Products</h1>
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Add/Edit Product</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
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
                    />
                  </div>
                  <div>
                    <Label htmlFor="category_slug">Category</Label>
                    <Select
                      value={productForm.category_slug}
                      onValueChange={(value) => setProductForm({ ...productForm, category_slug: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.slug} value={cat.slug}>
                            {cat.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      value={productForm.image_url}
                      onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
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
                  <Button type="submit">
                    {editingProduct ? "Update Product" : "Add Product"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products
              .filter((p) => p.categorySlug === selectedCategory.slug)
              .map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{product.name}</h3>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => handleEditProduct(product)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => toggleProductAvailability(product.id)}>
                          {product.available !== false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">RWF {product.price} {product.unit}</p>
                    <p className="text-sm">{product.description}</p>
                    <Badge variant={product.available !== false ? "default" : "secondary"}>
                      {product.available !== false ? "Available" : "Unavailable"}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
