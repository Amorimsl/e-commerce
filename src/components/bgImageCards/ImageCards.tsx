import { Link, useLocation } from 'react-router-dom';

const ImageCards = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);

  const mainPath = path.split('/')[0];
  const displayPath = mainPath.charAt(0).toUpperCase() + mainPath.slice(1);

  console.log('Display Path:', displayPath);

  return (
    <div
      style={{
        backgroundImage:
          'url(https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/bgImageCards/ImageCards.svg)',
      }}
      className="bg-cover bg-center w-full h-96 flex items-center justify-center"
      data-testid="image-cards"
    >
      <div className="flex flex-col text-center items-center">
        <img
          src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/Logo.svg"
          className="w-20 h-20"
        />
        <h1
          data-testid="display-path"
          className="text-center font-semibold text-5xl"
        >
          {displayPath}
        </h1>
        <p className="mt-2">
          <span className="font-semibold">
            <Link to="/">Home {'>'} </Link>
          </span>{' '}
          {displayPath}
        </p>
      </div>
    </div>
  );
};

export default ImageCards;
