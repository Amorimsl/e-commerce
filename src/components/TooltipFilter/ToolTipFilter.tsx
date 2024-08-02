import { useState, useEffect, useRef } from 'react';

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
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-50" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img
          src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/filters/menu.svg"
          className="w-5 h-5"
          alt="menu"
        />
      </button>
      {isOpen && (
        <div
          className="absolute mt-2 w-48 bg-custom-bg border border-gray-200 rounded shadow-md"
          role="menu"
        >
          {categories.map((category) => (
            <div
              key={category}
              className="p-2 hover:bg-custom-text-yellow cursor-pointer hover:text-white"
              role="menuitem"
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
