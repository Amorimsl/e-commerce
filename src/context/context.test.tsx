import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductsProvider, ProductsContext } from './context';
import { useContext } from 'react';

describe('ProductsContext', () => {
  const TestComponent = () => {
    const context = useContext(ProductsContext);
    if (!context) return null;
    return (
      <div>
        <button
          onClick={() =>
            context.addToCart({
              id: '1',
              title: 'Test',
              category: 'Test',
              images: { mainImage: '', gallery: [] },
              normalPrice: 100,
              sku: '123',
              tags: [],
              salePrice: 100,
              colors: [],
              sizes: [],
              rating: 5,
              description: { short: 'Test' },
              quantity: 1,
              price: 100,
            })
          }
        >
          Add to Cart
        </button>
        <div data-testid="cart-quantity">{context.getCartQuantity()}</div>
      </div>
    );
  };

  it('should initialize with an empty cart', () => {
    render(
      <ProductsProvider>
        <TestComponent />
      </ProductsProvider>
    );
    expect(screen.getByTestId('cart-quantity')).toHaveTextContent('0');
  });

  it('should add items to the cart and update the quantity', () => {
    render(
      <ProductsProvider>
        <TestComponent />
      </ProductsProvider>
    );

    const addToCartButton = screen.getByText('Add to Cart');
    act(() => {
      addToCartButton.click();
    });

    expect(screen.getByTestId('cart-quantity')).toHaveTextContent('1');
  });
});
