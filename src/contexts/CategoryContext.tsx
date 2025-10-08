import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { categories as initialCategories } from '@/data/inzovu';

interface Category {
  slug: string;
  title: string;
  image: string;
}

interface CategoryContextType {
  categories: Category[];
  addCategory: (category: Category) => Promise<void>;
  updateCategory: (category: Category) => Promise<void>;
  deleteCategory: (slug: string) => Promise<void>;
  loading: boolean;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('title');

      if (error) throw error;

      // Map Supabase data to Category type
      const mappedCategories: Category[] = (data || []).map(item => ({
        slug: item.slug,
        title: item.title,
        image: item.image_url,
      }));

      setCategories(mappedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to initial categories
      setCategories(initialCategories);
      toast({
        title: "Error",
        description: "Failed to load categories, using defaults",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (category: Category) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert({
          slug: category.slug,
          title: category.title,
          image_url: category.image,
        })
        .select()
        .single();

      if (error) throw error;

      // Add to local state
      const newCategory: Category = {
        slug: data.slug,
        title: data.title,
        image: data.image_url,
      };

      setCategories(prev => [...prev, newCategory]);
      toast({
        title: "Success",
        description: "Category added successfully",
      });
    } catch (error) {
      console.error('Error adding category:', error);
      toast({
        title: "Error",
        description: "Failed to add category",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateCategory = async (category: Category) => {
    try {
      const { error } = await supabase
        .from('categories')
        .update({
          title: category.title,
          image_url: category.image,
        })
        .eq('slug', category.slug);

      if (error) throw error;

      // Update local state
      setCategories(prev => prev.map(c => c.slug === category.slug ? category : c));
      toast({
        title: "Success",
        description: "Category updated successfully",
      });
    } catch (error) {
      console.error('Error updating category:', error);
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteCategory = async (slug: string) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('slug', slug);

      if (error) throw error;

      // Remove from local state
      setCategories(prev => prev.filter(c => c.slug !== slug));
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    loading,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
