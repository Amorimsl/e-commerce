import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Checkout from './Checkout';
import { ProductsProvider } from '../../context/context';
import { MemoryRouter } from 'react-router-dom';

describe('Checkout', () => {
  vi.mock('axios');

  it('should handle payment options and form submission', () => {
    render(
      <MemoryRouter>
        <ProductsProvider>
          <Checkout />
        </ProductsProvider>
      </MemoryRouter>
    );

    const bankTransferRadio = screen.getByLabelText(
      'Direct Bank Transfer'
    ) as HTMLInputElement;
    const cashOnDeliveryRadio = screen.getByLabelText(
      'Cash on Delivery'
    ) as HTMLInputElement;

    expect(bankTransferRadio.checked).toBe(false);
    expect(cashOnDeliveryRadio.checked).toBe(false);

    fireEvent.click(screen.getByLabelText('Direct Bank Transfer'));
    expect(bankTransferRadio.checked).toBe(true);

    fireEvent.click(screen.getByText('Place Order'));
  });
  it('renders form fields correctly', () => {
    render(
      <MemoryRouter>
        <ProductsProvider>
          <Checkout />
        </ProductsProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Company Name \(Optional\)/i)).toBeInTheDocument();
    expect(screen.getByText(/ZIP code/i)).toBeInTheDocument();
    expect(screen.getByText(/Country \/ Region/i)).toBeInTheDocument();
    expect(screen.getByText(/Street address/i)).toBeInTheDocument();
    expect(screen.getByText(/Town \/ City/i)).toBeInTheDocument();
    expect(screen.getByText(/Province/i)).toBeInTheDocument();
    expect(screen.getByText(/Add-on address/i)).toBeInTheDocument();

    const companyNameLabel = screen.getByText(/Company Name \(Optional\)/i);
    expect(companyNameLabel).toBeInTheDocument();
    expect(companyNameLabel.nextElementSibling).toHaveAttribute(
      'name',
      'companyName'
    );

    const zipCodeLabel = screen.getByText(/ZIP code/i);
    expect(zipCodeLabel).toBeInTheDocument();
    expect(zipCodeLabel.nextElementSibling).toHaveAttribute('name', 'zipCode');

    const countryLabel = screen.getByText(/Country \/ Region/i);
    expect(countryLabel).toBeInTheDocument();
    expect(countryLabel.nextElementSibling).toHaveAttribute('name', 'country');

    const streetAddressLabel = screen.getByText(/Street address/i);
    expect(streetAddressLabel).toBeInTheDocument();
    expect(streetAddressLabel.nextElementSibling).toHaveAttribute(
      'name',
      'streetAddress'
    );

    const cityLabel = screen.getByText(/Town \/ City/i);
    expect(cityLabel).toBeInTheDocument();
    expect(cityLabel.nextElementSibling).toHaveAttribute('name', 'city');

    const provinceLabel = screen.getByText(/Province/i);
    expect(provinceLabel).toBeInTheDocument();
    expect(provinceLabel.nextElementSibling).toHaveAttribute(
      'name',
      'province'
    );

    const addOnAddressLabel = screen.getByText(/Add-on address/i);
    expect(addOnAddressLabel).toBeInTheDocument();
    expect(addOnAddressLabel.nextElementSibling).toHaveAttribute(
      'name',
      'addOnAddress'
    );
  });

  it('shows errors when the form is submitted with invalid inputs', async () => {
    render(
      <MemoryRouter>
        <ProductsProvider>
          <Checkout />
        </ProductsProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Place Order/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/ZIP code must be exactly 8 characters long/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Country is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Street address is required/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/City is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Province is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    });
  });

  it('does not show errors when the form is filled out correctly and submitted', async () => {
    render(
      <MemoryRouter>
        <ProductsProvider>
          <Checkout />
        </ProductsProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/ZIP code/i), {
      target: { value: '12345678' },
    });
    fireEvent.change(screen.getByLabelText(/Country \/ Region/i), {
      target: { value: 'Country' },
    });
    fireEvent.change(screen.getByLabelText(/Street address/i), {
      target: { value: '123 Sample Street' },
    });
    fireEvent.change(screen.getByLabelText(/Town \/ City/i), {
      target: { value: 'Sample City' },
    });
    fireEvent.change(screen.getByLabelText(/Province/i), {
      target: { value: 'Sample State' },
    });
    fireEvent.change(screen.getByLabelText(/Add-on address/i), {
      target: { value: 'Sample Add-on Address' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Place Order/i }));

    await waitFor(() => {
      expect(
        screen.queryByText(/ZIP code must be exactly 8 characters long/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Country is required/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Street address is required/i)
      ).not.toBeInTheDocument();
      expect(screen.queryByText(/City is required/i)).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Province is required/i)
      ).not.toBeInTheDocument();
    });
  });
});
