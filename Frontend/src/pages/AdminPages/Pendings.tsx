import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";

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
  date: string;
  donner: String;
  screenshot: string;
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

const donationsDummy = [
  {
    _id: "1x",
    amount: 100,
    date: "2025-09-03T17:55:28.691+00:00",
    donner: "Ammar Sabit",
    screenshot: "https://i.ibb.co/XxGJjGfK/photo-2025-09-05-16-10-34.jpg",
  },
  {
    _id: "2x",
    amount: 1000,
    date: "2025-09-03T17:55:28.691+00:00",
    donner: "BinLadin",
    screenshot:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTF3St62EotWOHJLwtKGV4OBMR1gNy2XwYQ&s",
  },
  {
    _id: "3x",
    amount: 100,
    date: "2025-09-03T17:55:28.691+00:00",
    donner: "John Smith",
    screenshot:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9TYyGMyujsrzj7aQ9PBJJ1_7hVogI4Ai1EQ&s",
  },
  {
    _id: "4x",
    amount: 100,
    date: "2025-09-03T17:55:28.691+00:00",
    donner: "Ammar Sabit",
    screenshot:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAcONNY43VDtL8TqZhWC4uX5evuHKGxzH8_g&sluaPlIgB361nZ-8MI3gVvYxpizVGhfAnEpg&s",
  },
];

const Pendings = () => {
  const [donations, SetDonations] = useState<Donation[]>(donationsDummy);
  const [borrows, setBorrows] = useState<Borrows[]>(borrowsDummy);
  const [returns, setReturns] = useState<Returns[]>(returnsDummy);
  const [showScreenshot, setShowScreenshot] = useState(false);
  const [screenShot, setScreenShot] = useState("");

  const screenShotPreview = (screenshot: string) => {
    console.log("preview");
    return (
      <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/50 flex items-center justify-center">
        <p>Preview</p>
        <button
          className="fixed right-5 top-5 cursor-pointer"
          onClick={() => setShowScreenshot(false)}
        >
          <LiaTimesSolid size={25} />
        </button>
        <img src={screenshot} alt="" className="h-screen"/>
      </div>
    );
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
                <th className="p-2 text-center whitespace-nowrap">Date</th>
                <th className="p-2 text-center whitespace-nowrap">
                  Screenshot
                </th>
                <th className="p-2 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {donations.length !== 0 &&
                donations.map((donation) => (
                  <tr key={donation._id} className="border-b">
                    <td className="p-2 text-center whitespace-nowrap">
                      {donation.donner}
                    </td>
                    <td className="p-2 text-center whitespace-nowrap">
                      {new Date(donation.date).toLocaleString("en-us", {
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
                    <td className="p-2 flex justify-center whitespace-nowrap">
                      <button>
                        <FaTimes color="red" size={25} />
                      </button>
                      <button>
                        <FaCheck color="green" size={25} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pendings;
