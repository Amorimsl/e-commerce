import React from 'react';
import { render, RenderOptions } from '@testing-library/react'; // Certifique-se de que isso está presente
import { ProductsProvider } from '../../context/context';

// Wrapper para fornecer contexto nos testes
export const renderWithProductsProvider = (
  ui: React.ReactElement,
  options?: RenderOptions
) => {
  return render(<ProductsProvider>{ui}</ProductsProvider>, options);
};
