import { Link, useParams } from "react-router-dom";
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaQuran } from "react-icons/fa";
import { MdSelfImprovement } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

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

interface Props {
  isAdmin?: boolean;
}

const BookDetail = ({ isAdmin }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    apiClient
      .get(`/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        setLoading(false);
      });
  }, [id]);
  return (
    <div className=" border-gray-200 m-5 ">
      <Link to="/">
        <span className="mr-5">
          <FaArrowLeft className="inline mx-3" />
          Back
        </span>
      </Link>
      {isLoading ? (
        <div className="flex items-center justify-center h-[50vh]">
          <p className="text-lg text-gray-500 animate-pulse">
            Loading book details...
          </p>
        </div>
      ) : (
        <div className="flex flex-col md:gap-8 md:flex-row rounded-xl shadow-xl px-5 py-7 my-5">
          <img
            src={book?.bookCover}
            alt="book-photo"
            className="w-80 rounded-xl md:self-center"
          />
          <div className="my-5 mx-2 md:mt-10">
            <div className="w-full lg:w-2xl flex justify-between">
              <h1 className="text-2xl font-bold md:text-5xl">{book?.title}</h1>
              {!isAdmin && (
                <button className="bg-black dark:bg-[#1d293d] text-white px-4 py-3 rounded-lg shadow hover:bg-black/80 hover:dark:bg-[#1d293d]/90 cursor-pointer h-fit">
                  Borrow
                </button>
              )}
            </div>
            <div className="flex gap-4 mt-3">
              <span className="border-gray-200 dark:bg-[#1d293d] dark:border-0 rounded-lg w-fit border-2 px-2 py-0.5 flex">
                {book?.catagory === "islamic" ? (
                  <FaQuran className="mr-1 self-center" />
                ) : book?.catagory === "self" ? (
                  <MdSelfImprovement className="mr-1 self-center" />
                ) : (
                  <FaSackDollar className="mr-1 self-center" />
                )}
                {book?.catagory}
              </span>
              <span className="border-gray-200 dark:bg-[#1d293d] dark:border-0 rounded-lg w-fit border-2 px-2 py-0.5 flex">
                <FaCalendarAlt className="mr-1 self-center" />
                {book?.publicationYear}
              </span>
              <span className="border-gray-200 dark:bg-[#1d293d] dark:border-0 rounded-lg w-fit border-2 px-2 py-0.5 flex">
                <FaBook className="mr-1 self-center" />
                {book?.page}
              </span>
            </div>
            <div className="border-t-2 mt-7 py-7 border-gray-200 dark:border-gray-100 dark:border-t-1 w-full lg:w-2xl">
              <h2 className="text-xl font-bold md:text-2xl mb-2">Author</h2>
              <p>{book?.author}</p>
            </div>
            <div className="border-t-2 py-7 border-gray-200 dark:border-gray-100 dark:border-t-1 w-full lg:w-2xl">
              <h2 className="text-xl font-bold md:text-2xl mb-2">
                Description
              </h2>
              <p>{book?.description}</p>
            </div>
            {isAdmin && (
              <div className="border-t-2 mt-7 py-7 border-gray-200 dark:border-gray-100 dark:border-t-1 w-full lg:w-2xl">
                <h2 className="text-xl font-bold md:text-2xl mb-2">Actions</h2>
                <div className="flex gap-4">
                  <button className="cursor-pointer border-gray-200 dark:bg-[#1d293d] dark:border-0 rounded-lg w-fit border-2 px-2 py-1 ">
                    <FaPen className="inline mr-1 align-center" />
                    Edit
                  </button>
                  <button>
                    <FaTrashAlt className="inline" color="red" />
                     Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
