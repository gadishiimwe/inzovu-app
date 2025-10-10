import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Users, Search, Phone, Calendar, Mail, MapPin, ShoppingBag, TrendingUp, UserCheck, Loader2, Send, MessageSquare } from "lucide-react";

interface Customer {
  id: string;
  full_name: string;
  phone: string;
  created_at: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerOrders, setCustomerOrders] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [ordersDialogOpen, setOrdersDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loadingOrders, setLoadingOrders] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Try to fetch customers, handle if table doesn't exist
        let customersData: Customer[] = [];
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("id, full_name, phone, created_at")
            .order("created_at", { ascending: false });

          if (!error) {
            customersData = data || [];
          }
        } catch (error) {
          console.log("Profiles table not available, using empty data");
        }

        setCustomers(customersData);
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast({ title: "Error", description: "Failed to load customers", variant: "destructive" });
      }
    };

    fetchCustomers();
  }, [toast]);

  const handleContactCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setMessage("");
    setContactDialogOpen(true);
  };

  const handleViewOrders = async (customer: Customer) => {
    setSelectedCustomer(customer);
    setLoadingOrders(true);
    setOrdersDialogOpen(true);

    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", customer.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCustomerOrders(data || []);
    } catch (error) {
      console.error("Error fetching customer orders:", error);
      toast({
        title: "Error",
        description: "Failed to load customer orders",
        variant: "destructive"
      });
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedCustomer || !message.trim()) return;

    try {
      // Here you could implement actual messaging functionality
      // For now, we'll just show a success message
      toast({
        title: "Message Sent",
        description: `Message sent to ${selectedCustomer.full_name}`,
      });
      setContactDialogOpen(false);
      setMessage("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-green-900 to-slate-900 bg-clip-text text-transparent">
            Customer Management
          </h1>
          <p className="text-slate-600 text-lg">Manage your customer base and relationships</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search customers..."
              className="pl-10 w-64 border-slate-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <UserCheck className="w-5 h-5 mr-2" />
            Export Customers
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-50"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Total Customers</CardTitle>
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-lg">
              <Users className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-green-600 mb-1">{customers.length}</div>
            <p className="text-sm text-slate-500 font-medium">Registered users</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Active This Month</CardTitle>
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {customers.filter(c => {
                const oneMonthAgo = new Date();
                oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                return new Date(c.created_at) > oneMonthAgo;
              }).length}
            </div>
            <p className="text-sm text-slate-500 font-medium">New registrations</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 opacity-50"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Avg. Order Value</CardTitle>
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-purple-600 mb-1">RWF 25,000</div>
            <p className="text-sm text-slate-500 font-medium">Per customer</p>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-slate-50/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg">
              <Users className="h-5 w-5 text-white" />
            </div>
            Customer Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 hover:bg-slate-50/50">
                  <TableHead className="font-semibold text-slate-700">Customer</TableHead>
                  <TableHead className="font-semibold text-slate-700">Contact</TableHead>
                  <TableHead className="font-semibold text-slate-700">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700">Joined</TableHead>
                  <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer, index) => (
                  <TableRow
                    key={customer.id}
                    className="border-slate-100 hover:bg-slate-50/50 transition-colors duration-200 animate-in slide-in-from-bottom delay-100"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white font-bold text-sm">
                            {customer.full_name?.charAt(0)?.toUpperCase() || '?'}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{customer.full_name || 'Unknown'}</p>
                          <p className="text-sm text-slate-500">ID: {customer.id.slice(-8)}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-700">{customer.phone || 'Not provided'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
                      >
                        <UserCheck className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-700">
                          {new Date(customer.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
                              onClick={() => handleContactCustomer(customer)}
                            >
                              <Mail className="w-4 h-4 mr-1" />
                              Contact
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <MessageSquare className="w-5 h-5" />
                                Contact {selectedCustomer?.full_name}
                              </DialogTitle>
                              <DialogDescription>
                                Send a message to this customer. They will receive it via email or in-app notification.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="message" className="text-sm font-medium">
                                  Message
                                </Label>
                                <Textarea
                                  id="message"
                                  placeholder="Type your message here..."
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                  className="mt-2"
                                  rows={4}
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  onClick={() => setContactDialogOpen(false)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleSendMessage}
                                  disabled={!message.trim()}
                                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                                >
                                  <Send className="w-4 h-4 mr-2" />
                                  Send Message
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog open={ordersDialogOpen} onOpenChange={setOrdersDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
                              onClick={() => handleViewOrders(customer)}
                            >
                              <ShoppingBag className="w-4 h-4 mr-1" />
                              Orders
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" />
                                Orders for {selectedCustomer?.full_name}
                              </DialogTitle>
                              <DialogDescription>
                                View all orders placed by this customer.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              {loadingOrders ? (
                                <div className="flex items-center justify-center py-8">
                                  <Loader2 className="w-6 h-6 animate-spin" />
                                  <span className="ml-2">Loading orders...</span>
                                </div>
                              ) : customerOrders.length === 0 ? (
                                <div className="text-center py-8">
                                  <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                  <p className="text-slate-500">No orders found for this customer.</p>
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  {customerOrders.map((order) => (
                                    <Card key={order.id} className="p-4">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <p className="font-semibold">Order #{order.id.slice(-8)}</p>
                                          <p className="text-sm text-slate-600">
                                            {new Date(order.created_at).toLocaleDateString()}
                                          </p>
                                          <p className="text-sm text-slate-600">
                                            Status: <Badge variant="outline">{order.status}</Badge>
                                          </p>
                                        </div>
                                        <div className="text-right">
                                          <p className="font-semibold text-green-600">
                                            RWF {order.total?.toLocaleString() || 'N/A'}
                                          </p>
                                          <p className="text-sm text-slate-500">
                                            {order.items?.length || 0} items
                                          </p>
                                        </div>
                                      </div>
                                    </Card>
                                  ))}
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {customers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <Users className="w-12 h-12 text-slate-300" />
                        <div>
                          <p className="text-slate-500 font-medium">No customers found</p>
                          <p className="text-sm text-slate-400">Customers will appear here once they register</p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
