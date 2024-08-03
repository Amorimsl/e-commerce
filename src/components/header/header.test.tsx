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

    fireEvent.click(screen.getByTestId('desktop-cart-icon'));

    await waitFor(() => {
      expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
    });

    const cartItemTitle = screen.getByText('Produto 1');
    expect(cartItemTitle).toBeInTheDocument();

    const cartItemQuantity = screen.getByTestId('cart-quantity');
    expect(cartItemQuantity).toBeInTheDocument();
    expect(cartItemQuantity).toHaveTextContent('2 X');

    const cartItemPrice = screen.getByText('RS 100');
    expect(cartItemPrice).toBeInTheDocument();
  });

  it('should close the tooltip when the close button is clicked', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId('desktop-cart-icon'));

    await waitFor(() => {
      expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByAltText('Close'));

    await waitFor(() => {
      expect(screen.queryByTestId('tooltip-content')).not.toBeInTheDocument();
    });
  });

  it('should log out the user when logout button is clicked', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const logoutButton = screen.getByTestId('desktop-logout-button');
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(screen.queryByTestId('desktop-logout-button')).toBeInTheDocument();
    });
  });

  it('should navigate to Cart page when Cart button is clicked in tooltip', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId('desktop-cart-icon'));

    await waitFor(() => {
      expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Cart'));

    expect(window.location.pathname).toBe('/Cart');
  });

  it('should navigate to Checkout page when Checkout button is clicked in tooltip', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId('desktop-cart-icon'));

    await waitFor(() => {
      expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Checkout'));

    expect(window.location.pathname).toBe('/Checkout');
  });
});
