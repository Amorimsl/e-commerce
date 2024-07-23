import { render, screen, fireEvent } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header Component', () => {
  it('should render the header with expected content', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Logo SVG')).toBeInTheDocument();
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Shop').length).toBeGreaterThan(0);
    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);

    expect(screen.getAllByAltText('Login').length).toBeGreaterThan(0);
    expect(screen.getAllByAltText('Shop').length).toBeGreaterThan(0);
  });

  it('should render the desktop navigation correctly', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const desktopNav = screen.getByRole('navigation', {
      name: 'Desktop Navigation',
    });
    expect(desktopNav).toBeInTheDocument();

    const homeLink = desktopNav.querySelector('a[href="/"]');
    const shopLink = desktopNav.querySelector('a[href="/Shop"]');
    const aboutLink = desktopNav.querySelector('a[href="/About"]');
    const contactLink = desktopNav.querySelector('a[href="/Contact"]');

    expect(homeLink).toBeInTheDocument();
    expect(shopLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
  });

  it('should render the mobile navigation correctly when open', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const menuButton = screen.getByLabelText(/Toggle mobile menu/i);

    fireEvent.click(menuButton);

    const mobileNav = screen.getByRole('navigation', {
      name: 'Mobile Navigation',
    });
    expect(mobileNav).toBeInTheDocument();

    const homeLink = mobileNav.querySelector('a[href="/"]');
    const shopLink = mobileNav.querySelector('a[href="/Shop"]');
    const aboutLink = mobileNav.querySelector('a[href="/About"]');
    const contactLink = mobileNav.querySelector('a[href="/Contact"]');

    expect(homeLink).toBeInTheDocument();
    expect(shopLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
  });
});
