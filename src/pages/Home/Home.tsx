import { useEffect } from 'react';
import Slider from '../../components/slider/Slider';
import Products from '../../components/products/Products';
import { useProducts } from '../../context/exportContext';
import ButtonShowMore from '../../components/ButtonShowMore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { products, setProducts } = useProducts();
  const { visibleProducts } = useProducts();
  //const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    fetch('http://54.196.12.70:4000/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [setProducts]);

  const selectedProducts = products.slice(16, 26);

  const navigate = useNavigate();

  const handleClick = (tag: string) => {
    navigate(`/shop/${tag}`);
    window.scrollTo(0, 0);
  };

  const handleClickShopBuyNow = () => {
    navigate('/shop');
    window.scrollTo(0, 0);
  };
  const backgroundImage =
    'https://e-commerceuol.s3.eu-north-1.amazonaws.com/ImagesSprint-12/Image-Id-0.jpg';
  return (
    <>
      <section
        className={`h-screen  `}
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
        }}
      >
        <div className="md:w-[600px] w-full h-[440px] bg-custom-bg flex   absolute md:right-60 top-1/2 transform -translate-y-1/2 overflow-hidden">
          <div className="bg-custom-bg ">
            <div className="flex flex-col px-8 py-12 gap-6  h-full w-full ">
              <p className="text-xl font-semibold">New Arrival</p>
              <p className=" mt-2 text-custom-text-yellow font-bold text-5xl">
                Discover Our
                <br /> New Collection
              </p>
              <p className="mt-4 font-medium font-lg">
                Lorem, ipsum dolor sit amet consectetur adipisici elit. Ut elit
                tellus, luctus nec, ullamcorper mattis.
              </p>
              <button
                className="mt-4 bg-custom-text-yellow text-white  md:w-48 md:h-16 w-full "
                onClick={handleClickShopBuyNow}
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center p-6 bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Browse The Range</h1>
        <p className="text-lg text-center mb-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleClick('Cozinha')}
          >
            <img
              src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/ImageCategory/dinning.svg"
              alt="dinning"
              className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg  h-96  mb-2 object-cover"
            />
            <p className="text-center text-xl">{'dinning'}</p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleClick('Sala')}
          >
            <img
              src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/ImageCategory/living.svg"
              alt={'living'}
              className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg  h-96  mb-2 object-cover"
            />
            <p className="text-center text-xl">{'living'}</p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleClick('Quarto')}
          >
            <img
              src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/ImageCategory/bedroom.svg"
              alt={'bedroom'}
              className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg h-96 mb-2 object-cover"
            />
            <p className="text-center text-xl">{'bedroom'}</p>
          </div>
        </div>
      </section>

      <Products products={products} visibleProducts={visibleProducts} />

      <div className="mb-2">
        <ButtonShowMore />
      </div>

      <Slider products={products} />

      <section className="grid grid-cols-8 grid-rows-8 gap-4 mx-8 h-screen relative">
        <div className="flex flex-col text-center my-8 col-span-8 gap-6 z-10">
          <p className="text-gray-500 font-semibold">Share your setup with</p>
          <h1 className="text-4xl font-bold">#FuniroFurniture</h1>
        </div>

        {selectedProducts.map((product, index) => (
          <div
            key={index}
            className={`row-start-${Math.floor(index / 5) * 3 + 2} col-start-${
              (index % 5) * 2 + 1
            } ${
              index % 2 === 0
                ? 'row-span-3 col-span-2'
                : 'row-span-2 col-span-1'
            } mt-7 lg:flex hidden z-10`}
          >
            <img
              src={product.images.mainImage}
              alt={product.title}
              className="w-full h-full object-cover rounded-lg"
              style={{ minHeight: '200px' }}
            />
          </div>
        ))}

        <div className="absolute top-0 left-0 w-full h-full lg:hidden">
          <img
            src={backgroundImage}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </section>
    </>
  );
};

export default Home;
