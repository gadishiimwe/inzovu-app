import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { products as initialProducts } from '@/data/inzovu';
import type { Product } from '@/data/inzovu';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
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
  const [products, setProducts] = useState<Product[]>(() => {
    // Load from localStorage if available, otherwise use initial data
    const saved = localStorage.getItem('admin_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('admin_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
