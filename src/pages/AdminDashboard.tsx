import React, { useState, useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";
import OrdersScreen from "@/components/admin/OrdersScreen";
import DashboardPage from "@/components/admin/DashboardPage";
import CategoriesPage from "@/components/admin/CategoriesPage";
import CustomersPage from "@/components/admin/CustomersPage";
import ReportsPage from "@/components/admin/ReportsPage";
import SettingsPage from "@/components/admin/SettingsPage";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/contexts/ProductContext";

type Order = {
  id: string;
  name: string;
  stockValue: string;
  quantity: string;
  status: "Delivered" | "Cancelled" | "Pending" | "Processing";
};

export default function AdminDashboard() {
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  // Sample orders data - will be replaced with real Supabase data when orders table is available
  const [orders, setOrders] = useState<Order[]>([
    { id: "ORD-001", name: "John Doe", stockValue: "RWF 25,000", quantity: "3", status: "Delivered" },
    { id: "ORD-002", name: "Jane Smith", stockValue: "RWF 15,000", quantity: "2", status: "Processing" },
    { id: "ORD-003", name: "Bob Johnson", stockValue: "RWF 8,500", quantity: "1", status: "Delivered" },
    { id: "ORD-004", name: "Alice Brown", stockValue: "RWF 32,000", quantity: "4", status: "Pending" },
    { id: "ORD-005", name: "Charlie Wilson", stockValue: "RWF 12,000", quantity: "2", status: "Cancelled" },
  ]);

  // Real users data from Supabase
  const [users, setUsers] = useState<any[]>([]);

  // Fetch real users data from Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data: usersData, error: usersError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (usersError) throw usersError;
        setUsers(usersData || []);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({ title: "Error", description: "Failed to load users data", variant: "destructive" });
      }
    };

    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin, toast]);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/");
          return;
        }
        const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
        const isDevAdmin = (user.email || "").toLowerCase() === "admin@gmail.com";
        if (!role && !isDevAdmin) {
          toast({ title: "Access Denied", description: "You don't have admin privileges. Please use the 'Quick Login as Admin' button on the auth page.", variant: "destructive" });
          navigate("/auth");
          return;
        }
        setIsAdmin(true);
      } catch {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, [navigate, toast]);

  if (loading || isAdmin === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-xl text-slate-600 font-medium">Loading Admin Dashboard...</p>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // or redirect handled above
  }

  const renderPage = () => {
    switch (selectedPage) {
      case "dashboard":
        return <DashboardPage orders={orders} />;
      case "categories":
        return <CategoriesPage />;
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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <Sidebar selected={selectedPage} onSelect={setSelectedPage} />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
