import React, { useState, useEffect, useRef } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import ArrowSlider from '../../assets/arraySlider.svg';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const splideRef = useRef<Splide>(null);

  useEffect(() => {
    const adjustHeight = () => {
      const splideInstance = splideRef.current?.splide;
      if (splideInstance) {
        const slides =
          document.querySelectorAll<HTMLImageElement>('.splide__slide img');
        slides.forEach((slide, index) => {
          if (index === splideInstance.index) {
            slide.style.height = '582px';
          } else {
            slide.style.height = '380px';
          }
        });
      }
    };

    const splideInstance = splideRef.current?.splide;
    splideInstance?.on('moved', adjustHeight);

    return () => {
      splideInstance?.off('moved', adjustHeight);
    };
  }, []);

  return (
    <section className="flex flex-col md:flex-row p-12 bg-custom-bg justify-center items-center ">
      <div className="flex flex-col md:items-start justify-center w-full sm:w-1/4 mb-8 sm:mb-0  ml-4  ">
        <h1 className="text-2xl sm:text-4xl font-semibold mb-4">
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
      <div className="w-full sm:w-3/4 border border-black splide pl-4 flex md:justify-end justify-center">
        <Splide
          ref={splideRef}
          options={{
            type: 'slide',
            rewind: true,
            drag: true,
            width: '80%',
            arrows: true,
            pagination: true,
            paginationKeyboard: true,
            gap: '2px',
            start: 0,
            perPage: 2,
            perMove: 1,
            breakpoints: {
              550: { perPage: 1, gap: '2px' },
              768: { perPage: 1, gap: '2px' },
              1024: { perPage: 2, gap: '2px' },
              1440: { perPage: 2, gap: '2px' },
            },
          }}
          onMove={(splide) => {
            setActiveIndex(splide.index);
          }}
        >
          {products.map((product, index) => (
            <SplideSlide key={product.id}>
              <div className="relative ">
                <img
                  src={product.images.mainImage}
                  alt={product.title}
                  className={`object-cover w-full h-[400px] ${
                    index === activeIndex ? 'active-slide' : ''
                  }`}
                />
                {index === activeIndex && (
                  <div className="absolute bottom-0 left-0 flex items-end p-4 space-x-0">
                    <div className="bg-custom-bg-slider p-4 shadow-lg text-center max-w-xs">
                      <span className="text-lg mb-2 block">
                        01 --- Bed Room
                      </span>
                      <p className="text-3xl mb-4 font-semibold">Inner Peace</p>
                    </div>
                    <button className="bg-custom-text-yellow text-white py-2 px-4 ml-4 h-12 flex items-center justify-center">
                      <img src={ArrowSlider} alt="Arrow" className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Slider;
