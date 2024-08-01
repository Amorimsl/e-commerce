import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Slider from './Slider';
import { products } from '../gridProduct/gridProduct.test';

global.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

describe('Slider Component', () => {
  test('renders Slider component with products', () => {
    render(
      <MemoryRouter>
        <Slider products={products} />
      </MemoryRouter>
    );

    expect(
      screen.getByText('50+ Beautiful Rooms Inspiration')
    ).toBeInTheDocument();
    expect(screen.getByText('Explore More')).toBeInTheDocument();

    products.forEach((product) => {
      expect(screen.getByAltText(product.title)).toBeInTheDocument();
    });
  });

  test('displays button and content for active slide', () => {
    render(
      <MemoryRouter>
        <Slider products={products} />
      </MemoryRouter>
    );

    expect(
      screen.getByText('01 --- ' + products[0].category)
    ).toBeInTheDocument();
    expect(screen.getByText('Inner Peace')).toBeInTheDocument();
    expect(screen.getByAltText('Arrow')).toBeInTheDocument();
  });
});
