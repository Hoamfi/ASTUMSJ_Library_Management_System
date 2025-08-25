import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import UserProfileCard from "./UserProfileCard";

interface Props {
  isOpen: (state: boolean) => void;
  isProfileExpanded: (state: boolean) => void;
}

const Header = ({ isOpen, isProfileExpanded }: Props) => {
  const [isExpanded, setExpanded] = useState(false);
  return (
    <div className="w-full h-full border-1 flex justify-between border-gray-200">
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
      <UserProfileCard isExpanded={(state) => isProfileExpanded(state)} />
    </div>
  );
};

export default Header;
