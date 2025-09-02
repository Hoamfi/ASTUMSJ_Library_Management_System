import { IoSearch } from "react-icons/io5";
import { IoSparkles } from "react-icons/io5";
import { FaQuran } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { useState } from "react";

const SearchBox = () => {
  const [active, setActive] = useState("all");
  return (
    <>
      <div className="px-5 py-3.5 rounded-3xl flex items-center gap-2 border-2 border-gray-200 mt-10 focus-within:border-4 focus-within:border-blue-400 w-[90%] md:w-[80%] lg:w-[50%] bg-white dark:bg-[#1d293d] dark:border-0 shadow">
        <IoSearch size={25} />
        <input
          type="text"
          className="w-full outline-0"
          placeholder="Search for Books, Kitabs"
        />
      </div>
      <div className="flex gap-5 mt-5">
        <div
          className={`px-4 py-1 rounded-full flex items-center gap-2 cursor-pointer ${active === "all" ? "border-3 border-[#1AA190] bg-[#ddf7f4] dark:bg-[#1d293d]" : "border-1 border-gray-300 dark:bg-[#1d293d]"}`}
          onClick={() => {
            setActive("all");
          }}
        >
          <IoSparkles /> All
        </div>
        <div
          className={`px-4 py-1 rounded-full flex items-center gap-2 cursor-pointer ${active === "islamic" ? "border-3 border-[#1AA190] bg-[#ddf7f4] dark:bg-[#1d293d]" : "border-1 border-gray-300 dark:bg-[#1d293d]"}`}
          onClick={() => {
            setActive("islamic");
          }}
        >
          <FaQuran />
          Islamic
        </div>
        <div
          className={`px-4 py-1 rounded-full flex items-center gap-2 cursor-pointer ${active === "books" ? "border-3 border-[#1AA190] bg-[#ddf7f4] dark:bg-[#1d293d]" : "border-1 border-gray-300 dark:bg-[#1d293d]"}`}
          onClick={() => {
            setActive("books");
          }}
        >
          <ImBooks />
          Books
        </div>
      </div>
    </>
  );
};

export default SearchBox;
