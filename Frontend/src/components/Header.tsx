import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import UserProfileCard from "./UserProfileCard";

interface Props {
  isOpen: (state: boolean) => void;
}

const Header = ({ isOpen }: Props) => {
  const [isExpanded, setExpanded] = useState(false);
  return (
    <div className="w-full h-full flex justify-between">
      <button
        className=" text-white p-2 rounded"
        onClick={() => {
          setExpanded(!isExpanded);
          isOpen(isExpanded);
        }}
        aria-label="Toggle sidebar"
      >
        <RxHamburgerMenu size={30} className=" text-black dark:text-white" />
      </button>
      <UserProfileCard />
    </div>
  );
};

export default Header;
