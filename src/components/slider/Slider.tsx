import { Splide, SplideSlide } from '@splidejs/react-splide';

import '@splidejs/react-splide/css';
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

const Slider: React.FC<ProductsProps> = ({ products }) => {
  return (
    <section className="flex p-8 justify-center bg-custom-bg ">
      <div className="flex flex-col items-start justify-center w-1/4">
        <h1 className="text-4xl font-semibold mb-4">
          50+ Beautiful Rooms Inspiration
        </h1>
        <p className="text-base mb-8">
          Our designer already made a lot of beautiful prototypes of rooms that
          inspire you.
        </p>
        <button className="bg-custom-text-yellow text-white py-2 px-8 text-base">
          Explore More
        </button>
      </div>
      <div className="w-1/2 relative ml-16">
        <Splide
          options={{
            type: 'loop',
            perPage: 1,
            focus: 'center',
            gap: '1rem',
            pagination: false,
            arrows: true,
            cover: true,
            breakpoints: {
              900: {
                perPage: 1,
                gap: '0.5rem',
              },
            },
          }}
        >
          {products.map((product, index) => (
            <SplideSlide key={product.id}>
              <div
                className={`relative transition-transform duration-500 ease-in-out ${
                  index === 0 ? 'highlighted-slide' : 'normal-slide'
                }`}
                style={{
                  width: '100%',
                  height: '500px', // Ajuste a altura conforme necessário
                }}
              >
                <img
                  src={product.images.mainImage}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Slider;
