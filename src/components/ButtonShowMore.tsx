import { useNavigate } from 'react-router-dom';

const ButtonShowMore = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Shop');
    window.scrollTo(0, 0);
  };

  return (
    <div className="text-center mt-6">
      <button
        className="text-custom-text-yellow font-semibold border border-custom-text-yellow py-2 px-16"
        onClick={handleClick}
      >
        Show More
      </button>
    </div>
  );
};

export default ButtonShowMore;
