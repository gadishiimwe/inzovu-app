import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ReportStats {
  totalProducts: number;
  availableProducts: number;
  totalCategories: number;
  totalCustomers: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  inventoryValue: number;
}

export default function ReportsPage() {
  const { toast } = useToast();
  const [stats, setStats] = useState<ReportStats>({
    totalProducts: 0,
    availableProducts: 0,
    totalCategories: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    inventoryValue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        setLoading(true);

        // Fetch products
        const { data: products, error: productsError } = await supabase
          .from("products")
          .select("*");

        if (productsError) throw productsError;

        // Fetch categories
        const { count: categoriesCount, error: categoriesError } = await supabase
          .from("categories")
          .select("*", { count: "exact", head: true });

        if (categoriesError) throw categoriesError;

        // Fetch customers
        const { count: customersCount, error: customersError } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        if (customersError) throw customersError;

        // Fetch orders
        const { data: orders, error: ordersError } = await supabase
          .from("orders")
          .select("*");

        if (ordersError) throw ordersError;

        // Calculate stats
        const totalProducts = products?.length || 0;
        const availableProducts = products?.filter(p => p.available !== false).length || 0;
        const inventoryValue = products?.reduce((sum, product) => sum + (product.price || 0), 0) || 0;

        const totalOrders = orders?.length || 0;
        const totalRevenue = orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;
        const pendingOrders = orders?.filter(order => order.status === 'pending').length || 0;
        const completedOrders = orders?.filter(order => ['delivered', 'shipped'].includes(order.status)).length || 0;

        setStats({
          totalProducts,
          availableProducts,
          totalCategories: categoriesCount || 0,
          totalCustomers: customersCount || 0,
          totalOrders,
          totalRevenue,
          pendingOrders,
          completedOrders,
          inventoryValue,
        });

      } catch (error) {
        console.error("Error fetching stats:", error);
        toast({
          title: "Error",
          description: "Failed to load report data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reports & Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.availableProducts} available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCategories}</div>
            <p className="text-xs text-muted-foreground">
              Product categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              Registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">RWF {stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From {stats.totalOrders} orders
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Order Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Orders</span>
                <span className="font-semibold text-blue-600">{stats.totalOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Pending Orders</span>
                <span className="font-semibold text-yellow-600">{stats.pendingOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Completed Orders</span>
                <span className="font-semibold text-green-600">{stats.completedOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Average Order Value</span>
                <span className="font-semibold">
                  RWF {stats.totalOrders > 0 ? (stats.totalRevenue / stats.totalOrders).toLocaleString() : 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Available Products</span>
                <span className="font-semibold text-green-600">{stats.availableProducts}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Unavailable Products</span>
                <span className="font-semibold text-red-600">{stats.totalProducts - stats.availableProducts}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Products</span>
                <span className="font-semibold">{stats.totalProducts}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Inventory Value</span>
                <span className="font-semibold">RWF {stats.inventoryValue.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Categories</span>
                <span className="font-semibold">{stats.totalCategories}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Customers</span>
                <span className="font-semibold">{stats.totalCustomers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Products per Category</span>
                <span className="font-semibold">
                  {stats.totalCategories > 0 ? (stats.totalProducts / stats.totalCategories).toFixed(1) : 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Revenue</span>
                <span className="font-semibold text-green-600">RWF {stats.totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Revenue per Customer</span>
                <span className="font-semibold">
                  RWF {stats.totalCustomers > 0 ? (stats.totalRevenue / stats.totalCustomers).toLocaleString() : 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Conversion Rate</span>
                <span className="font-semibold">
                  {stats.totalCustomers > 0 ? ((stats.totalOrders / stats.totalCustomers) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Pending</span>
                <span className="font-semibold text-yellow-600">
                  {stats.pendingOrders} ({stats.totalOrders > 0 ? ((stats.pendingOrders / stats.totalOrders) * 100).toFixed(1) : 0}%)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Processing</span>
                <span className="font-semibold text-blue-600">
                  {stats.totalOrders - stats.pendingOrders - stats.completedOrders}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Completed</span>
                <span className="font-semibold text-green-600">
                  {stats.completedOrders} ({stats.totalOrders > 0 ? ((stats.completedOrders / stats.totalOrders) * 100).toFixed(1) : 0}%)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
