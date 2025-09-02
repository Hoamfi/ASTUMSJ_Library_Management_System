import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Link, useParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import { FaArrowLeft } from "react-icons/fa";
import BookCardSkeleton from "../components/BookCardSkeleton";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  catagory: string;
  publicationYear: number;
  bookCover: string;
}

const BookCard = ({
  title,
  bookCover,
}: {
  title: string;
  bookCover: string;
}) => {
  return (
    <div className="w-[170px] my-2">
      <div className="overflow-hidden rounded-xl">
        <img
          src={bookCover}
          alt=""
          className="rounded-xl transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div>
        <h1 className="text-md font-sans">{title}</h1>
      </div>
    </div>
  );
};

const ViewMore = () => {
  const { catagory } = useParams<{ catagory: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [booksCount, setBooksCount] = useState(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (catagory === "mostborrowed") {
        apiClient
          .get("/books/mostborrowed")
          .then((res) => {
            setBooks(res.data);
            setBooksCount(10)
            setLoading(false);
          })
          .catch((error) => {
            console.log(error.response?.data);
            setLoading(false);
          });
      } else {
        apiClient
          .get("/books/?catagory=" + catagory)
          .then((res) => {
            setBooks(res.data.books);
            setBooksCount(res.data.count);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error.response?.data);
            setLoading(false);
          });
      }
    }, 2000);
  }, []);
  const skeletonBooks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div className="flex flex-col items-center">
      <SearchBox />
      <Link to="/" className="self-start m-5">
        <span className="mr-5">
          <FaArrowLeft className="inline mx-3" />
          Back
        </span>
      </Link>
      <div className="self-start ml-5">
        <h1 className="text-5xl font-bold">
          {catagory === "mostborrowed"
            ? "Most Borrowed Books"
            : catagory === "islamic"
              ? "Islamic Books"
              : catagory === "self"
                ? "Self Help Books"
                : "Bussiness Books"}
        </h1>
        <h2 className="text-lg mt-3 text-gray-700 dark:text-gray-400">
          {`Discover ${
            catagory === "mostborrowed"
              ? "Most Borrowed Books"
              : catagory === "islamic"
                ? "Islamic Books"
                : catagory === "self"
                  ? "Self Help Books"
                  : "Bussiness Books"
          } in our library`}
        </h2>
        <h3 className="text-md mt-3 text-gray-700 dark:text-gray-400">
          {booksCount} Books available
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-center items-center gap-x-3 md:gap-6 lg:gap-x-10 gap-y-5 w-fit mx-auto mt-10">
        {isLoading
          ? skeletonBooks.map(() => (
              <BookCardSkeleton width="170px" height="260px" />
            ))
          : books.map((book) => (
              <Link to={"/bookdetail/" + book._id}>
                <BookCard title={book.title} bookCover={book.bookCover} />
              </Link>
            ))}
      </div>
    </div>
  );
};

export default ViewMore;
