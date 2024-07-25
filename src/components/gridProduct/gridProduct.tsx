import React from 'react';
import { useProducts } from '../../context/exportContext'; // Atualize o caminho conforme necessário
import Share from '../../assets/Share.svg';
import Compare from '../../assets/Compare.svg';
import heart from '../../assets/Heart.svg';
import { Product } from '../../context/context';

const GridProduct: React.FC<{
  products: Product[];
  visibleProducts: number;
}> = ({ products, visibleProducts }) => {
  const { addToCart } = useProducts();

  const handleAddToCart = (product: Product) => {
    const {
      category,
      images,
      normalPrice,
      id,
      title,
      sku,
      tags,
      salePrice,
      discountPercentage,
      colors,
      sizes,
      rating,
      description,
    } = product;
    addToCart({
      id,
      title,
      category,
      images,
      normalPrice,
      sku,
      tags,
      salePrice,
      discountPercentage,
      colors,
      sizes,
      rating,
      description,
      quantity: 1,
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-[1220px]">
      {products.slice(0, visibleProducts).map((product) => (
        <div
          key={product.id}
          className="relative bg-white rounded-lg overflow-hidden shadow-lg group flex flex-col"
        >
          <div className="relative">
            <img
              src={product.images.mainImage}
              alt={product.title}
              className="w-full h-[301px] object-cover rounded-t-lg"
            />
            {product.new && (
              <div className="absolute top-3 right-3">
                <span className="bg-custom-new-bg text-white w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold">
                  New
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300">
              <button
                className="bg-white text-custom-text-yellow px-12 py-3 font-semibold"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <div className="flex justify-between text-white mt-2 gap-2">
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <img src={Share} alt="Share Icon" className="w-4 h-4" />
                    <span>Share</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <img src={Compare} alt="Compare Icon" className="w-4 h-4" />
                    <span>Compare</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <img src={heart} alt="Heart Icon" className="w-4 h-4" />
                    <span>Link</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-custom-card-bg flex-1 flex flex-col justify-between">
            <div>
              <p className="text-xl font-semibold mb-2">{product.title}</p>
              <p className="text-gray-600 mb-2 overflow-hidden overflow-ellipsis">
                {product.description.short}
              </p>
            </div>
            <div className="p-2 font-bold rounded-lg">
              <p>RS {product.normalPrice}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridProduct;
