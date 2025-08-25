import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";

interface Props {
  isExpanded: (state: boolean) => void;
}

const UserProfileCard = ({ isExpanded }: Props) => {
  const [profileExpanded, setProfileExpanded] = useState(false);
  return (
    <div className="p-2 m-4 border-2 border-gray-200 rounded-full">
      <FaRegUser size={25} className="inline" />
      <p className="inline pl-1 pr-3">Ammar</p>
      {profileExpanded ? (
        <GoTriangleUp
          className="inline"
          onClick={() => {
            setProfileExpanded(!profileExpanded);
            isExpanded(profileExpanded);
          }}
        />
      ) : (
        <GoTriangleDown
          className="inline"
          onClick={() => {
            setProfileExpanded(!profileExpanded);
            isExpanded(profileExpanded);
          }}
        />
      )}
    </div>
  );
};

export default UserProfileCard;
