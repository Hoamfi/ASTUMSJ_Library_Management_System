import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import apiClient from "../../services/api-client";

interface Props {
  name?: string;
  memberSince?: Date;
}

interface Borrow {
  book: {
    _id: string;
    title: string;
  };
  dueDate: Date;
  status: string;
}

const COLORS = ["#6366F1", "#22C55E", "#F59E0B"];

export default function UserDashboard({ name, memberSince }: Props) {
  const [borrowedBooks, setBorrowedBooks] = useState<Borrow[]>([]);
  const [borrowedCategories, setBorrowedCategories] = useState([
    { name: "Islamic", value: 0 },
    { name: "Self Help", value: 0 },
    { name: "Business", value: 0 },
  ]);

  useEffect(() => {
    apiClient
      .get("/borrow/myborrows", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        const books = res.data;

        // filter only returned or borrowed
        const validBooks = books.filter(
          (b: any) => b.status === "Returned" || b.status === "Borrowed"
        );

        // count by category
        const categoryCount: Record<string, number> = {};
        validBooks.forEach((b: any) => {
          const cat = b.book?.catagory?.toLowerCase();
          if (cat) {
            categoryCount[cat] = (categoryCount[cat] || 0) + 1;
          }
        });

        // map to borrowedCategories state
        const updated = [
          { name: "Islamic", value: categoryCount["islamic"] || 0 },
          { name: "Self Help", value: categoryCount["self"] || 0 },
          { name: "Business", value: categoryCount["business"] || 0 },
        ];

        setBorrowedCategories(updated);
        setBorrowedBooks(books);
      })
      .catch((error) => console.log(error.response?.data));
  }, []);

  return (
    <div className="min-h-screen p-8 space-y-8">
      <div className="bg-white dark:bg-[#1d293d] p-6 rounded-2xl shadow flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {name}</h1>
          {memberSince && (
            <p className="text-gray-600">
              Member since{" "}
              <span className="font-semibold">
                {new Date(memberSince).toLocaleString("en-us", {
                  dateStyle: "medium",
                })}
              </span>
            </p>
          )}
        </div>
        <Link to="/">
          <button className="bg-black dark:bg-gray-900 text-white px-4 py-2 rounded-lg shadow hover:bg-black/80 dark:hover:bg-black/90 cursor-pointer">
            Browse Books
          </button>
        </Link>
      </div>

      <div className="bg-white dark:bg-[#1d293d] p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">📚 Your Borrowed Books</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="p-2">Title</th>
              <th className="p-2">Due Date</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((borrowed: Borrow) => (
              <tr key={borrowed.book._id} className="border-b">
                <td className="p-2">{borrowed.book.title}</td>
                <td className="p-2">
                  {new Date(borrowed.dueDate).toLocaleString("en-us", {
                    dateStyle: "medium",
                  })}
                </td>
                <td
                  className={`p-2 font-semibold ${
                    borrowed.status === "overdue"
                      ? "text-red-600"
                      : borrowed.status === "borrowed"
                        ? "text-green-600"
                        : "text-blue-500"
                  }`}
                >
                  {borrowed.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Borrowing History Line Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Borrowed Categories Pie Chart */}
        <div className="bg-white dark:bg-[#1d293d] p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">
            📊 Borrowed by Category
          </h3>
          {borrowedCategories[0].value === 0 &&
          borrowedCategories[1].value === 0 &&
          borrowedCategories[2].value === 0 ? (
            <p>No borrow record</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={borrowedCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {borrowedCategories.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
