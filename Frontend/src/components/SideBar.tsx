import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import { IoMdHome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { GiBookshelf } from "react-icons/gi";
import { BiSolidDonateHeart } from "react-icons/bi";
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaClock } from "react-icons/fa";

interface Props {
  open: Boolean;
}

const SideBar = ({ open }: Props) => {
  const [isAdmin, setIsAdmin] = useState<Boolean>(false);
  useEffect(() => {
    apiClient
      .get("/students/me", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        setIsAdmin(res.data.isAdmin);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="h-full border-1 border-gray-200 bg-white flex flex-col align-center relative overflow-hidden">
      <div className="w-full border-1 flex justify-center pb-3 pt-3 border-b-1  border-gray-200">
        <img src={Logo} className="w-[40%]" alt="" />
      </div>
      {!isAdmin && (
        <div className="flex justify-center">
          <ul>
            <li className="my-2 text-gray-500">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-lg text-black"
                    : "text-grey-500 hover:font-medium text-lg text-black "
                }
              >
                <IoMdHome className="inline" />
                {open && <span className="ml-1">Home</span>}
              </NavLink>
            </li>
            <li className="my-2">
              <NavLink
                to="/shelf"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-lg text-black"
                    : "text-grey-500 hover:font-medium text-lg text-black "
                }
              >
                <GiBookshelf className="inline" />
                {open && <span className="ml-1">My Shelf</span>}
              </NavLink>
            </li>
            <li className="my-2 text-gray-200">
              <NavLink
                to="/userdashbord"
                className={`({ isActive }) =>
                isActive
                  ? "font-medium text-lg text-black"
                  : "text-grey-500 hover:font-medium text-lg text-black "`}
              >
                <MdDashboard className="inline self-start" />
                {open && <span className="ml-1">Dashboard</span>}
              </NavLink>
            </li>
            <li className="my-2">
              <NavLink
                to="/donate"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-lg text-black"
                    : "text-grey-500 hover:font-medium text-lg text-black "
                }
              >
                <BiSolidDonateHeart className="inline" />
                {open && <span className="ml-1">Donate</span>}
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {isAdmin && (
        <div className="flex justify-center">
          <ul>
            <li className="my-2 text-gray-500">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-lg text-black"
                    : "text-grey-500 hover:font-medium text-lg text-black "
                }
              >
                <IoMdHome className="inline" />
                {open && <span className="ml-1">Home</span>}
              </NavLink>
            </li>
            <li className="my-2">
              <NavLink
                to="/addnewbook"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-lg text-black"
                    : "text-grey-500 hover:font-medium text-lg text-black "
                }
              >
                <FaPlus className="inline" />
                {open && <span className="ml-1">Add New Book</span>}
              </NavLink>
            </li>
            <li className="my-2 text-gray-200">
              <NavLink
                to="/admindashbord"
                className={`({ isActive }) =>
                isActive
                  ? "font-medium text-lg text-black"
                  : "text-grey-500 hover:font-medium text-lg text-black "`}
              >
                <MdDashboard className="inline self-start" />
                {open && <span className="ml-1">Dashboard</span>}
              </NavLink>
            </li>
            <li className="my-2">
              <NavLink
                to="/pendingpayments"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-lg text-black"
                    : "text-grey-500 hover:font-medium text-lg text-black "
                }
              >
                <FaClock className="inline" />
                {open && <span className="ml-1">Pending Payments</span>}
              </NavLink>
            </li>
          </ul>
        </div>
      )}
      <div className="absolute bottom-0 w-full p-3 border-t-1 border-gray-200 ">
        {open && (
          <ul>
            <li className="text-sm">
              <Link to="/about">About</Link>
            </li>
            <li className="text-sm">
              <Link to="/support">Support</Link>
            </li>
            <li className="text-sm">
              <Link to="/termsnconditions">Terms & conditions</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SideBar;
