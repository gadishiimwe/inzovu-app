import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Package, Heart, CreditCard, Settings, Bell, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";

export default function Account() {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    memberSince: "",
    orders: 0,
    saved: 0,
  });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ full_name: "", phone: "", address: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (!authUser) return;

        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, phone, address, created_at, user_id")
          .eq("user_id", authUser.id)
          .maybeSingle();

        setUser({
          id: authUser.id,
          name: profile?.full_name || authUser.email || "",
          email: authUser.email || "",
          phone: profile?.phone || "",
          address: profile?.address || "",
          memberSince: profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "",
          orders: 0,
          saved: 0,
        });
        setForm({ full_name: profile?.full_name || "", phone: profile?.phone || "", address: profile?.address || "" });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const saveProfile = async () => {
    if (!user.id) return;
    const { error } = await supabase.from("profiles").upsert({
      user_id: user.id,
      full_name: form.full_name,
      phone: form.phone,
      address: form.address,
    });
    if (!error) {
      setUser({
        ...user,
        name: form.full_name,
        phone: form.phone,
        address: form.address,
      });
      setEditing(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2">My Account</h1>
        <p className="text-muted-foreground">Manage your profile, orders, and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <Avatar className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 ring-4 ring-primary/10">
                  <AvatarFallback className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-primary to-accent text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl sm:text-2xl font-bold mb-1">{user.name}</h2>
                <p className="text-sm text-muted-foreground mb-3">{user.email}</p>
                <Badge variant="secondary" className="mb-4">
                  Member since {user.memberSince}
                </Badge>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{user.orders}</div>
                    <div className="text-xs text-muted-foreground">Orders</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-accent">{user.saved}</div>
                    <div className="text-xs text-muted-foreground">Saved Items</div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{user.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{user.address}</span>
                </div>
              </div>

              <Separator className="my-6" />

              <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setEditing((v) => !v)}>
                <Settings className="h-4 w-4" />
                {editing ? "Cancel" : "Edit Profile"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {editing && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Edit Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Full name</label>
                    <Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Phone</label>
                    <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm text-muted-foreground">Address</label>
                    <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={saveProfile}>Save Changes</Button>
                  <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}
          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <Link to="/cart">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Package className="h-8 w-8 text-primary" />
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">My Orders</CardTitle>
                  <p className="text-sm text-muted-foreground">Track and manage your orders</p>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <Link to="/liked">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Heart className="h-8 w-8 text-accent" />
                    <Badge variant="secondary">{user.saved} items</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg mb-2 group-hover:text-accent transition-colors">Wishlist</CardTitle>
                  <p className="text-sm text-muted-foreground">View your saved products</p>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Account Settings */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors text-left group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium group-hover:text-primary transition-colors">Personal Information</div>
                    <div className="text-sm text-muted-foreground">Update your name and contact details</div>
                  </div>
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors text-left group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium group-hover:text-primary transition-colors">Delivery Addresses</div>
                    <div className="text-sm text-muted-foreground">Manage your saved addresses</div>
                  </div>
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors text-left group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium group-hover:text-primary transition-colors">Payment Methods</div>
                    <div className="text-sm text-muted-foreground">Add or edit payment options</div>
                  </div>
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors text-left group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium group-hover:text-primary transition-colors">Notifications</div>
                    <div className="text-sm text-muted-foreground">Manage email and push notifications</div>
                  </div>
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors text-left group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium group-hover:text-primary transition-colors">Security & Privacy</div>
                    <div className="text-sm text-muted-foreground">Update password and privacy settings</div>
                  </div>
                </div>
              </button>
            </CardContent>
          </Card>

          {/* Logout */}
          <Card className="shadow-lg border-red-200 dark:border-red-900">
            <CardContent className="pt-6">
              <Button variant="destructive" className="w-full justify-center gap-2" onClick={signOut}>
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
