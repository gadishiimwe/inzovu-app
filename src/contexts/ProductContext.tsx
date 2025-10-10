import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/data/inzovu';
import { products as staticProducts } from '@/data/inzovu';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      // Fetch from database
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Products fetch result:', { data, error });

      if (error) {
        console.error('Database error fetching products:', error);
        toast({
          title: "Error",
          description: `Failed to load products: ${error.message}`,
          variant: "destructive",
        });
        // Fall back to static data
        setProducts(staticProducts);
      } else if (data && data.length > 0) {
        // Map Supabase data to Product type
        const mappedProducts = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          unit: item.unit || '',
          categorySlug: item.category_slug,
          image: item.image_url,
          description: item.description || '',
          available: item.available !== false,
          is_new: item.is_new || false,
          is_featured: item.is_featured || false,
          is_deal: item.is_deal || false,
        }));
        console.log('Using database products:', mappedProducts);
        setProducts(mappedProducts);
      } else {
        console.log('No products in database, using static products data');
        setProducts(staticProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products, using defaults",
        variant: "destructive",
      });
      setProducts(staticProducts);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Product) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: product.name,
          price: product.price,
          unit: product.unit || null,
          category_slug: product.categorySlug,
          image_url: product.image,
          description: product.description || null,
          available: product.available !== false,
          is_new: product.is_new || false,
          is_featured: product.is_featured || false,
          is_deal: product.is_deal || false,
        })
        .select()
        .single();

      console.log('Add product result:', { data, error });

      if (!error && data) {
        // Refetch to get updated list including the new product
        await fetchProducts();
        toast({
          title: "Success",
          description: "Product added successfully",
        });
      } else {
        console.error('Database error adding product:', error);
        toast({
          title: "Error",
          description: `Failed to add product to database: ${error?.message || 'Unknown error'}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: product.name,
          price: product.price,
          unit: product.unit || null,
          category_slug: product.categorySlug,
          image_url: product.image,
          description: product.description || null,
          available: product.available !== false,
          is_new: product.is_new || false,
          is_featured: product.is_featured || false,
          is_deal: product.is_deal || false,
        })
        .eq('id', product.id);

      console.log('Update product result:', { error });

      if (!error) {
        // Refetch to get updated list
        await fetchProducts();
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
      } else {
        console.error('Database error updating product:', error);
        toast({
          title: "Error",
          description: `Failed to update product: ${error.message}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      console.log('Delete product result:', { error });

      if (!error) {
        // Refetch to get updated list
        await fetchProducts();
        toast({
          title: "Success",
          description: "Product deleted successfully",
        });
      } else {
        console.error('Database error deleting product:', error);
        toast({
          title: "Error",
          description: `Failed to delete product: ${error.message}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    loading,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
