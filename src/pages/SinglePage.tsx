import FirstSofaDescription from '../assets/DescriptionSinglePage/SofaDescription.svg';
import SecondSofaDescription from '../assets/DescriptionSinglePage/SecondSofa.svg';
import StarReview from '../assets/starts.svg';
import Facebook from '../assets/SingleProductShare/facebook.svg';
import Linkedin from '../assets/SingleProductShare/linkedin.svg';
import Twitter from '../assets/SingleProductShare/twitter.svg';
import { useProducts } from '../context/exportContext';
import Share from '../assets/Share.svg';
import Compare from '../assets/Compare.svg';
import heart from '../assets/Heart.svg';
import { Product } from '../context/context';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SinglePage = () => {
  const { addToCart, singleProduct, products, setSingleProduct } =
    useProducts();
  const [visibleProducts, setVisibleProducts] = useState(4);
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(
    singleProduct?.images?.mainImage || ''
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (singleProduct) {
      setMainImage(singleProduct.images.mainImage);
    }
    if (!singleProduct) {
      const savedProduct = localStorage.getItem('singleProduct');
      if (savedProduct) {
        setSingleProduct(JSON.parse(savedProduct));
      } else {
        navigate('/');
      }
    }
  }, [singleProduct, setSingleProduct, navigate]);

  const handleCardClick = (product: Product) => {
    setSingleProduct(product);
    navigate('/SinglePage');
    window.scrollTo(0, 0);
  };

  const handleShowMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 4);
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

  if (!singleProduct) {
    return <p>Carregando.</p>;
  }

  const relatedProducts = products.filter(
    (product) =>
      product.category === singleProduct.category &&
      product.id !== singleProduct.id
  );

  const handleImageClick = (image: string) => {
    setMainImage(image);
  };
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  return (
    <>
      <section className="w-full py-8 bg-custom-bg flex flex-col sm:flex-row items-center  ">
        <div className="flex flex-wrap gap-4 sm:gap-8 items-center lg:ml-48">
          <span className="text-color-transparent">
            Home <span className="text-black">{'>'}</span>
          </span>
          <span className="text-color-transparent">
            Shop <span className="text-black">{'>'}</span>
          </span>
          <div className="h-7 border border-r-black hidden sm:block"></div>
          <span>{singleProduct.title}</span>
        </div>
      </section>
      <section className="w-full py-8 flex flex-col md:flex-row gap-8 justify-center">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:w-[1241px]">
          <div className="flex flex-col lg:flex-row gap-4 lg:w-[553px] w-full">
            <div className="flex flex-col gap-4 lg:w-[76px] w-full">
              {singleProduct.images.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-auto cursor-pointer"
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
            <div className="flex-1 ">
              <img
                src={mainImage}
                alt="Main Image"
                className="w-full h-auto object-contain "
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:w-[606px] w-full">
            <h1 className="text-3xl font-medium">{singleProduct.title}</h1>
            <span className="text-color-transparent font-semibold">
              Rs.
              {singleProduct.new
                ? singleProduct.normalPrice
                : singleProduct.salePrice}
            </span>
            <div className="flex items-center gap-4">
              <img src={StarReview} alt="Star Review" />
              <div className="border h-8 border-r"></div>
              <span className="text-color-transparent">5 Customer Reviews</span>
            </div>
            <div className="max-h-[80px] overflow-y-auto">
              <p>{singleProduct.description.short}</p>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-color-transparent mb-3">Size</p>
                <div className="flex gap-2">
                  {['L', 'XL', 'XS'].map((size) => (
                    <div
                      key={size}
                      className={`w-[30px] h-[30px] ${
                        size === 'L' ? 'bg-custom-text-yellow' : 'bg-custom-bg'
                      } rounded-lg flex justify-center items-center`}
                    >
                      <button className="text-xs">{size}</button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-color-transparent mb-3">Color</p>
                <div className="flex gap-2">
                  {singleProduct.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-[30px] h-[30px] rounded-full"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <div className="w-[123px] h-[64px] bg-white rounded-lg border border-gray-300 flex items-center justify-center">
                <button
                  className="text-lg font-semibold text-black px-4"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  className="text-lg font-semibold text-black px-4"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
              <div className="w-[215px] h-[64px] bg-white rounded-lg border border-black flex items-center justify-center">
                <button
                  className="text-lg font-semibold"
                  onClick={(e) => handleAddToCart(singleProduct, quantity, e)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="w-full border border-t mt-6"></div>
            <div className="flex flex-col gap-4">
              {[
                { label: 'SKU ', value: singleProduct.sku },
                { label: 'Category', value: singleProduct.category },
                {
                  label: 'Tags',
                  value: (Array.isArray(singleProduct.tags)
                    ? singleProduct.tags
                    : singleProduct.tags
                    ? singleProduct.tags.split(' ')
                    : []
                  ).join(', '),
                },
                {
                  label: 'Share',
                  value: (
                    <div className="flex gap-4">
                      <img src={Facebook} alt="Facebook" />
                      <img src={Linkedin} alt="Linkedin" />
                      <img src={Twitter} alt="Twitter" />
                    </div>
                  ),
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center">
                  <span className="text-color-transparent w-16">{label}:</span>
                  <span className="ml-4">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="h-[744px] flex justify-center items-center flex-col gap-6 ">
        <div className="h-[36px] w-[535px] flex justify-between items-center">
          <h1 className="text-lg font-semibold">Description</h1>
          <span className="text-color-transparent text-lg">
            Additional Information
          </span>
        </div>

        <div className="lg:w-[1026px] w-full lg:h-[174px] flex flex-col gap-4 text-color-transparent text-sm">
          <div className="lg:w-[1026px] w-full lg:h[48px]">
            Embodying the raw, wayward spirit of rock n roll, the Kilburn
            portable active stereo speaker takes the unmistakable look and sound
            of Marshall, unplugs the chords, and takes the show on the road.
          </div>
          <div className="lg:w-[1026px]  w-full lg:h[96px]">
            Weighing in under 7 pounds, the Kilburn is a lightweight piece of
            vintage styled engineering. Setting the bar as one of the loudest
            speakers in its class, the Kilburn is a compact, stout-hearted hero
            with a well-balanced audio which boasts a clear midrange and
            extended highs for a sound that is both articulate and pronounced.
            The analogue knobs allow you to fine tune the controls to your
            personal preferences while the guitar-influenced leather strap
            enables easy and stylish travel.
          </div>
        </div>

        <div className="lg:w-[1239px] w-full h-[348px] flex flex-row gap-4 items-center justify-center">
          <div className="w-[605] h-[348px] ">
            <img src={FirstSofaDescription} />
          </div>
          <div className="w-[605] h-[348px] lg:flex hidden">
            <img src={SecondSofaDescription} />
          </div>
        </div>
      </section>
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
                            src={Share}
                            alt="Share Icon"
                            className="w-4 h-4"
                          />
                          <span>Share</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <img
                            src={Compare}
                            alt="Compare Icon"
                            className="w-4 h-4"
                          />
                          <span>Compare</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <img
                            src={heart}
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
    </>
  );
};

export default SinglePage;
