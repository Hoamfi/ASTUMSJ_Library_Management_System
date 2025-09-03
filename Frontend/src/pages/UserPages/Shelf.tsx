import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import apiClient from "../../services/api-client";

interface Book {
  title: string;
  bookCover: string;
}

const BookCard = ({ title, bookCover }: Book) => {
  return (
    <div className=" m-2">
      <div className="overflow-hidden rounded-xl">
        <img
          src={bookCover}
          alt=""
          className="rounded-xl transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div>
        <h1 className="font-sans mt-2">{title}</h1>
      </div>
    </div>
  );
};

const Shelf = () => {
  const [books, setBooks] = useState<Book[]>();

  useEffect(() => {
    apiClient
      .get("/books")
      .then((res) => {
        setBooks(res.data.books);
      })
      .catch((error) => console.log(error.response?.data));
  }, []);
  return (
    <div className="">
      <span className="mr-5">
        <FaArrowLeft className="inline mx-3" />
        Back
      </span>

      <div className="grid grid-cols-2  md:grid-cols-3 gap-x-4 gap-y-10 border-gray-200 m-5 rounded-xl shadow-xl px-5 py-7 w-screen lg:w-4xl px-3 mx-auto">
        {books?.map((book) => (
          <BookCard
            key={book.title}
            title={book.title}
            bookCover={book.bookCover}
          />
        ))}
      </div>
    </div>
  );
};

export default Shelf;
