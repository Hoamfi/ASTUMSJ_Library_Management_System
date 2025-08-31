import { BiSolidDonateHeart } from "react-icons/bi";
import { FaClock } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import Logo from "../assets/logo.png";
import { FaFacebookF } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaRegUser } from "react-icons/fa";

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
    <div className="h-full bg-[#f9fafb] flex flex-col align-center relative overflow-hidden">
      <div className="w-full flex justify-center pb-3 pt-3 ">
        <img src={Logo} className="w-[40%]" alt="" />
      </div>

      {!isAdmin && (
        <nav className="flex items flex-col space-y-3 m-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive && open
                ? "bg-black text-white text-left px-4 py-2 rounded-lg w-full"
                : "text-gray-700 hover:bg-indigo-100 px-4 py-2 rounded-lg w-full"
            }
          >
            {!open && <IoMdHome className="justify-self-center" />}
            {open && <span>Home</span>}
          </NavLink>
          <NavLink
            to="/shelf"
            className={({ isActive }) =>
              isActive && open
                ? "bg-black text-white text-left px-4 py-2 rounded-lg w-full"
                : "text-gray-700 hover:bg-indigo-100 px-4 py-2 rounded-lg w-full"
            }
          >
            {!open && <GiBookshelf className="justify-self-center" />}
            {open && <span>My Shelf</span>}
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive && open
                ? "bg-black text-white text-left px-4 py-2 rounded-lg w-full"
                : "text-gray-700 hover:bg-indigo-100 px-4 py-2 rounded-lg w-full"
            }
          >
            {!open && <MdDashboard className="justify-self-center" />}
            {open && <span>Dashboard</span>}
          </NavLink>
          <NavLink
            to="/donate"
            className={({ isActive }) =>
              isActive && open
                ? "bg-black text-white text-left px-4 py-2 rounded-lg w-full"
                : "text-gray-700 hover:bg-indigo-100 px-4 py-2 rounded-lg w-full"
            }
          >
            {!open && <BiSolidDonateHeart className="justify-self-center" />}
            {open && <span>Donate</span>}
          </NavLink>
        </nav>
      )}

      {isAdmin && (
        <nav className="flex items flex-col space-y-3 m-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive && open
                ? "bg-black text-white px-4 py-2 rounded-lg w-full"
                : "text-gray-700 hover:bg-indigo-100 px-4 py-2 rounded-lg w-full"
            }
          >
            {!open && <IoMdHome className="justify-self-center" />}
            {open && <span>Home</span>}
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive && open
                ? "bg-black text-white text-left px-4 py-2 rounded-lg w-full"
                : "text-gray-700 hover:bg-indigo-100 px-4 py-2 rounded-lg w-full"
            }
          >
            {!open && <FaRegUser className="justify-self-center" />}
            {open && <span>Users</span>}
          </NavLink>
          <NavLink
            to="/addnewbook"
            className={({ isActive }) =>
              isActive && open
                ? "bg-black text-white text-left px-4 py-2 rounded-lg w-full"
                : "text-gray-700 hover:bg-indigo-100 px-4 py-2 rounded-lg w-full"
            }
          >
            {!open && <FaPlus className="justify-self-center" />}
            {open && <span>Add New Book</span>}
          </NavLink>
          <NavLink
            to="/admindashboard"
            className={({ isActive }) =>
              isActive && open
                ? "bg-black text-white text-left px-4 py-2 rounded-lg w-full"
                : "text-gray-700 hover:bg-indigo-100 px-4 py-2 rounded-lg w-full"
            }
          >
            {!open && <MdDashboard className="justify-self-center" />}
            {open && <span>Dashboard</span>}
          </NavLink>
          <NavLink
            to="/payments"
            className={({ isActive }) =>
              isActive && open
                ? "bg-black text-white text-left px-4 py-2 rounded-lg w-full"
                : "text-gray-700 hover:bg-indigo-100 px-4 py-2 rounded-lg w-full"
            }
          >
            {!open && <FaClock className="justify-self-center" />}
            {open && <span>Payments</span>}
          </NavLink>
        </nav>
      )}
      <div className="absolute bottom-0 w-full p-3">
        {open && (
          <div className="flex justify-center py-3">
            <div className="bg-black p-2 rounded-full mx-2">
              <FaTelegramPlane
                size={20}
                className=" text-white cursor-pointer"
              />
            </div>
            <div className="bg-black p-2 rounded-full mx-2">
              <FaFacebookF size={20} className="text-white cursor-pointer" />
            </div>
            <div className="bg-black p-2 rounded-full mx-2">
              <SiGmail size={20} className="text-white cursor-pointer" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
