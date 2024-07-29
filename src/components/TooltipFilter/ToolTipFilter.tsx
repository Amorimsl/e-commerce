import { useState } from 'react';

const categories = [
  'Todos',
  'Racks',
  'Sofás',
  'Mesas',
  'Armarios',
  'Cadeiras',
  'Escrivaninhas',
];

interface TooltipMenuProps {
  onSelectCategory: (category: string) => void;
}

const ToolTipFilter: React.FC<TooltipMenuProps> = ({ onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center">
        <img
          src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/filters/menu.svg"
          className="w-5 h-5"
          alt="menu"
        />
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-custom-bg border border-gray-200 rounded shadow-md">
          {categories.map((category) => (
            <div
              key={category}
              className="p-2 hover:bg-custom-text-yellow cursor-pointer hover:text-white"
              onClick={() => {
                onSelectCategory(category);
                setIsOpen(false);
              }}
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolTipFilter;
