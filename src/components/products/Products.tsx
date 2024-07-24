import { useState } from 'react';
import ButtonShowMore from '../ButtonShowMore';
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

interface ProductsProps {
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  const [visibleProducts, setVisibleProducts] = useState(8);

  const handleShowMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 8);
  };

  return (
    <div>
      <section className="p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 text-center">Our Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-[1220px] ">
          {products.slice(0, visibleProducts).map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center bg-white  rounded-lg overflow-hidden bg-custom-card-bg h-full"
            >
              <div className="w-[285px] h-[301px]">
                <img
                  src={product.images.mainImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4   w-full  bg-custom-card-bg  ">
                <p className="text-xl font-semibold mb-2">{product.title}</p>
                <p className="text-gray-600 mb-2 overflow-hidden overflow-ellipsis">
                  {product.description.short}
                </p>
                <div className=" p-2  font-bold rounded-lg">
                  <p>RS {product.normalPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ButtonShowMore
          products={products}
          visibleProducts={visibleProducts}
          handleShowMore={handleShowMore}
        />
      </section>
    </div>
  );
};

export default Products;
