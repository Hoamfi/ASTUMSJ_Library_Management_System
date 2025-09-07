import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import apiClient from "../../services/api-client";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface Borrows {
  _id: string;
  user: string;
  book: string;
  borrowDate: string;
  // status: string;
}

interface Returns {
  _id: string;
  user: string;
  book: string;
  borrowDate: string;
}

interface Donation {
  _id: string;
  amount: number;
  createdAt: string;
  status: string;
  screenshot: string;
  user: { _id: string; name: string };
}

const borrowsDummy = [
  {
    _id: "1",
    user: "Ammar",
    book: "Atomic Habit",
    borrowDate: "2025-09-03T17:55:28.691+00:00",
  },
  {
    _id: "2",
    user: "Ammar",
    book: "The Power of habit",
    borrowDate: "2025-09-03T17:55:28.691+00:00",
  },
  {
    _id: "3",
    user: "Ammar",
    book: "The psychology of money",
    borrowDate: "2025-09-03T17:55:28.691+00:00",
  },
  {
    _id: 4,
    user: "Ammar",
    book: "How to talk to anyone",
    borrowDate: "2025-09-03T17:55:28.691+00:00",
  },
];

const returnsDummy = [
  {
    _id: "1",
    user: "Ammar Sabit",
    book: "Atomic Habit",
    borrowDate: "2025-09-03T17:55:28.691+00:00",
  },
  {
    _id: "2",
    user: "Ammar Sabit",
    book: "The Power of habit",
    borrowDate: "2025-09-03T17:55:28.691+00:00",
  },
  {
    _id: "3",
    user: "Ammar Sabit",
    book: "The psychology of money",
    borrowDate: "2025-09-03T17:55:28.691+00:00",
  },
  {
    _id: 4,
    user: "Ammar Sabit",
    book: "How to talk to anyone",
    borrowDate: "2025-09-03T17:55:28.691+00:00",
  },
];

const Pendings = () => {
  const token = localStorage.getItem("token");
  const headers = { "x-auth-token": token };

  const [donations, setDonations] = useState<Donation[]>([]);
  const [borrows, setBorrows] = useState<Borrows[]>(borrowsDummy);
  const [returns, setReturns] = useState<Returns[]>(returnsDummy);
  const [showScreenshot, setShowScreenshot] = useState(false);
  const [screenShot, setScreenShot] = useState("");

  const fetchDonations = async () => {
    try {
      const [donationsRes] = await Promise.all([
        apiClient.get("/donations/admin/pending", { headers: headers }),
      ]);
      setDonations(donationsRes.data.donations);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const screenShotPreview = (screenshot: string) => {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/50 flex items-center justify-center">
        <button
          className="fixed right-5 top-5 cursor-pointer"
          onClick={() => setShowScreenshot(false)}
        >
          <LiaTimesSolid size={25} />
        </button>
        <img src={screenshot} alt="" className="h-screen" />
      </div>
    );
  };

  const handleDonation = (donationId: string, status: string) => {
    apiClient
      .patch(
        `/donations/admin/updatestatus/${donationId}`,
        {
          status: status,
        },
        { headers: headers }
      )
      .then(() => {
        status === "Approved"
          ? toast.success("Donation Approved")
          : toast.error("Donation Rejected");
        fetchDonations();
      })
      .catch((err) => console.error(err));
    console.log(`donation ${donationId} rejected`);
  };

  return (
    <div>
      <div className="flex flex-col my-5 p-5 rounded-2xl shadow bg-white dark:bg-[#1d293d]">
        <h2 className="text-2xl font-semibold px-3 mb-4">Borrow Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto">
            <thead>
              <tr className="text-gray-600 dark:text-gray-300 border-b">
                <th className="p-2 text-center whitespace-nowrap">User</th>
                <th className="p-2 text-center whitespace-nowrap">Book</th>
                <th className="p-2 text-center whitespace-nowrap">
                  Available Copies
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Mark as borrowed
                </th>
              </tr>
            </thead>
            <tbody>
              {borrows.length !== 0 &&
                borrows.map((borrow) => (
                  <tr key={borrow._id} className="border-b">
                    <td className="p-2 text-center whitespace-nowrap">
                      {borrow.user}
                    </td>
                    <td className="p-2 text-center whitespace-nowrap">
                      {borrow.book}
                    </td>
                    <td className="p-2 text-center whitespace-nowrap">20/54</td>
                    <td className="p-2 text-center whitespace-nowrap">
                      <button className="w-fit">
                        <FaCheck color="green" size={25} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col my-5 p-5 rounded-2xl shadow bg-white dark:bg-[#1d293d]">
        <h2 className="text-2xl font-semibold px-3 mb-4">Return Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto">
            <thead>
              <tr className="text-gray-600 dark:text-gray-300 border-b">
                <th className="p-2 text-center whitespace-nowrap">User</th>
                <th className="p-2 text-center whitespace-nowrap">Book</th>
                <th className="p-2 text-center whitespace-nowrap">Due Date</th>
                <th className="p-2 text-center whitespace-nowrap">
                  Mark as returned
                </th>
              </tr>
            </thead>
            <tbody>
              {returns.length !== 0 &&
                returns.map((returnn) => (
                  <tr key={returnn._id} className="border-b">
                    <td className="p-2 text-center whitespace-nowrap">
                      {returnn.user}
                    </td>
                    <td className="p-2 text-center whitespace-nowrap">
                      {returnn.book}
                    </td>
                    <td className="p-2 text-center whitespace-nowrap">
                      {new Date(returnn.borrowDate).toLocaleString("en-us", {
                        dateStyle: "medium",
                      })}
                    </td>
                    <td className="p-2 text-center whitespace-nowrap">
                      <button className="w-fit">
                        <FaCheck color="green" size={25} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {showScreenshot && screenShotPreview(screenShot)}
      <div className="flex flex-col my-5 p-5 rounded-2xl shadow bg-white dark:bg-[#1d293d]">
        <h2 className="text-2xl font-semibold px-3 mb-4">Pending Donations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto">
            <thead>
              <tr className="text-gray-600 dark:text-gray-300 border-b">
                <th className="p-2 text-center whitespace-nowrap">Donner</th>
                <th className="p-2 text-center whitespace-nowrap">Amount</th>
                <th className="p-2 text-center whitespace-nowrap">Date</th>
                <th className="p-2 text-center whitespace-nowrap">
                  Screenshot
                </th>
                <th className="p-2 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {donations.length === 0 ? (
                <p className="my-5">No pending donation yet!</p>
              ) : (
                donations.map((donation) => (
                  <tr key={donation._id} className="border-b">
                    <td className="p-2 text-center whitespace-nowrap">
                      <Link to={`/userdetail/${donation.user._id}`}>
                        {donation.user.name}
                      </Link>
                    </td>
                    <td className="p-2 text-center whitespace-nowrap">
                      {donation.amount} Birr
                    </td>
                    <td className="p-2 text-center whitespace-nowrap">
                      {new Date(donation.createdAt).toLocaleString("en-us", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="p-2 text-center whitespace-nowrap text-blue-500 cursor-pointer">
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          setShowScreenshot(true);
                          setScreenShot(donation.screenshot);
                        }}
                      >
                        photo
                      </button>
                    </td>
                    <td className="p-2 flex gap-2 justify-center whitespace-nowrap">
                      <button
                        className="cursor-pointer"
                        onClick={() => handleDonation(donation._id, "Rejected")}
                      >
                        <FaTimes color="red" size={25} />
                      </button>
                      <button
                        className="cursor-pointer"
                        onClick={() => handleDonation(donation._id, "Approved")}
                      >
                        <FaCheck color="green" size={25} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pendings;
