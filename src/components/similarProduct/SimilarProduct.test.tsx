import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import SimilarProduct from './SimilarProduct';
import { Product, ProductsContextType } from '../../context/context';
import { MemoryRouter } from 'react-router-dom';
import * as ContextModule from '../../context/exportContext';

vi.mock('../../context/exportContext', () => ({
  useProducts: vi.fn(),
}));

describe('SimilarProduct Component', () => {
  const mockRelatedProducts: Product[] = [
    {
      id: '1',
      title: 'Product 1',
      images: {
        mainImage: 'https://example.com/image1.jpg',
        gallery: [],
      },
      new: true,
      normalPrice: 100,
      salePrice: 80,
      discountPercentage: 0.2,
      category: 'Category 1',
      sku: 'SKU1',
      tags: ['Tag1'],
      colors: [{ name: 'Red', hex: '#FF0000' }],
      sizes: ['M'],
      rating: 4.5,
      description: { short: 'Short description for Product 1' },
      quantity: 1,
      price: 100,
    },
    {
      id: '2',
      title: 'Product 2',
      images: {
        mainImage: 'https://example.com/image2.jpg',
        gallery: [],
      },
      new: false,
      normalPrice: 150,
      salePrice: 120,
      discountPercentage: 0.2,
      category: 'Category 2',
      sku: 'SKU2',
      tags: ['Tag2'],
      colors: [{ name: 'Blue', hex: '#0000FF' }],
      sizes: ['L'],
      rating: 4.0,
      description: { short: 'Short description for Product 2' },
      quantity: 1,
      price: 120,
    },
  ];

  it('should render related products correctly', () => {
    (ContextModule.useProducts as Mock).mockReturnValue({
      products: [],
      setProducts: vi.fn(),
      productsShop: [],
      setProductsShop: vi.fn(),
      visibleProducts: 8,
      setVisibleProducts: vi.fn(),
      addToCart: vi.fn(),
      addToCard: [],
      setAddToCard: vi.fn(),
      singleProduct: null,
      setSingleProduct: vi.fn(),
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
      userDetails: null,
      setUserDetails: vi.fn(),
      getCartQuantity: vi.fn(),
    } as ProductsContextType);

    render(
      <MemoryRouter>
        <SimilarProduct relatedProducts={mockRelatedProducts} quantity={1} />
      </MemoryRouter>
    );

    expect(screen.getByText('Related Products')).toBeInTheDocument();
    mockRelatedProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByAltText(product.title)).toBeInTheDocument();
    });
  });

  it('should handle add to cart button click', () => {
    const addToCartMock = vi.fn();

    (ContextModule.useProducts as Mock).mockReturnValue({
      products: [],
      setProducts: vi.fn(),
      productsShop: [],
      setProductsShop: vi.fn(),
      visibleProducts: 8,
      setVisibleProducts: vi.fn(),
      addToCart: addToCartMock,
      addToCard: [],
      setAddToCard: vi.fn(),
      singleProduct: null,
      setSingleProduct: vi.fn(),
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
      userDetails: null,
      setUserDetails: vi.fn(),
      getCartQuantity: vi.fn(),
    } as ProductsContextType);

    render(
      <MemoryRouter>
        <SimilarProduct relatedProducts={mockRelatedProducts} quantity={1} />
      </MemoryRouter>
    );

    const addToCartButton = screen.getAllByText('Add to Cart')[0];
    fireEvent.click(addToCartButton);

    expect(addToCartMock).toHaveBeenCalledWith({
      id: '1',
      title: 'Product 1',
      category: 'Category 1',
      images: {
        mainImage: 'https://example.com/image1.jpg',
        gallery: [],
      },
      normalPrice: 100,
      sku: 'SKU1',
      tags: ['Tag1'],
      salePrice: 80,
      discountPercentage: 0.2,
      colors: [{ name: 'Red', hex: '#FF0000' }],
      sizes: ['M'],
      rating: 4.5,
      description: { short: 'Short description for Product 1' },
      quantity: 1,
      price: 100,
    });
  });

  it('should handle product card click', () => {
    const setSingleProductMock = vi.fn();

    (ContextModule.useProducts as Mock).mockReturnValue({
      products: [],
      setProducts: vi.fn(),
      productsShop: [],
      setProductsShop: vi.fn(),
      visibleProducts: 8,
      setVisibleProducts: vi.fn(),
      addToCart: vi.fn(),
      addToCard: [],
      setAddToCard: vi.fn(),
      singleProduct: null,
      setSingleProduct: setSingleProductMock,
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
      userDetails: null,
      setUserDetails: vi.fn(),
      getCartQuantity: vi.fn(),
    } as ProductsContextType);

    render(
      <MemoryRouter>
        <SimilarProduct relatedProducts={mockRelatedProducts} quantity={1} />
      </MemoryRouter>
    );

    const productCard = screen.getByAltText('Product 1');
    fireEvent.click(productCard);

    expect(setSingleProductMock).toHaveBeenCalledWith(mockRelatedProducts[0]);
  });
});
