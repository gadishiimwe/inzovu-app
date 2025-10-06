import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Customer {
  id: string;
  full_name: string;
  phone: string;
  created_at: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, full_name, phone, created_at")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setCustomers(data || []);
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast({ title: "Error", description: "Failed to load customers", variant: "destructive" });
      }
    };

    fetchCustomers();
  }, [toast]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.full_name}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{new Date(customer.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              {customers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No customers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
