import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const user = {
  name: "Ammar Sabit",
  memberSince: "2023-08-12",
  borrowedBooks: [
    { title: "Riyad as-Salihin", dueDate: "2025-09-05", status: "Borrowed" },
    { title: "The Psychology of money", dueDate: "2025-08-25", status: "Overdue" },
    { title: "Atomic Habits", dueDate: "2025-09-10", status: "Borrowed" },
  ],
};

const borrowingHistory = [
  { month: "Jan", books: 2 },
  { month: "Feb", books: 1 },
  { month: "Mar", books: 3 },
  { month: "Apr", books: 1 },
  { month: "May", books: 4 },
  { month: "Jun", books: 2 },
];

const borrowedCategories = [
  { name: "Islamic", value: 6 },
  { name: "Self Help", value: 3 },
  { name: "Bussiness", value: 2 },
];

const COLORS = ["#6366F1", "#22C55E", "#F59E0B"];

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-black">
            Welcome, {user.name}
          </h1>
          <p className="text-gray-600">
            Member since{" "}
            <span className="font-semibold">{user.memberSince}</span>
          </p>
        </div>
        <Link to="/">
          <button className="bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-black/80 cursor-pointer">
            Browse Books
          </button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
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
            {user.borrowedBooks.map((book, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="p-2">{book.title}</td>
                <td className="p-2">{book.dueDate}</td>
                <td
                  className={`p-2 font-semibold ${
                    book.status === "Overdue"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {book.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Borrowing History Line Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">📈 Borrowing History</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={borrowingHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="books"
                stroke="#6366F1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Borrowed Categories Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">
            📊 Borrowed by Category
          </h3>
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
        </div>
      </div>
    </div>
  );
}
