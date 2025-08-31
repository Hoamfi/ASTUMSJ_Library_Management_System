import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router";
import apiClient from "../services/api-client";

const UserProfileCard = () => {
  const [userName, setUserName] = useState<String>("user");
  useEffect(() => {
    apiClient
      .get("/students/me", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        setUserName(res.data.name.split(" ")[0]);
      })
      .catch((error) => console.log(error));
  }, []);
  const [profileExpanded, setProfileExpanded] = useState(false);
  return (
    <div className="relative">
      <div className="p-2 m-4 border-1 border-gray-300 bg-white dark:bg-[#1d293d]  dark:border-0 rounded-full">
        <FaRegUser size={25} className="inline" />
        <p className="inline pl-1 pr-3">{userName}</p>
        {profileExpanded ? (
          <GoTriangleUp
            className="inline"
            onClick={() => {
              setProfileExpanded(!profileExpanded);
            }}
          />
        ) : (
          <GoTriangleDown
            className="inline"
            onClick={() => {
              setProfileExpanded(!profileExpanded);
            }}
          />
        )}
      </div>
      {profileExpanded && (
        <div className="z-50 w-50  absolute right-4 top-16 p-3 shadow-xl bg-white dark:bg-[#1d293d] rounded-md">
          <Link
            to="/changepassword"
            onClick={() => {
              setProfileExpanded(false);
            }}
          >
            <FaRegUser size={15} className="inline" />
            <span>Change Password</span>
          </Link>
          <Link
            to={"/login"}
            className="block"
            onClick={() => {
              localStorage.removeItem("token");
            }}
          >
            <MdLogout size={15} className="inline" />
            <span>Logout</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;
