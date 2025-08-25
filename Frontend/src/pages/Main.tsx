import SideBar from "../components/SideBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, type ReactNode } from "react";
import { MdLogout } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const Main = ({ children }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [profileExpanded, setProfileExpanded] = useState(false);

  return (
    <div className="min-h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto]">
      {/*  DESKTOP SIDEBAR (base column) */}
      <aside
        className={`hidden lg:block row-span-3 transition-[width] duration-300 ${isOpen ? "w-64" : "w-16"} h-full relative group `}
      >
        <SideBar open={isOpen} />
        {/* Hover flyout always in DOM for smooth transition */}
        <div
          className={` 
            fixed top-0 left-0 h-screen w-64 shadow-2xl z-30 transform transition-transform duration-300 ease-out 
            ${
              isOpen
                ? "translate-x-[-100%] pointer-events-none opacity-0" // hide flyout if sidebar expanded
                : "translate-x-[-100%] pointer-events-none opacity-0 group-hover:translate-x-0 group-hover:pointer-events-auto group-hover:opacity-100"
            }
                `}
        >
          <SideBar open={true} />
        </div>
      </aside>

      {/* MOBILE SIDEBAR  */}
      {isOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 lg:hidden bg-transparent"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 z-50 transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar open={isOpen} />
      </aside>

      {/* HEADER  */}
      <header className="flex items-center col-span-2 md:col-start-2 md:col-span-1">
        <Header
          isOpen={(state) => setOpen(state)}
          isProfileExpanded={(state) => setProfileExpanded(state)}
        />
      </header>

      {/* MAIN */}
      <main
        className="col-span-2 lg:col-start-2 lg:col-span-1 relative"
        onClick={() => setProfileExpanded(false)}
      >
        {profileExpanded && (
          <div className="border-1 border-gray-200 z-50 absolute right-4 -top-3 p-1 shadow-xl bg-white rounded-md">
            <Link to="/changepassword">
              <FaRegUser size={15} className="inline" />
              <span>Change Password</span>
            </Link>
            <Link to="/login" className="block">
              <MdLogout size={15} className="inline" />
              <span>Logout</span>
            </Link>
          </div>
        )}

        {children}
      </main>

      {/* FOOTER */}
      <footer className="col-span-2 lg:col-start-2 lg:col-span-1">
        <Footer />
      </footer>
    </div>
  );
};

export default Main;
