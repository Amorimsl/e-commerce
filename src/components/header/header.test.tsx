import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../context/exportContext', () => ({
  useProducts: () => ({
    addToCard: [
      {
        id: '1',
        title: 'Produto 1',
        images: {
          mainImage: 'https://via.placeholder.com/150',
          gallery: [
            'https://via.placeholder.com/150',
            'https://via.placeholder.com/200',
          ],
        },
        price: 100,
        quantity: 2,
        normalPrice: 100,
      },
    ],
    setAddToCard: vi.fn(),
    userDetails: {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
    },
    setUserDetails: vi.fn(),
    getCartQuantity: () => 1,
  }),
}));

describe('Header Component', () => {
  it('should render the logo and navigate to home on click and navlinks', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const logoContainer = screen.getByTestId('logo-container');
    expect(logoContainer).toBeInTheDocument();

    fireEvent.click(logoContainer);

    expect(screen.getByTestId('logo-text')).toHaveTextContent('Furniro');
    expect(screen.getByTestId('desktop-home-link')).toBeInTheDocument();
    expect(screen.getByTestId('desktop-shop-link')).toBeInTheDocument();
    expect(screen.getByTestId('desktop-about-link')).toBeInTheDocument();
    expect(screen.getByTestId('desktop-contact-link')).toBeInTheDocument();
  });

  it('should toggle mobile menu on button click', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(mobileMenu).toHaveClass('hidden');

    fireEvent.click(screen.getByTestId('toggle-mobile-menu'));

    expect(mobileMenu).toHaveClass('fixed');

    fireEvent.click(screen.getByTestId('toggle-mobile-menu'));

    expect(mobileMenu).toHaveClass('hidden');
  });

  it('should display cart quantity when items are added to the cart', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const cartQuantity = screen.getByTestId('cart-quantity');
    expect(cartQuantity).toBeInTheDocument();
    expect(cartQuantity.textContent).toBe('1');
  });

  it('should show tooltip with cart items when cart icon is clicked', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.queryByTestId('tooltip-overlay')).toBeNull();

    const cartIcon = screen.getByTestId('desktop-cart-icon');
    fireEvent.click(cartIcon);

    await waitFor(() => {
      expect(screen.getByTestId('tooltip-overlay')).toBeVisible();
    });

    await waitFor(() => {
      expect(screen.getByTestId('cart-quantity')).toBeVisible();
    });
  });
});
