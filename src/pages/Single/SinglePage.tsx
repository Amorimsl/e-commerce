import { useProducts } from '../../context/exportContext';
import { Product } from '../../context/context';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SimilarProduct from '../../components/similarProduct/SimilarProduct';

const SinglePage = () => {
  const { addToCart, singleProduct, products, setSingleProduct } =
    useProducts();

  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(
    singleProduct?.images?.mainImage || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('L');

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
  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };
  return (
    <>
      <section className="w-full py-8 bg-custom-bg flex flex-col sm:flex-row items-center  ">
        <div className="flex flex-wrap gap-4 sm:gap-8 items-center lg:ml-48">
          <p className="text-color-transparent" data-testId="Home">
            Home <span className="text-black">{'>'}</span>
          </p>
          <span className="text-color-transparent" aria-label="Shop">
            Shop <span className="text-black">{'>'}</span>
          </span>
          <div className="h-7 border border-r-black hidden sm:block"></div>
          <span aria-label="Product title">{singleProduct.title}</span>
        </div>
      </section>
      <section className="w-full py-8 flex flex-col md:flex-row gap-8 justify-center">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:w-[1241px]">
          <div className="flex flex-col lg:flex-row gap-4 lg:w-[553px] w-full">
            <div className="lg:flex flex-col gap-4 lg:w-[76px] w-full hidden">
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
            <h1
              className="text-3xl font-medium"
              aria-label="SingleProduct-title"
            >
              {singleProduct.title}
            </h1>
            <span
              className="text-color-transparent font-semibold"
              aria-label="singleProduct-price"
            >
              Rs.
              {singleProduct.new
                ? singleProduct.normalPrice
                : singleProduct.salePrice}
            </span>
            <div className="flex items-center gap-4">
              <img
                src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/starts.svg"
                alt="Star Review"
              />
              <div className="border h-8 border-r"></div>
              <span className="text-color-transparent">5 Customer Reviews</span>
            </div>
            <div className="max-h-[80px] overflow-y-auto">
              <p>{singleProduct.description.short}</p>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-color-transparent mb-3" aria-label="Size">
                  Size
                </p>
                <div className="flex gap-2">
                  {['L', 'XL', 'XS'].map((size) => (
                    <div
                      key={size}
                      className={`w-[30px] h-[30px] rounded-lg flex justify-center items-center cursor-pointer ${
                        selectedSize === size
                          ? 'bg-custom-text-yellow'
                          : 'bg-custom-bg'
                      }`}
                      onClick={() => handleSizeClick(size)}
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
                      <img
                        src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/SingleProductShare/facebook.svg"
                        alt="Facebook"
                      />
                      <img
                        src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/SingleProductShare/linkedin.svg"
                        alt="Linkedin"
                      />
                      <img
                        src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/SingleProductShare/twitter.svg"
                        alt="Twitter"
                      />
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
        <div className="h-[36px] w-[535px] flex justify-between items-center md:flex-row flex-col">
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
            <img
              src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/DescriptionSinglePage/SofaDescription.svg"
              alt="Sofa Description"
            />
          </div>
          <div className="w-[605] h-[348px] lg:flex hidden">
            <img
              src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/DescriptionSinglePage/SecondSofa.svg"
              alt="Second Sofa"
            />
          </div>
        </div>
      </section>

      <SimilarProduct relatedProducts={relatedProducts} quantity={quantity} />
    </>
  );
};

export default SinglePage;
