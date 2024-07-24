const ButtonGroup = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <div className="flex gap-8 mt-2">
      <button
        className={`w-12 h-12 bg-custom-bg rounded-lg flex items-center justify-center font-semibold ${
          currentPage === 1 ? 'bg-custom-text-yellow text-white' : ''
        }`}
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
      >
        1
      </button>
      <button
        className={`w-12 h-12 bg-custom-bg rounded-lg flex items-center justify-center font-semibold ${
          currentPage === 2 ? 'bg-custom-text-yellow text-white' : ''
        }`}
        onClick={() => setCurrentPage(2)}
        disabled={currentPage === 2 || currentPage > totalPages}
      >
        2
      </button>
      <button
        className={`w-12 h-12 bg-custom-bg rounded-lg flex items-center justify-center font-semibold ${
          currentPage === 3 ? 'bg-custom-text-yellow text-white' : ''
        }`}
        onClick={() => setCurrentPage(3)}
        disabled={currentPage === 3 || currentPage > totalPages}
      >
        3
      </button>
      <button
        className={`w-24 h-12 bg-custom-bg rounded-lg flex items-center justify-center font-semibold  ${
          currentPage >= totalPages
            ? 'bg-custom-text-yellow text-white'
            : 'bg-custom-bg'
        }`}
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default ButtonGroup;
