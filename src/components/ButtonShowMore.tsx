import React from 'react';

interface Product {
  id: number;
  title: string;
  images: {
    mainImage: string;
  };
  description: {
    short: string;
  };
  normalPrice: number;
}

interface ButtonShowMoreProps {
  products: Product[];
  visibleProducts: number;
  handleShowMore: () => void;
}

const ButtonShowMore: React.FC<ButtonShowMoreProps> = ({
  products,
  visibleProducts,
  handleShowMore,
}) => {
  return (
    <div>
      {products.length > visibleProducts && (
        <div className="text-center mt-6">
          <button
            onClick={handleShowMore}
            className="text-custom-text-yellow font-semibold border border-custom-text-yellow py-2 px-16"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default ButtonShowMore;
