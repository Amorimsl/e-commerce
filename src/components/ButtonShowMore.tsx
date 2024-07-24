import { Link } from 'react-router-dom';

const ButtonShowMore = () => {
  return (
    <div>
      <div className="text-center mt-6">
        <button className="text-custom-text-yellow font-semibold border border-custom-text-yellow py-2 px-16">
          <Link to="/Shop">Show More</Link>
        </button>
      </div>
    </div>
  );
};

export default ButtonShowMore;
