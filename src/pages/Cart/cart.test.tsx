// Cart.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Cart from './Cart';
import { ProductsProvider } from '../../context/context';

import { MemoryRouter } from 'react-router-dom';

vi.mock('../../context/exportContext.tsx', () => ({
  useProducts: () => ({
    addToCard: [
      {
        id: '1',
        title: 'Test Product',
        category: 'Test Category',
        images: { mainImage: 'https://example.com/image.jpg', gallery: [] },
        normalPrice: 100,
        sku: '123',
        tags: [],
        salePrice: 100,
        colors: [],
        sizes: [],
        rating: 5,
        description: { short: 'Test Description' },
        quantity: 2,
        price: 100,
      },
    ],
    updateQuantity: vi.fn(),
    removeItem: vi.fn(),
  }),
}));

describe('Cart', () => {
  it('should render cart items and their details', () => {
    render(
      <MemoryRouter>
        <ProductsProvider>
          <Cart />
        </ProductsProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Rp.100')).toBeInTheDocument();
    expect(screen.getByText('Rp.200')).toBeInTheDocument();
  });

  it('should handle update quantity and remove item actions', () => {
    render(
      <MemoryRouter>
        <ProductsProvider>
          <Cart />
        </ProductsProvider>
      </MemoryRouter>
    );

    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('-');
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);

    const removeItemButton = screen.getByAltText('Remove item');
    fireEvent.click(removeItemButton);

    // Assertions
    expect(screen.getByText('Rp.200')).toBeInTheDocument();
  });

  it('should navigate to Checkout or Login based on user state', () => {
    render(
      <MemoryRouter>
        <ProductsProvider>
          <Cart />
        </ProductsProvider>
      </MemoryRouter>
    );

    const checkoutButton = screen.getByText('Login');
    fireEvent.click(checkoutButton);
  });
});
