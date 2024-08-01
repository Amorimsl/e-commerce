import ImageCards from './ImageCards';
import renderWithRouter from './renderWithRouter';

test('renders ImageCards component with shop path', () => {
  const { getByTestId } = renderWithRouter(<ImageCards />, {
    route: '/shop',
  });

  expect(getByTestId('display-path')).toHaveTextContent('Shop');
});

test('renders ImageCards component with checkout path', () => {
  const { getByTestId } = renderWithRouter(<ImageCards />, {
    route: '/checkout',
  });

  expect(getByTestId('display-path')).toHaveTextContent('Checkout');
});

test('renders ImageCards component with cart path', () => {
  const { getByTestId } = renderWithRouter(<ImageCards />, {
    route: '/cart',
  });

  expect(getByTestId('display-path')).toHaveTextContent('Cart');
});

test('renders ImageCards component with contact path', () => {
  const { getByTestId } = renderWithRouter(<ImageCards />, {
    route: '/contact',
  });

  expect(getByTestId('display-path')).toHaveTextContent('Contact');
});
