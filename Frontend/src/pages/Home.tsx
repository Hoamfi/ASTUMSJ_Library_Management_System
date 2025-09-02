import SearchBox from "../components/SearchBox";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Link } from "react-router-dom";
import BookCardSkeleton from "../components/BookCardSkeleton";
import BookCard from "../components/BookCard";
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
  const [islamicBooks, setIslamicBooks] = useState<Book[]>([]);
  const [selfBooks, setSelfBooks] = useState<Book[]>([]);
  const [bussinessBooks, setBussinessBooks] = useState<Book[]>([]);
  const [isLoading, setLoading] = useState(false);

  const skeletonBooks = [1, 2, 3, 4, 5];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      apiClient
        .get("/books/mostborrowed")
        .then((res) => {
          setMostBorrowedBooks(res.data.books.slice(0, 8));
        })
        .catch((error) => console.log(error.response?.data));
      apiClient
        .get("/books/?catagory=islamic")
        .then((res) => {
          setIslamicBooks(res.data.books.slice(0, 8));
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
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <SearchBox />

      <div className="w-screen lg:w-4xl px-3 mx-auto">
        <div className="mt-15 mx-4">
          <span className="flex justify-between my-3 mx-2">
            <h2 className="font-sans text-lg font-semibold">Most borrowed</h2>
            <Link
              to="/books/mostborrowed"
              className="text-sm text-[#1AA190] hover:text-[#1AA190]/70 self-center underline"
            >
              View More
            </Link>
          </span>
          <div className="flex gap-5 overflow-x-auto">
            {isLoading
              ? skeletonBooks.map(() => (
                  <BookCardSkeleton width={"130px"} height={"184px"} />
                ))
              : mostBorrowedBooks.map((book) => (
                  <Link key={book._id} to={"/bookdetail/" + book._id}>
                    <BookCard title={book.title} bookCover={book.bookCover} />
                  </Link>
                ))}
          </div>
        </div>
        <div className="my-5 mx-4">
          <span className="flex justify-between my-3 mx-2">
            <h2 className="font-sans text-lg font-semibold">Islamic</h2>
            <Link
              to="/books/islamic"
              className="text-sm text-[#1AA190] hover:text-[#1AA190]/70 self-center underline"
            >
              View More
            </Link>
          </span>
          <div className="flex gap-5 overflow-x-auto">
            {isLoading
              ? skeletonBooks.map(() => (
                  <BookCardSkeleton width={"130px"} height={"184px"} />
                ))
              : islamicBooks.map((book) => (
                  <Link key={book._id} to={"/bookdetail/" + book._id}>
                    <BookCard title={book.title} bookCover={book.bookCover} />
                  </Link>
                ))}
          </div>
        </div>
        <div className="my-5 mx-4">
          <span className="flex justify-between my-3 mx-2">
            <h2 className="font-sans text-lg font-semibold">Self Helps</h2>
            <Link
              to="/books/self"
              className="text-sm text-[#1AA190] hover:text-[#1AA190]/70 self-center underline"
            >
              View More
            </Link>
          </span>
          <div className="flex gap-5 overflow-x-auto">
            {isLoading
              ? skeletonBooks.map(() => (
                  <BookCardSkeleton width={"130px"} height={"184px"} />
                ))
              : selfBooks.map((book) => (
                  <Link key={book._id} to={"/bookdetail/" + book._id}>
                    <BookCard title={book.title} bookCover={book.bookCover} />
                  </Link>
                ))}
          </div>
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
          <div className="flex gap-5 overflow-x-auto">
            {isLoading
              ? skeletonBooks.map(() => (
                  <BookCardSkeleton width={"130px"} height={"184px"} />
                ))
              : bussinessBooks.map((book) => (
                  <Link key={book._id} to={"/bookdetail/" + book._id}>
                    <BookCard title={book.title} bookCover={book.bookCover} />
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
