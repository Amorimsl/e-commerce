import { render, screen } from '@testing-library/react';
import QualityCertificate from './QualityCertificate';

describe('QualityCertificate Component', () => {
  it('should render all certificates with their respective icons and text', () => {
    render(<QualityCertificate />);

    expect(screen.getByAltText('High Quality')).toBeInTheDocument();
    expect(screen.getByText('High Quality')).toBeInTheDocument();
    expect(screen.getByText('crafted from top materials')).toBeInTheDocument();

    expect(screen.getByAltText('Warranty Protection')).toBeInTheDocument();
    expect(screen.getByText('Warranty Protection')).toBeInTheDocument();
    expect(screen.getByText('over 2 years')).toBeInTheDocument();

    expect(screen.getByAltText('Free Shipping')).toBeInTheDocument();
    expect(screen.getByText('Free Shipping')).toBeInTheDocument();
    expect(screen.getByText('order over 150 $')).toBeInTheDocument();

    expect(screen.getByAltText('27/7 Support')).toBeInTheDocument();
    expect(screen.getByText('27/7 Support')).toBeInTheDocument();
    expect(screen.getByText('Dedicated support')).toBeInTheDocument();
  });
});
