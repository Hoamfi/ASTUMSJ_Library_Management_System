import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

interface Props {
  isOpen: (state: boolean) => void;
}

const Header = ({ isOpen }: Props) => {
  const [isExpanded, setExpanded] = useState(false);
  return (
    <div className="w-full h-full border-1 border-gray-200">
      <button
        className=" text-white p-2 rounded"
        onClick={() => {
          setExpanded(!isExpanded);
          isOpen(isExpanded);
        }}
        aria-label="Toggle sidebar"
      >
        <RxHamburgerMenu size={30} color="black" />
      </button>
    </div>
  );
};

export default Header;
