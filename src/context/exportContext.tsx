import { useContext } from 'react';
import { ProductsContext, ProductsContextType } from './context';

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
