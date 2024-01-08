import { useState } from "react";
import { useDispatch } from "react-redux";
import { setselectedPlantationType } from "../../reducers/DisplaySettings";

interface DropdownProps {
  options: string[];
  placeholder: string;
}

const Dropdown = ({ options, placeholder }: DropdownProps) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("");

  // Again test

  const handleItemClick = (item: string) => {
    console.log(item, "item");
    dispatch(setselectedPlantationType(item));
    setSelectedItem(item);
    setIsOpen(false);
  };
  return (
    <div className="relative inline-block w-full">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-16 md:w-24 lg:w-full  items-center rounded-lg border border-gray-300 h-[42px] bg-white text-sm  text-grayText  font-normal "
        >
          {selectedItem || placeholder}
          <svg
            className="-mr-1 ml-2 mt-1 h-5 w-5"
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
        <div className="absolute z-20 left-1/2 text-grayText  font-normal transform -translate-x-1/2 text-center w-14 md:w-24 lg:w-full rounded-lg shadow-lg bg-white focus:outline-none transition-all duration-300 ease-in-out ">
          <ul role="list" className=" overflow-y-auto max-h-48 ">
            {options.map((item) => (
              <li
                key={item}
                className=" hover:bg-boxDivider cursor-pointer select-none relative py-2 text-left px-0 md:px-3  transition duration-100 ease-in-out"
                onClick={() => handleItemClick(item)}
              >
                <span className="block text-[10px] md:text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
