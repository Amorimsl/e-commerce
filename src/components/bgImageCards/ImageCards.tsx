import imageCardsSvg from '../../assets/bgImageCards/ImageCards.svg';

const ImageCards = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${imageCardsSvg})`,
      }}
      className="bg-cover bg-center w-full h-96 flex items-center justify-center "
    >
      <div className="text-center">
        <h1 className="text-center font-semibold text-5xl">Shop</h1>
        <p className=" mt-2">
          <span className="font-semibold">Home {'>'}</span> Shop
        </p>
      </div>
    </div>
  );
};

export default ImageCards;
