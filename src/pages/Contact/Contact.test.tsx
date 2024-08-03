import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contact from './Contact';
import { BrowserRouter } from 'react-router-dom';

describe('Contact Page', () => {
  it('should render the form and handle input validation', async () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('example@domain.com')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('This is an optional')
    ).toBeInTheDocument();
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
        screen.getByText(/Message must be at least 6 characters long/i)
      ).toBeInTheDocument();
    });
  });
  it('should remove error messages when form is correctly filled out and submitted', async () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Your Name'), {
      target: { value: 'Your Name' },
    });
    fireEvent.change(screen.getByPlaceholderText('example@domain.com'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('This is an optional'), {
      target: { value: 'Inquiry' },
    });
    fireEvent.change(screen.getByPlaceholderText("Hi! I'd like to ask about"), {
      target: { value: 'I have a question.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(
        screen.queryByText(/Please enter your name/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Please enter a valid email/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Please enter a message/i)
      ).not.toBeInTheDocument();
    });
  });
  it('should render contact information', () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    expect(screen.getByTestId('address')).toHaveTextContent(
      '236 5th SE Avenue, New York NY10000, United States'
    );
    expect(screen.getByTestId('Phone')).toHaveTextContent(
      'Mobile: +(84) 546-6789 Hotline: +(84) 456-6789'
    );
    expect(screen.getByTestId('Working Time')).toHaveTextContent(
      'Monday-Friday: 9:00 - 22:00 Saturday-Sunday: 9:00 - 21:00'
    );
  });

  it('should remove error messages after correcting inputs', async () => {
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
    });

    fireEvent.change(screen.getByPlaceholderText('Your Name'), {
      target: { value: 'Your Name' },
    });
    fireEvent.change(screen.getByPlaceholderText('example@domain.com'), {
      target: { value: 'john.doe@example.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(
        screen.queryByText(/Your Name must be at least 6 characters long/i)
      ).toBeNull();
      expect(screen.queryByText(/Invalid email address/i)).toBeNull();
    });
  });
});
