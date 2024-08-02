import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { useProducts } from '../../context/exportContext';
import GridProduct from './gridProduct';
import { Product } from '../../context/context';

vi.mock('../../context/exportContext', () => ({
  useProducts: vi.fn(),
}));

export const products: Product[] = [
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
    new: false,
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
    price: 120,
  },
];

const mockAddToCart = vi.fn();
const mockSetSingleProduct = vi.fn();

beforeEach(() => {
  (useProducts as Mock).mockReturnValue({
    addToCart: mockAddToCart,
    setSingleProduct: mockSetSingleProduct,
  });
});

describe('GridProduct', () => {
  it('renders product correctly', () => {
    render(
      <Router>
        <GridProduct products={products} visibleProducts={1} />
      </Router>
    );

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(
      screen.getByText('Short description for Product 1')
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Product 1' })).toHaveAttribute(
      'src',
      'https://example.com/image1.jpg'
    );
  });

  it('renders discounted product correctly', () => {
    render(
      <Router>
        <GridProduct products={products} visibleProducts={2} />
      </Router>
    );

    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(
      screen.getByText('Short description for Product 2')
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Product 2' })).toHaveAttribute(
      'src',
      'https://example.com/image2.jpg'
    );
    expect(screen.getByText('-20%')).toBeInTheDocument();
  });

  it('calls addToCart on button click for new product', () => {
    render(
      <Router>
        <GridProduct products={products} visibleProducts={1} />
      </Router>
    );

    fireEvent.click(screen.getByTestId('add-to-cart-button'));

    expect(mockAddToCart).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '1',
        title: 'Product 1',
        category: 'Category 1',
        images: {
          mainImage: 'https://example.com/image1.jpg',
          gallery: [],
        },
        normalPrice: 100,
        sku: 'SKU1',
        tags: ['Tag1'],
        salePrice: 80,
        discountPercentage: 0.2,
        colors: [{ name: 'Red', hex: '#FF0000' }],
        sizes: ['M'],
        rating: 4.5,
        description: { short: 'Short description for Product 1' },
        price: 100,
        quantity: 1,
      })
    );
  });

  it('calls addToCart on button click for discounted product', () => {
    render(
      <Router>
        <GridProduct products={products} visibleProducts={2} />
      </Router>
    );

    fireEvent.click(screen.getAllByTestId('add-to-cart-button')[1]);

    expect(mockAddToCart).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '2',
        title: 'Product 2',
        category: 'Category 2',
        images: {
          mainImage: 'https://example.com/image2.jpg',
          gallery: [],
        },
        normalPrice: 150,
        sku: 'SKU2',
        tags: ['Tag2'],
        salePrice: 120,
        discountPercentage: 0.2,
        colors: [{ name: 'Blue', hex: '#0000FF' }],
        sizes: ['L'],
        rating: 4.0,
        description: { short: 'Short description for Product 2' },
        price: 120,
        quantity: 1,
      })
    );
  });

  it('navigates to SinglePage on card click', () => {
    render(
      <Router>
        <GridProduct products={products} visibleProducts={1} />
      </Router>
    );

    fireEvent.click(screen.getByRole('img', { name: 'Product 1' }));
    expect(mockSetSingleProduct).toHaveBeenCalledWith(products[0]);
    expect(localStorage.getItem('singleProduct')).toEqual(
      JSON.stringify(products[0])
    );
  });
});
