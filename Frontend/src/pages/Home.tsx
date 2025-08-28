import SearchBox from "../components/SearchBox";
import BookList from "../components/BookList";
import { IoSparkles } from "react-icons/io5";
import { FaQuran } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  catagory: string;
  publicationYear: number;
  bookCover: string;
}

const Home = () => {
  const [active, setActive] = useState("all");
  const [mostBorrowedBooks, setMostBorrowedBooks] = useState<Book[]>([]);
  const [islamic, setIslamic] = useState<Book[]>([]);
  const [selfBooks, setSelfBooks] = useState<Book[]>([]);
  const [bussinessBooks, setBussinessBooks] = useState<Book[]>([]);

  useEffect(() => {
    apiClient
      .get("/books")
      .then((res) => {
        setMostBorrowedBooks(res.data);
      })
      .catch((error) => console.log(error.response?.data));
    apiClient
      .get("/books/?catagory=islamic")
      .then((res) => {
        setIslamic(res.data);
      })
      .catch((error) => console.log(error.response?.data));
    apiClient
      .get("/books/?catagory=self")
      .then((res) => {
        setSelfBooks(res.data);
      })
      .catch((error) => console.log(error.response?.data));
    apiClient
      .get("/books/?catagory=bussiness")
      .then((res) => {
        setBussinessBooks(res.data);
      })
      .catch((error) => console.log(error.response?.data));
  }, []);

  return (
    <div className="flex flex-col items-center">
      <SearchBox />
      <div className="flex gap-5 mt-7">
        <div
          className={`px-4 py-1 rounded-full flex items-center gap-2 ${active === "all" ? "border-3 border-[#1AA190] bg-[#ddf7f4]" : "border-1 border-gray-300 bg-white"}`}
          onClick={() => {
            setActive("all");
          }}
        >
          <IoSparkles /> All
        </div>
        <div
          className={`px-4 py-1 rounded-full flex items-center gap-2 ${active === "islamic" ? "border-3 border-[#1AA190] bg-[#ddf7f4]" : "border-1 border-gray-300 bg-white"}`}
          onClick={() => {
            setActive("islamic");
          }}
        >
          <FaQuran />
          Islamic
        </div>
        <div
          className={`px-4 py-1 rounded-full flex items-center gap-2 ${active === "books" ? "border-3 border-[#1AA190] bg-[#ddf7f4]" : "border-1 border-gray-300 bg-white"}`}
          onClick={() => {
            setActive("books");
          }}
        >
          <ImBooks />
          Books
        </div>
      </div>
      <div className="mt-15 mx-4">
        <h2 className="font-sansself-start my-3 mx-2 text-lg">Most borrowed</h2>
        <BookList books={mostBorrowedBooks} />
      </div>
      <div className="my-5 mx-4">
        <h2 className="font-sansself-start my-3 mx-2 text-lg">Kitabs</h2>
        <BookList books={islamic} />
      </div>
      <div className="my-5 mx-4">
        <h2 className="font-sansself-start my-3 mx-2 text-lg">Self Helps</h2>
        <BookList books={selfBooks} />
      </div>
      <div className="mt-5 mb-15 mx-4">
        <h2 className="font-sansself-start my-3 mx-2 text-lg">Bussiness</h2>
        <BookList books={bussinessBooks} />
      </div>
    </div>
  );
};

export default Home;
