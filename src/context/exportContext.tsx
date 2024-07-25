import { useContext } from 'react';
import { ProductsContext, ProductsContextType } from './context'; // Atualize o caminho conforme necessário

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
