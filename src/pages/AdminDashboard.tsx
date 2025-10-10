import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";
import DashboardPage from "@/components/admin/DashboardPage";
import ProductsPage from "@/components/admin/ProductsPage";
import CategoriesPage from "@/components/admin/CategoriesPage";
import PagesPage from "@/components/admin/PagesPage";
import OrdersScreen from "@/components/admin/OrdersScreen";
import CustomersPage from "@/components/admin/CustomersPage";
import ReportsPage from "@/components/admin/ReportsPage";
import SettingsPage from "@/components/admin/SettingsPage";
import { useProducts } from "@/contexts/ProductContext";

export default function AdminDashboard() {
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct, loading: productsLoading } = useProducts();

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

      // For now, only check dev admin email
      const isDevAdmin = (user.email || "").toLowerCase() === "admin@gmail.com";
      if (!isDevAdmin) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);
      fetchOrders();
    } catch (error) {
      console.error("Error checking admin status:", error);
      navigate("/");
    }
  };

  const fetchOrders = async () => {
    try {
      const { data: ordersData, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(ordersData || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderPage = () => {
    switch (selectedPage) {
      case "dashboard":
        return <DashboardPage orders={orders} />;
      case "products":
        return <ProductsPage products={products} addProduct={addProduct} updateProduct={updateProduct} deleteProduct={deleteProduct} loading={productsLoading} />;
      case "categories":
        return <CategoriesPage />;
      case "pages":
        return <PagesPage products={products} updateProduct={updateProduct} />;
      case "orders":
        return <OrdersScreen />;
      case "customers":
        return <CustomersPage />;
      case "reports":
        return <ReportsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <DashboardPage orders={orders} />;
    }
  };

  if (loading || isAdmin === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>You don't have admin privileges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar selected={selectedPage} onSelect={setSelectedPage} />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
