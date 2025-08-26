import { IoSearch } from "react-icons/io5";

const SearchBox = () => {
  return (
    <div className="p-3 rounded-xl border-2 flex items-center gap-2 border-gray-200 mt-10 in-active:border-grey-600 focus-within:border-4 w-[90%] md:w-[80%] lg:w-[50%]">
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
