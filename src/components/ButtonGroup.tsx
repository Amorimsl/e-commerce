import React from 'react';

interface ButtonGroupProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  return (
    <div className="flex gap-8 mt-2">
      {totalPages >= 1 && (
        <button
          aria-label="Page 1"
          className={`w-12 h-12 bg-custom-bg rounded-lg flex items-center justify-center font-semibold ${
            currentPage === 1 ? 'bg-custom-text-yellow text-white' : ''
          }`}
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          1
        </button>
      )}
      {totalPages >= 2 && (
        <button
          aria-label="Page 2"
          className={`w-12 h-12 bg-custom-bg rounded-lg flex items-center justify-center font-semibold ${
            currentPage === 2 ? 'bg-custom-text-yellow text-white' : ''
          }`}
          onClick={() => setCurrentPage(2)}
          disabled={currentPage === 2 || currentPage > totalPages}
        >
          2
        </button>
      )}
      {totalPages >= 3 && (
        <button
          aria-label="Page 3"
          className={`w-12 h-12 bg-custom-bg rounded-lg flex items-center justify-center font-semibold ${
            currentPage === 3 ? 'bg-custom-text-yellow text-white' : ''
          }`}
          onClick={() => setCurrentPage(3)}
          disabled={currentPage === 3 || currentPage > totalPages}
        >
          3
        </button>
      )}
      {totalPages > 1 && (
        <button
          aria-label="Next Page"
          className={`w-24 h-12 bg-custom-bg rounded-lg flex items-center justify-center font-semibold ${
            currentPage >= totalPages
              ? 'bg-custom-text-yellow text-white'
              : 'bg-custom-bg'
          }`}
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default ButtonGroup;
