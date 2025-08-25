import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

interface Props {
  isOpen: (state: boolean) => void;
}

const Header = ({ isOpen }: Props) => {
  const [isExpanded, setExpanded] = useState(false);
  return (
    <div className="bg-green-500 w-full h-full">
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
