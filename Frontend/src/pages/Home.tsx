import SearchBox from "../components/SearchBox";
import BookList from "../components/BookList";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Link } from "react-router-dom";

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
  const [mostBorrowedBooks, setMostBorrowedBooks] = useState<Book[]>([]);
  const [islamic, setIslamic] = useState<Book[]>([]);
  const [selfBooks, setSelfBooks] = useState<Book[]>([]);
  const [bussinessBooks, setBussinessBooks] = useState<Book[]>([]);

  useEffect(() => {
    apiClient
      .get("/books/mostborrowed")
      .then((res) => {
        setMostBorrowedBooks(res.data.books.slice(0, 8));
      })
      .catch((error) => console.log(error.response?.data));
    apiClient
      .get("/books/?catagory=islamic")
      .then((res) => {
        setIslamic(res.data.books.slice(0, 8));
      })
      .catch((error) => console.log(error.response?.data));
    apiClient
      .get("/books/?catagory=self")
      .then((res) => {
        setSelfBooks(res.data.books.slice(0, 8));
      })
      .catch((error) => console.log(error.response?.data));
    apiClient
      .get("/books/?catagory=bussiness")
      .then((res) => {
        setBussinessBooks(res.data.books.slice(0, 8));
      })
      .catch((error) => console.log(error.response?.data));
  }, []);

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <SearchBox />

      <div className="w-screen lg:w-4xl px-3 mx-auto">
        <div className="mt-15 mx-4">
          <span className="flex justify-between my-3 mx-2">
            <h2 className="font-sansself-start text-lg font-semibold">
              Most borrowed
            </h2>
            <Link
              to="/books/mostborrowed"
              className="text-sm text-[#1AA190] hover:text-[#1AA190]/70 self-center underline"
            >
              View More
            </Link>
          </span>
          <BookList books={mostBorrowedBooks} />
        </div>
        <div className="my-5 mx-4">
          <span className="flex justify-between my-3 mx-2">
            <h2 className="font-sansself-start text-lg font-semibold">
              Islamic
            </h2>
            <Link
              to="/books/islamic"
              className="text-sm text-[#1AA190] hover:text-[#1AA190]/70 self-center underline"
            >
              View More
            </Link>
          </span>
          <BookList books={islamic} />
        </div>
        <div className="my-5 mx-4">
          <span className="flex justify-between my-3 mx-2">
            <h2 className="font-sansself-start text-lg font-semibold">
              Self Helps
            </h2>
            <Link
              to="/books/self"
              className="text-sm text-[#1AA190] hover:text-[#1AA190]/70 self-center underline"
            >
              View More
            </Link>
          </span>
          <BookList books={selfBooks} />
        </div>
        <div className="mt-5 mb-15 mx-4">
          <span className="flex justify-between my-3 mx-2">
            <h2 className="font-sansself-start text-lg font-semibold">
              Bussiness
            </h2>
            <Link
              to="/books/bussiness"
              className="text-sm text-[#1AA190] hover:text-[#1AA190]/70 self-center underline"
            >
              View More
            </Link>
          </span>
          <BookList books={bussinessBooks} />
        </div>
      </div>
    </div>
  );
};

export default Home;
