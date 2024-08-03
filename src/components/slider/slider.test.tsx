import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Slider from './Slider';
import { products } from '../gridProduct/gridProduct.test';

describe('Slider Component', () => {
  it('renders Slider component with products', () => {
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

  it('displays button and content for active slide', () => {
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

  it('checks slide change on interaction', () => {
    render(
      <MemoryRouter>
        <Slider products={products} />
      </MemoryRouter>
    );

    const arrowButton = screen.getByAltText('Arrow');
    fireEvent.click(arrowButton);
  });
});
