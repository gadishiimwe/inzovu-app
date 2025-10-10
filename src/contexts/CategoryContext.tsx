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

      // Fetch from database
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('title');

      console.log('Categories fetch result:', { data, error });

      if (error) {
        console.error('Database error fetching categories:', error);
        toast({
          title: "Error",
          description: `Failed to load categories: ${error.message}`,
          variant: "destructive",
        });
        // Fall back to initial data
        setCategories(initialCategories);
      } else if (data && data.length > 0) {
        // Map Supabase data to Category type
        const mappedCategories = data.map(item => ({
          slug: item.slug,
          title: item.title,
          image: item.image_url,
        }));
        console.log('Using database categories:', mappedCategories);
        setCategories(mappedCategories);
      } else {
        console.log('No categories in database, using initial categories data');
        setCategories(initialCategories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Error",
        description: "Failed to load categories, using defaults",
        variant: "destructive",
      });
      setCategories(initialCategories);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (category: Category) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      console.log('Current user:', user);
      console.log('User email:', user.user?.email);

      if (!user.user) {
        toast({
          title: "Error",
          description: "Please log in as admin to add categories",
          variant: "destructive",
        });
        return;
      }

      // Check if user has admin role or is admin email
      const isAdminEmail = user.user.email === 'admin@gmail.com';

      if (!isAdminEmail) {
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.user.id)
          .single();

        console.log('User role check:', { roleData, roleError });

        if (roleError || !roleData || roleData.role !== 'admin') {
          toast({
            title: "Error",
            description: "Admin access required to add categories",
            variant: "destructive",
          });
          return;
        }
      }

      const { data, error } = await supabase
        .from('categories')
        .insert({
          slug: category.slug,
          title: category.title,
          image_url: category.image,
        })
        .select()
        .single();

      console.log('Add category result:', { data, error });

      if (!error && data) {
        // Refetch to get updated list including the new category
        await fetchCategories();
        toast({
          title: "Success",
          description: "Category added successfully",
        });
      } else {
        console.error('Database error adding category:', error);
        toast({
          title: "Error",
          description: `Failed to add category to database: ${error?.message || 'Unknown error'}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error adding category:', error);
      toast({
        title: "Error",
        description: "Failed to add category",
        variant: "destructive",
      });
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

      console.log('Update category result:', { error });

      if (!error) {
        // Refetch to get updated list
        await fetchCategories();
        toast({
          title: "Success",
          description: "Category updated successfully",
        });
      } else {
        console.error('Database error updating category:', error);
        toast({
          title: "Error",
          description: `Failed to update category: ${error.message}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive",
      });
    }
  };

  const deleteCategory = async (slug: string) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('slug', slug);

      console.log('Delete category result:', { error });

      if (!error) {
        // Refetch to get updated list
        await fetchCategories();
        toast({
          title: "Success",
          description: "Category deleted successfully",
        });
      } else {
        console.error('Database error deleting category:', error);
        toast({
          title: "Error",
          description: `Failed to delete category: ${error.message}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
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
