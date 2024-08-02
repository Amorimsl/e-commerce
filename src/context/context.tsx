import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

type Color = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  title: string;
  category: string;
  images: {
    mainImage: string;
    gallery: string[];
  };
  normalPrice: number;
  sku: string;
  tags: string[] | string;
  salePrice: number;
  discountPercentage?: number;
  colors: Color[];
  sizes: string[];
  rating: number;
  description: {
    short: string;
  };
  new?: boolean;
  quantity: number;
  price: number;
};

export interface AddToCard extends Product {
  quantity: number;
}

export interface UserDetails {
  email: string;
  firstName: string;
  lastName: string;
}

export interface ProductsContextType {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  productsShop: Product[];
  setProductsShop: (products: Product[]) => void;
  visibleProducts: number;
  setVisibleProducts: Dispatch<SetStateAction<number>>;
  addToCart: (product: AddToCard) => void;
  addToCard: AddToCard[];
  setAddToCard: Dispatch<SetStateAction<AddToCard[]>>;
  singleProduct: Product | null;
  setSingleProduct: Dispatch<SetStateAction<Product | null>>;
  updateQuantity: (id: string, amount: number) => void;
  removeItem: (id: string) => void;
  userDetails: UserDetails | null;
  setUserDetails: Dispatch<SetStateAction<UserDetails | null>>;
  getCartQuantity: () => number;
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
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const getCartQuantity = () => {
    return addToCard.reduce((total, item) => total + item.quantity, 0);
  };

  const addToCart = (product: AddToCard) => {
    setAddToCard((prevAddToCart) => {
      const existingProductIndex = prevAddToCart.findIndex(
        (item) => item.id === product.id
      );

      let updatedCart;
      if (existingProductIndex !== -1) {
        const updatedProducts = [...prevAddToCart];
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          quantity:
            (updatedProducts[existingProductIndex].quantity || 1) +
            (product.quantity || 1),
        };
        updatedCart = updatedProducts;
      } else {
        updatedCart = [...prevAddToCart, { ...product }];
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeItem = (id: string) => {
    setAddToCard((prevAddToCart) =>
      prevAddToCart.filter((item) => item.id !== id)
    );
  };

  const updateQuantity = (id: string, amount: number) => {
    setAddToCard((prevAddToCart) => {
      const updatedCart = prevAddToCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + amount, 0) }
          : item
      );
      const updatedItem = updatedCart.find((item) => item.id === id);

      if (updatedItem && updatedItem.quantity === 0) {
        const confirmRemove = window.confirm(
          'A quantidade de item é 0 .Voce tem certeza que deseja excluir??'
        );
        if (confirmRemove) {
          return updatedCart.filter((item) => item.id !== id);
        }
      }

      return updatedCart;
    });
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setAddToCard(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    return () => {
      localStorage.removeItem('cart');
    };
  }, []);

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
        singleProduct,
        setSingleProduct,
        updateQuantity,
        removeItem,
        userDetails,
        setUserDetails,
        getCartQuantity,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext };
