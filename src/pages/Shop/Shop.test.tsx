import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import Shop from './Shop';
import { useProducts } from '../../context/exportContext'; // Corrija o caminho conforme necessário
import {
  Product,
  AddToCard,
  UserDetails,
  ProductsContextType,
} from '../../context/context';

vi.mock('../../context/exportContext', () => ({
  useProducts: vi.fn(),
}));

const mockUseProducts = vi.mocked(useProducts);

describe('Shop Page', () => {
  it('should render the Shop page correctly', async () => {
    const mockProducts: Product[] = [
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
    ];

    const mockContext: ProductsContextType = {
      products: mockProducts,
      setProducts: vi.fn(),
      productsShop: mockProducts,
      setProductsShop: vi.fn(),
      visibleProducts: 16,
      setVisibleProducts: vi.fn(),
      addToCart: vi.fn(),
      addToCard: [] as AddToCard[],
      setAddToCard: vi.fn(),
      singleProduct: null,
      setSingleProduct: vi.fn(),
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
      userDetails: null as UserDetails | null,
      setUserDetails: vi.fn(),
      getCartQuantity: vi.fn(() => 0),
    };

    mockUseProducts.mockReturnValue(mockContext);

    render(
      <Router>
        <Shop />
      </Router>
    );

    expect(screen.getByText(/Filter/i)).toBeInTheDocument();
    expect(screen.getByText(/Showing 1-16 of 1 results/i)).toBeInTheDocument();
    expect(screen.getByText(/Short by/i)).toBeInTheDocument();
    expect(screen.getByText('Show')).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Filter/i));
    expect(await screen.findByText('Product 1')).toBeInTheDocument();
  });
});
