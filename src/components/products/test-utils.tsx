import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ProductsProvider } from '../../context/context';

export const renderWithProductsProvider = (
  ui: React.ReactElement,
  options?: RenderOptions
) => {
  return render(<ProductsProvider>{ui}</ProductsProvider>, options);
};
