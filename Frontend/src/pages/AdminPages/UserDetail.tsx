import { useParams } from "react-router-dom";
import apiClient from "../../services/api-client";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import Back from "../../components/Back";

interface User {
  _id: string;
  name: string;
  email: string;
  campusId: string;
  studyYear: string;
  department: string;
  status: string;
  createdAt: string;
}

interface Book {
  _id: string;
  title: string;
  borrowDate: Date;
  status: string;
}

interface Donation {
  _id: string;
  amount: number;
  date: Date;
  status: String;
}

const borrowedBooksDummy = [
  {
    _id: "1",
    title: "Atomic Habit",
    borrowDate: "2025-09-03T17:55:28.691+00:00",
    status: "overDue",
  },
  {
    _id: "2",
    title: "The Power of habit",
    borrowDate: "2025-09-03T17:55:28.691+00:00",
    status: "borrowed",
  },
  {
    _id: "3",
    title: "The psychology of money",
    borrowDate: "2025-09-03T17:55:28.691+00:00",
    status: "returned",
  },
  {
    title: "How to talk to anyone",
    borrowDate: "2025-09-03T17:55:28.691+00:00",
    status: "returned",
  },
];

const donationsDummy = [
  {
    _id: "1",
    amount: 100,
    date: "2025-09-03T17:55:28.691+00:00",
    status: "pending",
  },
  {
    _id: "2",
    amount: 1000,
    date: "2025-09-03T17:55:28.691+00:00",
    status: "rejected",
  },
  {
    _id: "3",
    amount: 100,
    date: "2025-09-03T17:55:28.691+00:00",
    status: "approved",
  },
  {
    _id: "4",
    amount: 100,
    date: "2025-09-03T17:55:28.691+00:00",
    status: "approved",
  },
];

const AdminUserDetail = () => {
  const [user, setUser] = useState<User | null>(null);
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);
  const [donations, SetDonations] = useState<Donation[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [userStatus, setUserStatus] = useState("");
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/students/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((response) => {
        setUser(response.data);
        setUserStatus(response.data.status);
        setLoading(false);
        setBorrowedBooks(borrowedBooksDummy);
        SetDonations(donationsDummy);
      })
      .catch((error) => {
        console.error("Error fetching student detail:", error);
        setLoading(false);
      });
  }, []);

  const handleToggleStatus = () => {
    const newStatus = userStatus === "active" ? "suspended" : "active";
    // setUserStatus(newStatus);

    apiClient
      .patch(
        `/students/updateStatus/${user?._id}`,
        { status: newStatus },
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      )
      .then((res) => setUserStatus(res.data.status))
      .catch((err) => console.error(err.response?.data));
  };

  return (
    <div className="px-5 mx-auto w-full md:w-[80%]">
      <span>
        <Back path="/users" />
      </span>

      {isLoading ? (
        <div className="flex justify-center md:self-center">
          <p className="text-lg text-gray-500 animate-pulse">
            Fetching user data...
          </p>
        </div>
      ) : !user ? (
        <p>User not found!</p>
      ) : (
        <>
          <div className="flex flex-col items-center my-5 py-5 rounded-2xl shadow bg-white dark:bg-[#1d293d]">
            <h1 className="text-[2rem] font-semibold px-3 mb-4">User Detail</h1>
            <div className="flex flex-col md:flex-row">
              <FaRegUser className="bg-gray-200 dark:bg-gray-900 p-4 rounded-lg mx-auto size-full md:size-[220px] md:mr-3" />
              <div className="self-center mt-2">
                <p className="my-1">Name: {user.name}</p>
                <p className="my-1">Email: {user.email}</p>
                <p className="my-1">Campus Id: {user.campusId}</p>
                <p className="my-1">Study Year: {user.studyYear}</p>
                <p className="my-1">Deparment: {user.department}</p>
                <p className="my-1">
                  Member since:{" "}
                  {new Date(user.createdAt).toLocaleString("en-us", {
                    dateStyle: "medium",
                  })}
                </p>
                <p
                  className={`font-semibold my-1 ${
                    userStatus === "active" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Status: {userStatus}{" "}
                  <button
                    onClick={handleToggleStatus}
                    className={`ml-5 text-white px-3 py-1 rounded-lg ${userStatus === "active" ? "bg-red-600  hover:bg-red-700" : "bg-green-600  hover:bg-green-700"}`}
                  >
                    {userStatus === "active" ? "suspend" : "unSuspend"}
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col my-5 p-5 rounded-2xl shadow bg-white dark:bg-[#1d293d]">
            <h2 className="text-2xl font-semibold px-3 mb-4">Borrow History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-600 dark:text-gray-300 border-b">
                    <th className="p-2">Title</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowedBooks.length !== 0 &&
                    borrowedBooks.map((book) => (
                      <tr key={book._id} className="border-b">
                        <td className="p-5">{book.title}</td>
                        <td className="p-5">
                          {new Date(book.borrowDate).toLocaleString("en-us", {
                            dateStyle: "medium",
                          })}
                        </td>
                        <td
                          className={`p-2 font-semibold ${
                            book.status === "returned"
                              ? "text-green-600"
                              : book.status === "overDue"
                                ? "text-red-600"
                                : "text-blue-600"
                          }`}
                        >
                          {book.status}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col my-5 p-5 rounded-2xl shadow bg-white dark:bg-[#1d293d]">
            <h2 className="text-2xl font-semibold px-3 mb-4">
              Donations History
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-600 dark:text-gray-300 border-b">
                    <th className="p-2">Amount</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.length !== 0 &&
                    donations.map((donation) => (
                      <tr key={donation._id} className="border-b">
                        <td className="p-5">Birr: {donation.amount}</td>
                        <td className="p-5">
                          {new Date(donation.date).toLocaleString("en-us", {
                            dateStyle: "medium",
                          })}
                        </td>
                        <td
                          className={`p-2 font-semibold ${
                            donation.status === "approved"
                              ? "text-green-600"
                              : donation.status === "rejected"
                                ? "text-red-600"
                                : "text-blue-600"
                          }`}
                        >
                          {donation.status}
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr className="text-left">
                    <td className="p-5">Total</td>
                    <td className="p-5">
                      Birr:
                      {donations.reduce(
                        (accumulator, donation) =>
                          donation.status === "approved"
                            ? donation.amount + accumulator
                            : accumulator,
                        0
                      )}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminUserDetail;
