import React, { createContext, useState } from 'react';

interface Product {
  id: number;
  title: string;
  images: {
    mainImage: string;
  };
  description: {
    short: string;
  };
  normalPrice: number;
}

export interface ProductsContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  visibleProducts: number;
  setVisibleProducts: React.Dispatch<React.SetStateAction<number>>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState(8);

  return (
    <ProductsContext.Provider
      value={{ products, setProducts, visibleProducts, setVisibleProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext };
