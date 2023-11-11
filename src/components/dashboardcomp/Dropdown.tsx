import { useState } from "react";

interface DropdownProps {
  options: string[];
  placeholder: string;
}

const Dropdown = ({ options, placeholder }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("");

  console.log(options, "options");
  console.log(placeholder, "place holder");
  console.log(selectedItem, selectedItem);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };
  return (
    <div className="relative inline-block my-3">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-40 rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none "
        >
          {selectedItem || placeholder}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6.293 5.293a1 1 0 011.414 0l3.293 3.293 3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center w-40 rounded-md shadow-lg bg-white focus:outline-none">
          <ul role="list" className="py-2 overflow-y-auto max-h-48">
            {options.map((item) => (
              <li
                key={item}
                className="text-gray-700 hover:bg-gray-200 cursor-pointer select-none relative py-2 pl-3 pr-4 mx-3"
                onClick={() => handleItemClick(item)}
              >
                <span className="block">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
