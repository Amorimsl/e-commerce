// index.test.tsx
import { render } from '@testing-library/react';
import App from './App';
import { ProductsProvider } from './context/context'; // Ajuste o caminho se necessário

test('renders App with ProductsProvider', () => {
  render(
    <ProductsProvider>
      <App />
    </ProductsProvider>
  );
});
