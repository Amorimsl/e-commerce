import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  it('should render the footer with expected content', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(
      screen.getByText(
        (content, element) =>
          element?.tagName.toLowerCase() === 'h1' &&
          content.startsWith('Furniro.')
      )
    ).toBeInTheDocument();

    expect(screen.getByAltText(/Facebook/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Instagram/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Twitter/i)).toBeInTheDocument();
    expect(screen.getByAltText(/LinkedIn/i)).toBeInTheDocument();

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Shop/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();

    expect(screen.getByText(/NewsLetter/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter Your Email Address/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Subscribe/i)).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Enter Your Email Address/i);
    const submitButton = screen.getByText(/Subscribe/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith({
        email: 'test@example.com',
      });
    });

    consoleLogSpy.mockRestore();
  });

  it('should show error message when email is invalid', async () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Enter Your Email Address/i);
    const submitButton = screen.getByText(/Subscribe/i);

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Email inválido/i)).toBeInTheDocument();
  });
});
