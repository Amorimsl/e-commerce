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
        <button onClick={() => context.removeItem('1')}>
          Remove from Cart
        </button>
        <button onClick={() => context.updateQuantity('1', 1)}>
          Increase Quantity
        </button>
        <button onClick={() => context.updateQuantity('1', -1)}>
          Decrease Quantity
        </button>
        <div data-testid="cart-quantity">{context.getCartQuantity()}</div>
        <div data-testid="user-details">
          {context.userDetails
            ? `${context.userDetails.firstName} ${context.userDetails.lastName}`
            : 'No user details'}
        </div>
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

  it('should remove items from the cart', () => {
    render(
      <ProductsProvider>
        <TestComponent />
      </ProductsProvider>
    );

    const addToCartButton = screen.getByText('Add to Cart');
    const removeFromCartButton = screen.getByText('Remove from Cart');

    act(() => {
      addToCartButton.click();
      removeFromCartButton.click();
    });

    expect(screen.getByTestId('cart-quantity')).toHaveTextContent('0');
  });

  it('should update item quantity in the cart', () => {
    render(
      <ProductsProvider>
        <TestComponent />
      </ProductsProvider>
    );

    const addToCartButton = screen.getByText('Add to Cart');
    const increaseQuantityButton = screen.getByText('Increase Quantity');
    const decreaseQuantityButton = screen.getByText('Decrease Quantity');

    act(() => {
      addToCartButton.click();
      increaseQuantityButton.click();
    });

    expect(screen.getByTestId('cart-quantity')).toHaveTextContent('2');

    act(() => {
      decreaseQuantityButton.click();
    });

    expect(screen.getByTestId('cart-quantity')).toHaveTextContent('1');

    act(() => {
      decreaseQuantityButton.click();
    });

    expect(screen.getByTestId('cart-quantity')).toHaveTextContent('0');
  });

  it('should load cart data from local storage on initialization', () => {
    localStorage.setItem(
      'cart',
      JSON.stringify([
        {
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
        },
      ])
    );

    render(
      <ProductsProvider>
        <TestComponent />
      </ProductsProvider>
    );

    expect(screen.getByTestId('cart-quantity')).toHaveTextContent('1');
  });

  it('should clear cart data from local storage on unmount', () => {
    localStorage.setItem(
      'cart',
      JSON.stringify([
        {
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
        },
      ])
    );

    const { unmount } = render(
      <ProductsProvider>
        <TestComponent />
      </ProductsProvider>
    );

    unmount();

    expect(localStorage.getItem('cart')).toBeNull();
  });
});
