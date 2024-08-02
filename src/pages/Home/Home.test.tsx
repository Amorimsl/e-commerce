import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import { useProducts } from '../../context/exportContext';
import {
  Product,
  AddToCard,
  UserDetails,
  ProductsContextType,
} from '../../context/context';
import Shop from '../Shop/Shop';

vi.mock('../../context/exportContext', () => ({
  useProducts: vi.fn(),
}));

const mockUseProducts = vi.mocked(useProducts);

describe('Home Page', () => {
  it('should render the Home page correctly', async () => {
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
      {
        id: '2',
        title: 'Product 2',
        images: {
          mainImage: 'https://example.com/image2.jpg',
          gallery: [],
        },
        new: true,
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
        price: 150,
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
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(await screen.findByText('Product 1')).toBeInTheDocument();

    expect(screen.getByText(/New Arrival/i)).toBeInTheDocument();
    expect(screen.getByText(/Discover Our/i)).toBeInTheDocument();
    expect(screen.getByText(/New Collection/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Lorem, ipsum dolor sit amet consectetur adipisici elit./i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/BUY NOW/i)).toBeInTheDocument();

    expect(screen.getByText(/Browse The Range/i)).toBeInTheDocument();
    expect(screen.getByText(/dinning/i)).toBeInTheDocument();
    expect(screen.getByText(/living/i)).toBeInTheDocument();
    expect(screen.getByText(/bedroom/i)).toBeInTheDocument();

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();

    const buyNowButton = screen.getByText(/BUY NOW/i);

    expect(buyNowButton).toBeInTheDocument();
    fireEvent.click(buyNowButton);

    expect(screen.getByAltText('dinning')).toBeInTheDocument();
    expect(screen.getByAltText('living')).toBeInTheDocument();
    expect(screen.getByAltText('bedroom')).toBeInTheDocument();
  });

  it('should navigate to the correct category dinning', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/:tag" element={<Shop />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText('dinning'));
    await waitFor(() => {
      expect(screen.getByAltText('Product 1')).toBeInTheDocument();
    });
  });

  it('should navigate to the correct category living', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/:tag" element={<Shop />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText('living'));
    await waitFor(() => {
      expect(screen.getByAltText('Product 1')).toBeInTheDocument();
    });
  });

  it('should navigate to the correct category bedroom', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/:tag" element={<Shop />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText('bedroom'));
    await waitFor(() => {
      expect(screen.getByAltText('Product 1')).toBeInTheDocument();
    });
  });
});
