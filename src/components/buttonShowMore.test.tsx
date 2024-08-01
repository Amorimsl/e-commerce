import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import ButtonShowMore from './ButtonShowMore';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ButtonShowMore Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    window.scrollTo = vi.fn();
  });

  it('should render the "Show More" button correctly', () => {
    render(<ButtonShowMore />);

    const button = screen.getByText('Show More');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'text-custom-text-yellow font-semibold border border-custom-text-yellow py-2 px-16'
    );
  });

  it('should navigate to "/Shop" and scroll to the top when the button is clicked', () => {
    render(<ButtonShowMore />);

    fireEvent.click(screen.getByText('Show More'));

    expect(mockNavigate).toHaveBeenCalledWith('/Shop');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
