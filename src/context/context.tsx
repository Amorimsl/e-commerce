import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

export interface Product {
  id: number;
  title: string;
  category: string;
  sku: string;
  tags: string[];
  salePrice: number;
  discountPercentage: number;
  colors: string[];
  sizes: string[];
  rating: number;

  images: {
    mainImage: string;
  };
  description: {
    short: string;
  };
  normalPrice: number;
  new?: boolean;
}

interface AddToCard extends Product {
  category: string;
  images: {
    mainImage: string;
  };
  normalPrice: number;
  quantity: number;
}

export interface ProductsContextType {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  productsShop: Product[];
  setProductsShop: Dispatch<SetStateAction<Product[]>>;
  visibleProducts: number;
  setVisibleProducts: Dispatch<SetStateAction<number>>;
  addToCart: (product: AddToCard) => void;
  addToCard: AddToCard[];
  setAddToCard: Dispatch<SetStateAction<AddToCard[]>>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsShop, setProductsShop] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<number>(8);
  const [addToCard, setAddToCard] = useState<AddToCard[]>([]);

  const addToCart = (product: AddToCard) => {
    setAddToCard((prevAddToCard) => {
      const existingProductIndex = prevAddToCard.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...prevAddToCard];
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          quantity: (updatedProducts[existingProductIndex].quantity || 1) + 1,
        };
        return updatedProducts;
      } else {
        return [...prevAddToCard, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        visibleProducts,
        setVisibleProducts,
        addToCart,
        addToCard,
        setAddToCard,
        productsShop,
        setProductsShop,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext };
