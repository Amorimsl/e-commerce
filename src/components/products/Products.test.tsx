// Products.test.tsx
import { screen } from '@testing-library/react';
import Products from './Products'; // Ajuste o caminho conforme necessário
import { Product } from '../../context/context';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProductsProvider } from './test-utils';

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

test('renders Products component with products and visibleProducts', () => {
  const visibleProducts = 1;

  renderWithProductsProvider(
    <MemoryRouter>
      <Products products={mockProducts} visibleProducts={visibleProducts} />
    </MemoryRouter>
  );

  expect(screen.getByText('Our Products')).toBeInTheDocument();

  expect(
    screen.getByRole('heading', { name: /Our Products/i })
  ).toBeInTheDocument();

  expect(screen.getByText('Product 1')).toBeInTheDocument();
});

test('renders no products message when products array is empty', () => {
  const visibleProducts = 0;

  renderWithProductsProvider(
    <MemoryRouter>
      <Products products={mockProducts} visibleProducts={visibleProducts} />
    </MemoryRouter>
  );
});
