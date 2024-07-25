import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import imageCardsSvg from '../../assets/bgImageCards/ImageCards.svg';

const ImageCards = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);

  const mainPath = path.split('/')[0];
  const displayPath = mainPath.charAt(0).toUpperCase() + mainPath.slice(1);

  return (
    <div
      style={{
        backgroundImage: `url(${imageCardsSvg})`,
      }}
      className="bg-cover bg-center w-full h-96 flex items-center justify-center"
    >
      <div className="text-center">
        <h1 className="text-center font-semibold text-5xl">{displayPath}</h1>
        <p className="mt-2">
          <span className="font-semibold">
            <Link to="/">Home {'>'}</Link>
          </span>{' '}
          {displayPath}
        </p>
      </div>
    </div>
  );
};

export default ImageCards;
