import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contact from '../Contact';
import { BrowserRouter } from 'react-router-dom';

describe('Contact Page', () => {
  it('should render the form and handle input validation', async () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('example@domain.com')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Subject')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Hi! I'd like to ask about")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
  });

  it('should display error messages for invalid inputs', async () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Your Name must be at least 6 characters long/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Subject must be at least 6 characters long/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Message must be at least 6 characters long/i)
      ).toBeInTheDocument();
    });
  });

  it('should allow users to fill out and submit the form', async () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('John Doe'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('example@domain.com'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Subject'), {
      target: { value: 'Inquiry' },
    });
    fireEvent.change(screen.getByPlaceholderText("Hi! I'd like to ask about"), {
      target: { value: 'I have a question.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(
        screen.queryByText(/Your Name must be at least 6 characters long/i)
      ).toBeNull();
      expect(screen.queryByText(/Invalid email address/i)).toBeNull();
      expect(
        screen.queryByText(/Subject must be at least 6 characters long/i)
      ).toBeNull();
      expect(
        screen.queryByText(/Message must be at least 6 characters long/i)
      ).toBeNull();
    });
  });
  it('should render contact information correctly', () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    const addressSection = screen.getByTestId('address');
    expect(addressSection).toBeInTheDocument();
    expect(
      screen.getByText(/236 5th SE Avenue, New York NY10000, United States/i)
    ).toBeInTheDocument();

    const phoneSection = screen.getByTestId('Phone');
    expect(phoneSection).toBeInTheDocument();
    expect(
      screen.getByText(
        (content) =>
          content.includes('Mobile: +(84) 546-6789') &&
          content.includes('Hotline: +(84) 456-6789')
      )
    ).toBeInTheDocument();

    const timeSection = screen.getByTestId('Working Time');
    expect(timeSection).toBeInTheDocument();
    expect(
      screen.getByText(
        (content) =>
          content.includes('Monday-Friday: 9:00 - 22:00') &&
          content.includes('Saturday-Sunday: 9:00 - 21:00')
      )
    ).toBeInTheDocument();
  });
});
