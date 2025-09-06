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

interface Donation {
  _id: string;
  amount: number;
  createdAt: string;
  status: string;
  screenshot: string;
  user: { _id: string; name: string };
}

interface Borrow {
  book: { title: string; _id: string };
  borrowedAt: Date;
  status: string;
}

const AdminUserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const token = localStorage.getItem("token");
  const headers = { "x-auth-token": token };

  const [user, setUser] = useState<User | null>(null);
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [userStatus, setUserStatus] = useState("");

  const fetchUserDetail = async () => {
    apiClient.get(`/students/${id}`, { headers: headers }).then((res) => {
      setUser(res.data);
      setUserStatus(res.data.status);
    });
  };

  const fetchBorrowHistroy = async () => {
    apiClient
      .get(`/borrow/admin/borrowhistory/${id}`, {
        headers: headers,
      })
      .then((res) => setBorrows(res.data.borrows));
  };

  const fetchDonationsHistory = async () => {
    apiClient
      .get(`/donations/admin/userdonation/${id}`, {
        headers: headers,
      })
      .then((res) => setDonations(res.data.donations));
  };
  useEffect(() => {
    setLoading(true);
    fetchUserDetail();
    fetchBorrowHistroy();
    fetchDonationsHistory();
    setLoading(false);
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
                  {borrows.length === 0 ? (
                    <p>No borow history yet!</p>
                  ) : (
                    borrows.map((borrow) => (
                      <tr key={borrow.book._id} className="border-b">
                        <td className="py-5 px-2 whitespace-nowrap">
                          {borrow.book.title}
                        </td>
                        <td className="py-5 px-2 whitespace-nowrap">
                          {new Date(borrow.borrowedAt).toLocaleString("en-us", {
                            dateStyle: "medium",
                          })}
                        </td>
                        <td
                          className={`p-2 font-semibold ${
                            borrow.status === "returned"
                              ? "text-green-600"
                              : borrow.status === "overDue"
                                ? "text-red-600"
                                : "text-blue-600"
                          }`}
                        >
                          {borrow.status}
                        </td>
                      </tr>
                    ))
                  )}
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
                  {donations.length === 0 ? (
                    <p>No Donations yet!</p>
                  ) : (
                    donations.map((donation) => (
                      <tr key={donation._id} className="border-b">
                        <td className="py-5 px-2 whitespace-nowrap">
                          Birr: {donation.amount}
                        </td>
                        <td className="py-5 px-2 whitespace-nowrap">
                          {new Date(donation.createdAt).toLocaleString(
                            "en-us",
                            {
                              dateStyle: "medium",
                            }
                          )}
                        </td>
                        <td
                          className={`p-2 font-semibold ${
                            donation.status === "Approved"
                              ? "text-green-600"
                              : donation.status === "Rejected"
                                ? "text-red-600"
                                : "text-blue-600"
                          }`}
                        >
                          {donation.status}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot>
                  <tr className="text-left">
                    <td className="p-5">Total</td>
                    <td className="p-5">
                      Birr:
                      {donations.reduce(
                        (accumulator, donation) =>
                          donation.status === "Approved"
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
