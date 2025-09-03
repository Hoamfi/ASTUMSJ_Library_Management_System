import { IoSearch } from "react-icons/io5";
import { IoSparkles } from "react-icons/io5";
import { FaQuran } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdSelfImprovement } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import apiClient from "../services/api-client";
import { Link } from "react-router";
import { GoDotFill } from "react-icons/go";
import { FaTimes } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  catagory: string;
  page: number;
  publicationYear: number;
  bookCover: string;
}

const SearchBox = () => {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [booksCount, setBookCount] = useState(0);
  const [isSearching, setSearching] = useState(false);

  useEffect(() => {
    setSearching(true);
    if (!query.trim()) {
      setBooks([]);
      return;
    }

    const delayDebouce = setTimeout(() => {
      apiClient
        .get(`/books/search?c=${filter}&q=${query}`)
        .then((res) => {
          setBooks(res.data.books);
          setBookCount(res.data.booksCount);
          setSearching(false);
        })
        .catch((err) => console.error(err));
      setSearching(false);
    }, 500);

    return () => clearTimeout(delayDebouce);
  }, [query, filter]);

  return (
    <div className="w-[90%] md:w-[80%] lg:w-[60%]">
      <div className="px-7 py-4 rounded-3xl flex items-center gap-2 border-2 border-gray-200 mt-10 focus-within:border-4 focus-within:border-blue-400 bg-white dark:bg-[#1d293d] dark:border-0 shadow">
        <IoSearch size={25} />
        <input
          type="text"
          className="w-full outline-0"
          placeholder="Search for Books, Kitabs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button onClick={() => setQuery("")} className="cursor-pointer">
            <FaTimes />
          </button>
        )}
      </div>
      <div className="flex gap-5 mt-5 flex-wrap px-2 justify-center">
        <div
          className={`px-4 py-1 rounded-full flex items-center gap-2 cursor-pointer ${filter === "all" ? "border-3 border-[#1AA190]  dark:border-[#46edd5] dark:text-[#46edd5] dark:bg-[#1d293d] text-[]" : "border-1 border-gray-300 dark:border-1 dark:border-gray-600 dark:bg-[#1d293d]"}`}
          onClick={() => {
            setFilter("all");
          }}
        >
          <IoSparkles /> All
        </div>
        <div
          className={`px-4 py-1 rounded-full flex items-center gap-2 cursor-pointer ${filter === "islamic" ? "border-3 border-[#1AA190]  dark:border-[#46edd5] dark:text-[#46edd5] dark:bg-[#1d293d]" : "border-1 border-gray-300 dark:border-1 dark:border-gray-600 dark:bg-[#1d293d]"}`}
          onClick={() => {
            setFilter("islamic");
          }}
        >
          <FaQuran />
          Islamic
        </div>
        <div
          className={`px-4 py-1 rounded-full flex items-center gap-2 cursor-pointer ${filter === "self" ? "border-3 border-[#1AA190]  dark:border-[#46edd5] dark:text-[#46edd5] dark:bg-[#1d293d]" : "border-1 border-gray-300 dark:border-1 dark:border-gray-600 dark:bg-[#1d293d]"}`}
          onClick={() => {
            setFilter("self");
          }}
        >
          <MdSelfImprovement size={25} />
          Self Helps
        </div>
        <div
          className={`px-4 py-1 rounded-full flex items-center gap-2 cursor-pointer ${filter === "bussiness" ? "border-3 border-[#1AA190]  dark:border-[#46edd5] dark:text-[#46edd5] dark:bg-[#1d293d]" : "border-1 border-gray-300 dark:border-1 dark:border-gray-600 dark:bg-[#1d293d]"}`}
          onClick={() => {
            setFilter("bussiness");
          }}
        >
          <FaSackDollar />
          Bussiness
        </div>
      </div>
      {query && (
        <div className="bg-white dark:bg-[#1d293d] w-full min-h-35 flex flex-col mt-3 rounded-2xl shadow dark:border-1 dark:border-gray-600 p-5">
          {isSearching ? (
            <span className="flex justify-center items-center h-full">
              <ClipLoader className="inline self-center mr-1" size={30} />
              <p className="inline self-center">Searching...</p>
            </span>
          ) : (
            <>
              {books.length !== 0 ? (
                <div className="flex flex-col">
                  <p className="text-gray-700 dark:text-gray-400 self-center text-sm  mb-3">
                    {booksCount} results found
                  </p>
                  {books.map((book) => (
                    <Link to={"/bookdetail/" + book._id} className="flex my-3">
                      <img
                        src={book.bookCover}
                        width={50}
                        className="rounded-lg"
                      />
                      <div className="self-center mx-5">
                        <p>{book.title}</p>
                        <span className="flex text-gray-700 dark:text-gray-400 text-sm">
                          <p>{book.catagory}</p>
                          <GoDotFill className="self-center mx-2" />
                          <p>{book.publicationYear}</p>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="self-center text-gray-400">No results found</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
