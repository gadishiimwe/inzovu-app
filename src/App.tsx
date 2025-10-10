import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import Liked from "./pages/Liked";

import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import NewIn from "./pages/NewIn";
import GoodStuff from "./pages/GoodStuff";
import Deals from "./pages/Deals";
import Account from "./pages/Account";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/common/ScrollToTop";
import { ProductProvider } from "./contexts/ProductContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { CategoryProvider } from "./contexts/CategoryContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProductProvider>
      <CategoryProvider>
        <SettingsProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="shop" element={<Shop />} />
                <Route path="category/:slug" element={<Category />} />
                <Route path="product/:id" element={<Product />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="liked" element={<Liked />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="deals" element={<Deals />} />
                <Route path="new-in" element={<NewIn />} />
                <Route path="good-stuff" element={<GoodStuff />} />
                <Route path="account" element={<Account />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
      </TooltipProvider>
      </SettingsProvider>
      </CategoryProvider>
    </ProductProvider>
  </QueryClientProvider>
);

export default App;
