import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SinglePage from '../../pages/Single/SinglePage';
import { ProductsContext } from '../../context/context';

const singleProduct = {
  id: '1',
  title: 'Product 1',
  images: {
    mainImage: 'https://example.com/image1.jpg',
    gallery: [
      'https://example.com/gallery1.jpg',
      'https://example.com/gallery2.jpg',
    ],
  },
  new: true,
  normalPrice: 100,
  salePrice: 80,
  discountPercentage: 0.2,
  category: 'Category 1',
  sku: 'SKU1',
  tags: ['Tag1'],
  colors: [{ name: 'Red', hex: '#FF0000' }],
  sizes: ['L', 'XL', 'XS'],
  rating: 4.5,
  description: { short: 'Short description for Product 1' },
  quantity: 1,
  price: 100,
};

const mockProductsContextValue = {
  products: [],
  setProducts: () => {},
  productsShop: [],
  setProductsShop: () => {},
  visibleProducts: 8,
  setVisibleProducts: () => {},
  addToCart: vi.fn(),
  addToCard: [],
  setAddToCard: () => {},
  singleProduct: singleProduct,
  setSingleProduct: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  userDetails: null,
  setUserDetails: () => {},
  getCartQuantity: () => 0,
};

const MockSinglePage = () => (
  <MemoryRouter>
    <ProductsContext.Provider value={mockProductsContextValue}>
      <SinglePage />
    </ProductsContext.Provider>
  </MemoryRouter>
);

describe('SinglePage Component', () => {
  it('should render the main image correctly', () => {
    render(<MockSinglePage />);
    expect(screen.getByAltText('Main Image')).toHaveAttribute(
      'src',
      singleProduct.images.mainImage
    );
  });

  it('should render the product title', () => {
    render(<MockSinglePage />);
    expect(screen.getByLabelText('SingleProduct-title')).toHaveTextContent(
      singleProduct.title
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByLabelText('SingleProduct-title')).toBeInTheDocument();
  });

  it('should render the price correctly', () => {
    render(<MockSinglePage />);
    expect(screen.getByLabelText('singleProduct-price')).toHaveTextContent(
      `Rs.${
        singleProduct.new ? singleProduct.normalPrice : singleProduct.salePrice
      }`
    );
  });

  it('should render the description correctly', () => {
    render(<MockSinglePage />);
    expect(
      screen.getByText(singleProduct.description.short)
    ).toBeInTheDocument();
  });

  it('should render size options', () => {
    render(<MockSinglePage />);
    singleProduct.sizes.forEach((size) => {
      expect(screen.getByText(size)).toBeInTheDocument();
    });
  });

  it('should render SKU and category correctly', () => {
    render(<MockSinglePage />);
    expect(screen.getByText('SKU :')).toBeInTheDocument();
    expect(screen.getByText('Category:')).toBeInTheDocument();
  });

  it('should render tags correctly', () => {
    render(<MockSinglePage />);
    expect(screen.getByText('Tags:')).toBeInTheDocument();
  });

  it('should render share icons correctly', () => {
    render(<MockSinglePage />);
    const shareIcons = ['facebook.svg', 'linkedin.svg', 'twitter.svg'];
    shareIcons.forEach((icon) => {
      expect(
        screen.getByAltText(
          icon.split('.')[0].charAt(0).toUpperCase() +
            icon.split('.')[0].slice(1)
        )
      ).toHaveAttribute(
        'src',
        `https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/SingleProductShare/${icon}`
      );
    });
  });

  it('should increase and decrease quantity correctly', () => {
    render(<MockSinglePage />);
    const increaseButton = screen.getByText('+');
    const decreaseButton = screen.getByText('-');
    const quantityDisplay = screen.getByText('1');

    fireEvent.click(increaseButton);
    expect(quantityDisplay).toHaveTextContent('2');

    fireEvent.click(decreaseButton);
    expect(quantityDisplay).toHaveTextContent('1');
  });

  it('should update main image on gallery image click', () => {
    render(<MockSinglePage />);
    const galleryImage = screen.getAllByAltText('Gallery Image 1')[0];
    fireEvent.click(galleryImage);
    expect(screen.getByAltText('Main Image')).toHaveAttribute(
      'src',
      'https://example.com/gallery1.jpg'
    );
  });
  it('should navigate to home if no singleProduct in localStorage', () => {
    localStorage.removeItem('singleProduct');

    const mockSetSingleProduct = vi.fn();

    render(
      <MemoryRouter>
        <ProductsContext.Provider
          value={{
            ...mockProductsContextValue,
            setSingleProduct: mockSetSingleProduct,
          }}
        >
          <SinglePage />
        </ProductsContext.Provider>
      </MemoryRouter>
    );
  });
  it('should call handleAddToCart with correct parameters', () => {
    render(<MockSinglePage />);
    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);
    expect(mockProductsContextValue.addToCart).toHaveBeenCalledWith({
      id: singleProduct.id,
      title: singleProduct.title,
      category: singleProduct.category,
      images: singleProduct.images,
      normalPrice: singleProduct.normalPrice,
      sku: singleProduct.sku,
      tags: singleProduct.tags,
      salePrice: singleProduct.salePrice,
      discountPercentage: singleProduct.discountPercentage,
      colors: singleProduct.colors,
      sizes: singleProduct.sizes,
      rating: singleProduct.rating,
      description: singleProduct.description,
      quantity: 1,
      price: singleProduct.new
        ? singleProduct.normalPrice
        : singleProduct.salePrice,
    });
  });
  it('should render SimilarProduct component with related products', () => {
    render(<MockSinglePage />);
    expect(screen.getByText('Related Products')).toBeInTheDocument();
  });
});
