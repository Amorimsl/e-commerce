import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../context/context';
import { useProducts } from '../../context/exportContext';

interface SimilarProductProps {
  relatedProducts: Product[];
  quantity: number;
}

const SimilarProduct: React.FC<SimilarProductProps> = ({
  relatedProducts,
  quantity,
}) => {
  const [visibleProducts, setVisibleProducts] = useState(4);
  const navigate = useNavigate();
  const { addToCart, setSingleProduct } = useProducts();

  const handleShowMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 4);
  };

  const handleCardClick = (product: Product) => {
    setSingleProduct(product);
    navigate('/SinglePage');
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (
    product: Product,
    quantity: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
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
    const price = product.new ? product.normalPrice : product.salePrice;
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
      quantity,
      price,
    });
  };

  return (
    <div>
      {' '}
      <section className="py-8  flex items-center justify-center">
        <div className="w-full max-w-[1240px] mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 flex items-center justify-center">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, visibleProducts).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg group flex flex-col cursor-pointer"
                onClick={() => handleCardClick(product)}
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
                      onClick={(e) => handleAddToCart(product, quantity, e)}
                    >
                      Add to Cart
                    </button>
                    <div className="flex justify-between text-white mt-2 gap-2">
                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <img
                            src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/Share.svg"
                            alt="Share Icon"
                            className="w-4 h-4"
                          />
                          <span>Share</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <img
                            src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/Compare.svg"
                            alt="Compare Icon"
                            className="w-4 h-4"
                          />
                          <span>Compare</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <img
                            src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/Heart.svg"
                            alt="Heart Icon"
                            className="w-4 h-4"
                          />
                          <span>Link</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-custom-card-bg flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xl font-semibold mb-2">
                      {product.title}
                    </p>
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
          {visibleProducts < relatedProducts.length && (
            <div className="flex justify-center mt-4">
              <button
                className="bg-custom-text-yellow text-white px-4 py-2 rounded"
                onClick={handleShowMore}
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SimilarProduct;
