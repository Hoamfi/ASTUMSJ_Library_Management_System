import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaQuran } from "react-icons/fa";
import { MdSelfImprovement } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import Back from "../components/Back";
import { toast } from "react-toastify";
import { BsBookshelf } from "react-icons/bs";
import { SiBookstack } from "react-icons/si";
import { FaTriangleExclamation } from "react-icons/fa6";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  catagory: string;
  page: number;
  publicationYear: number;
  bookCover: string;
  totalCopies: number;
  availableCopies: number;
}

type Borrow = {
  _id: string;
  user: string;
  book: { _id: string; title: string } | null;
  borrowedAt: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  id: string;
};
interface Props {
  userId?: string;
  isAdmin?: boolean;
  status?: string;
  profileCompleted?: boolean;
}

const getBorrowStatus = (
  borrows: Borrow[],
  bookId: string | undefined
): { status: string | null; borrowId: string | null } => {
  const borrow = borrows.find(
    (b) => b.book && b.book._id.toString() === bookId
  );

  return borrow
    ? { status: borrow.status, borrowId: borrow._id }
    : { status: null, borrowId: null };
};

const BookDetail = ({ userId, status, isAdmin, profileCompleted }: Props) => {
  const { id } = useParams<{ id: string }>();
  const header = { "x-auth-token": localStorage.getItem("token") };
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [bookstatus, setBookStatus] = useState<string | null>("");
  const [borrowId, setBorrowId] = useState<string | null>("");
  const [activeBorrows, setActiveBorrows] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteAction, setDeleteAction] = useState(false);
  const navigate = useNavigate();

  const fetchBorrows = () => {
    apiClient
      .get("/borrow/myborrows", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        setBookStatus(getBorrowStatus(res.data, id).status);
        setBorrowId(getBorrowStatus(res.data, id).borrowId);

        const count = res.data.reduce((acc: number, curr: any) => {
          if (curr.status.toLowerCase() !== "returned") acc++;
          return acc;
        }, 0);

        setActiveBorrows(count);
      });
  };

  useEffect(() => {
    apiClient
      .get(`/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        setLoading(false);
      });
    fetchBorrows();
  }, [id]);

  const handleBorrow = () => {
    if (!profileCompleted)
      return toast.error("Complete your profile before requesting any borrow.");

    if (status === "suspended")
      return toast.error(
        "You are suspended. contact the librarian for more information"
      );

    apiClient
      .post(
        `/borrow/${id}`,
        { userId: userId },
        {
          headers: header,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        fetchBorrows();
      })
      .catch(() => toast.error("something gone wrong please try again."));
    fetchBorrows();
  };

  const handleBookReturn = () => {
    apiClient
      .put(
        `/borrow/return/${borrowId}`,
        {},
        {
          headers: header,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        fetchBorrows();
      })
      .catch(() => toast.error("something went wrong please try again"));
    fetchBorrows();
  };

  useEffect(() => {
    deleteAction &&
      apiClient.delete(`books/${id}`, { headers: header }).then(() => {
        toast.success("Book collection is successfully deleted.");
        setShowPopup(false);
        navigate("/");
      });
  }, [deleteAction]);

  return (
    <>
      {showPopup && (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-[#1d293d] p-5 shadow-xl dark:text-white rounded-lg flex flex-col w-md font-sans">
            <div className="flex mb-5">
              <FaTriangleExclamation color="orange" size={40} />
              <h2 className="fs-5 px-2 align-self-center">
                Delete Book Collection?
              </h2>
            </div>
            <h3 className="text-md ">
              This will delete <strong>{book?.title}</strong>
            </h3>
            <div className="mt-5 self-end">
              <button
                className="bg-green-500 text-white px-3 py-2 rounded-lg shadow hover:bg-green-400 cursor-pointer h-fit mx-2"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-3 py-2 rounded-lg shadow hover:bg-red-400 cursor-pointer h-fit"
                onClick={() => setDeleteAction(true)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className=" border-gray-200 m-5">
        <Back path="/" />
        {isLoading ? (
          <div className="flex items-center justify-center h-[50vh]">
            <p className="text-lg text-gray-500 animate-pulse">
              Loading book details...
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:gap-8 md:flex-row rounded-xl shadow-xl px-5">
            <img
              src={book?.bookCover}
              alt="book-photo"
              className="w-80 rounded-xl md:self-center"
            />
            <div className="my-5 mx-2 md:mt-10">
              <div className="w-full lg:w-2xl flex justify-between">
                <h1 className="text-2xl font-bold md:text-5xl">
                  {book?.title}
                </h1>
                {!isAdmin &&
                  (bookstatus === "borrowed" ? (
                    <button
                      className="bg-black dark:bg-[#1d293d] text-white px-4 py-3 rounded-lg shadow hover:bg-black/80 hover:dark:bg-[#1d293d]/90 cursor-pointer h-fit"
                      onClick={() => handleBookReturn()}
                    >
                      Return
                    </button>
                  ) : book?.availableCopies === 0 ? (
                    <p className="text-red-500">No copies Available</p>
                  ) : activeBorrows === 3 ? (
                    <p className="text-red-500">Borrow limit exceeded</p>
                  ) : bookstatus === "Pending" ? (
                    <p className=" dark:bg-[#1d293d] text-white px-4 py-3 rounded-lg shadow">
                      Pending
                    </p>
                  ) : bookstatus === "Pending_return" ? (
                    <p className="bg-black dark:bg-[#1d293d] text-white px-4 py-3 rounded-lg shadow">
                      Pending Return
                    </p>
                  ) : bookstatus === "returned" ? (
                    <p className="bg-black dark:bg-[#1d293d] text-white px-4 py-3 rounded-lg shadow">
                      Returned
                    </p>
                  ) : bookstatus === "overdues" ? (
                    <p className="text-red-500 bg-black dark:bg-[#1d293d] px-4 py-3 rounded-lg">
                      Over Due
                    </p>
                  ) : (
                    <button
                      className="bg-black dark:bg-[#1d293d] text-white px-4 py-3 rounded-lg shadow hover:bg-black/80 hover:dark:bg-[#1d293d]/90 cursor-pointer h-fit"
                      onClick={() => handleBorrow()}
                    >
                      Borrow
                    </button>
                  ))}
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
                <>
                  <div className="border-t-2 pt-7 border-gray-200 dark:border-gray-100 dark:border-t-1 w-full lg:w-2xl">
                    <h2 className="text-xl font-bold md:text-2xl mb-2">
                      Copies
                    </h2>
                    <span className="flex gap-2 my-2">
                      <p className="font-bold text-md">Total Copies</p>
                      <span className="border-gray-200 dark:bg-[#1d293d] dark:border-0 rounded-lg w-fit border-2 px-2 py-0.5 flex">
                        <BsBookshelf className="mr-1 self-center" />
                        {book?.totalCopies}
                      </span>
                    </span>
                    <span className="flex gap-2">
                      <p className="font-bold text-md">Total Copies</p>
                      <span className="border-gray-200 dark:bg-[#1d293d] dark:border-0 rounded-lg w-fit border-2 px-2 py-0.5 flex">
                        <SiBookstack className="mr-1 self-center" />
                        {book?.availableCopies}
                      </span>
                    </span>
                  </div>
                  <div className="border-t-2 mt-7 py-7 border-gray-200 dark:border-gray-100 dark:border-t-1 w-full lg:w-2xl">
                    <h2 className="text-xl font-bold md:text-2xl mb-2">
                      Actions
                    </h2>
                    <div className="flex gap-4">
                      {/* <button className="cursor-pointer border-gray-200 dark:bg-[#1d293d] dark:border-0 rounded-lg w-fit border-2 px-2 py-1 ">
                      <FaPen className="inline mr-1 align-center" />
                      Edit
                    </button> */}
                      <button
                        className="cursor-pointer border-gray-200 dark:bg-[#1d293d] dark:border-0 rounded-lg w-fit border-2 px-2 py-1"
                        onClick={() => setShowPopup(true)}
                      >
                        <FaTrashAlt className="inline mr-1" color="red" />
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookDetail;
