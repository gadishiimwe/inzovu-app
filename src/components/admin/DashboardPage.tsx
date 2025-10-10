import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Users, Package, TrendingUp, DollarSign, AlertTriangle, Activity, Eye, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useProducts } from "@/contexts/ProductContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DashboardPageProps {
  orders: any[];
}

interface DashboardStats {
  totalProducts: number;
  availableProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  totalCustomers: number;
}

export default function DashboardPage({ orders }: DashboardPageProps) {
  const { products } = useProducts();
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    availableProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalCustomers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      // Fetch orders (handle if table doesn't exist)
      let ordersData: any[] = [];
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error) {
          ordersData = data || [];
        }
      } catch (error) {
        console.log("Orders table not available, using empty data");
      }

      // Fetch customers count (handle if table doesn't exist)
      let customersCount = 0;
      try {
        const { count, error } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        if (!error) {
          customersCount = count || 0;
        }
      } catch (error) {
        console.log("Profiles table not available, using 0 customers");
      }

      // Calculate stats
      const totalProducts = products.length;
      const availableProducts = products.filter(p => p.available !== false).length;
      const totalOrders = ordersData.length;
      const totalRevenue = ordersData.reduce((sum, order) => sum + (order.total || 0), 0);
      const pendingOrders = ordersData.filter(order => order.status === 'pending').length;
      const completedOrders = ordersData.filter(order => ['delivered', 'shipped'].includes(order.status)).length;

      setStats({
        totalProducts,
        availableProducts,
        totalOrders,
        totalRevenue,
        pendingOrders,
        completedOrders,
        totalCustomers: customersCount,
      });

      setRecentOrders(ordersData.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      subtitle: `${stats.availableProducts} available`,
      icon: Package,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      textColor: "text-blue-600"
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      subtitle: `${stats.completedOrders} completed`,
      icon: ShoppingCart,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
      textColor: "text-green-600"
    },
    {
      title: "Revenue",
      value: `RWF ${stats.totalRevenue.toLocaleString()}`,
      subtitle: `${stats.pendingOrders} pending`,
      icon: DollarSign,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
      textColor: "text-purple-600"
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      subtitle: "Registered users",
      icon: Users,
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100",
      textColor: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-slate-600 text-lg">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <TrendingUp className="w-5 h-5 mr-2" />
          View Detailed Reports
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={stat.title} className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-in slide-in-from-bottom-${index + 1} delay-${index * 100}`}>
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50`}></div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>

            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-700">{stat.title}</CardTitle>
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className={`text-3xl font-bold ${stat.textColor} mb-1`}>{stat.value}</div>
              <p className="text-sm text-slate-500 font-medium">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 shadow-xl border-0 bg-gradient-to-br from-white to-slate-50/50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={order.id} className={`flex items-center justify-between p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100 animate-in slide-in-from-left delay-${index * 50}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">#{order.id.slice(-2)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Order #{order.id}</p>
                      <p className="text-sm text-slate-600">{order.name}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <Badge
                      variant={
                        order.status === "Delivered" ? "default" :
                        order.status === "Processing" ? "secondary" :
                        order.status === "Pending" ? "outline" : "destructive"
                      }
                      className={`px-3 py-1 text-xs font-medium ${
                        order.status === "Delivered" ? "bg-green-100 text-green-800 border-green-200" :
                        order.status === "Processing" ? "bg-blue-100 text-blue-800 border-blue-200" :
                        order.status === "Pending" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                        "bg-red-100 text-red-800 border-red-200"
                      }`}
                    >
                      {order.status === "Delivered" && <CheckCircle className="w-3 h-3 mr-1" />}
                      {order.status === "Processing" && <Clock className="w-3 h-3 mr-1" />}
                      {order.status === "Pending" && <Activity className="w-3 h-3 mr-1" />}
                      {order.status === "Cancelled" && <XCircle className="w-3 h-3 mr-1" />}
                      {order.status}
                    </Badge>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">RWF {order.stockValue}</p>
                      <p className="text-xs text-slate-500">{order.quantity} items</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300">
              <Eye className="w-4 h-4 mr-2" />
              View All Orders
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-slate-50/50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-lg">
                <Activity className="h-5 w-5 text-white" />
              </div>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" variant="outline">
              <Package className="w-5 h-5 mr-3" />
              Add New Product
            </Button>
            <Button className="w-full justify-start bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" variant="outline">
              <Users className="w-5 h-5 mr-3" />
              Manage Categories
            </Button>
            <Button className="w-full justify-start bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" variant="outline">
              <TrendingUp className="w-5 h-5 mr-3" />
              View Analytics
            </Button>
            <Button className="w-full justify-start bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" variant="outline">
              <AlertTriangle className="w-5 h-5 mr-3" />
              Check Inventory
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-orange-800">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            Low Stock Alert
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-orange-700 mb-4 text-lg leading-relaxed">
            3 products are running low on stock. Consider restocking soon to avoid stockouts and keep your customers satisfied.
          </p>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              View Low Stock Items
            </Button>
            <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400 transition-all duration-300">
              Send Restock Reminder
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
