import { IoSearch } from "react-icons/io5";

const SearchBox = () => {
  return (
    <div className="p-3 rounded-3xl flex items-center gap-2 border-gray-100 mt-10 focus-within:border-4 focus-within:border-blue-400 w-[90%] md:w-[80%] lg:w-[50%] bg-white dark:bg-[#1d293d] shadow">
      <IoSearch size={25} />
      <input
        type="text"
        className="w-full outline-0"
        placeholder="Search for Books, Kitabs"
      />
    </div>
  );
};

export default SearchBox;
