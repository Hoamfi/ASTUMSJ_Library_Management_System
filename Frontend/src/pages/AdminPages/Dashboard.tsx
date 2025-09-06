import { useEffect, useState } from "react";
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
  BarChart,
  Bar,
  Legend,
} from "recharts";
import apiClient from "../../services/api-client";
import logo from "../../assets/logo-with-bg.jpg";
import jsPDF from "jspdf";

const borrowingTrends = [
  { month: "Jan", borrowings: 50 },
  { month: "Feb", borrowings: 75 },
  { month: "Mar", borrowings: 90 },
  { month: "Apr", borrowings: 120 },
  { month: "May", borrowings: 65 },
  { month: "Jun", borrowings: 150 },
];

const topBooks = [
  { title: "1984", borrowed: 120 },
  { title: "The Psychology of money", borrowed: 95 },
  { title: "Sapiens", borrowed: 70 },
  { title: "Atomic Habits", borrowed: 55 },
  { title: "Clean Code", borrowed: 40 },
];

// Colors for pie chart
const COLORS = ["#6366F1", "#22C55E", "#EF4444"];

function StatCard({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="dark:bg-[#1d293d] p-6 rounded-br-2xl rounded-tl-2xl shadow text-center">
      <h4 className="text-gray-500  text-sm">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  // stats
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBorrows, setTotalBorrows] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);

  // books
  const [islamic, setIslamic] = useState(0);
  const [self, setSelf] = useState(0);
  const [bussiness, setBussiness] = useState(0);
  const booksByCategory = [
    { name: "Islamic", value: islamic },
    { name: "Self Helps", value: self },
    { name: "Bussiness", value: bussiness },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { "x-auth-token": token };
    const fetchStats = async () => {
      try {
        const [booksRes, usersRes, borrowsRes, donationsRes] =
          await Promise.all([
            apiClient.get("/books", { headers }),
            apiClient.get("/students/allCount", { headers }),
            apiClient.get("/borrow/admin/allborrows", { headers }),
            apiClient.get("/donations/admin/totaldonations", { headers }),
          ]);

        setTotalBooks(booksRes.data.count);
        setTotalUsers(usersRes.data);
        setTotalBorrows(borrowsRes.data.count);
        setTotalDonations(donationsRes.data.totaldonation);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchBooks = async () => {
      try {
        const [islamic, self, bussiness] = await Promise.all([
          apiClient.get("/books/?catagory=islamic", { headers }),
          apiClient.get("/books/?catagory=self", { headers }),
          apiClient.get("/books/?catagory=bussiness", { headers }),
        ]);

        setIslamic(islamic.data.count);
        setSelf(self.data.count);
        setBussiness(bussiness.data.count);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
    fetchBooks();
  }, []);

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("ASTUMSJ Library Report", 75, 10);
    doc.text(`Total Books: ${totalBooks} `, 60, 20);
    doc.text(`Total Members: ${totalUsers} `, 60, 28);
    doc.text(`Total Donation: ${totalDonations}Birr `, 60, 35);
    doc.text("Books by Catagory:", 60, 42);
    doc.text(`Islamic: ${islamic} `, 65, 50);
    doc.text(`Self Helps: ${self} `, 65, 58);
    doc.text(`Bussiness: ${bussiness} `, 65, 66);

    doc.save("Report.pdf");
  };
  return (
    <div className="flex-1 p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Dashboard Overview</h2>
        <button
          className="bg-black dark:bg-[#1d293d] text-white px-4 py-2 rounded-lg shadow hover:bg-black/80 dark:hover:bg-[#1d293d]/80 cursor-pointer"
          onClick={() => generateReport()}
        >
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Books" value={totalBooks} />
        <StatCard title="Total Members" value={totalUsers} />
        <StatCard title="Total Donation" value={`${totalDonations}` + "Birr"} />
        <StatCard title="Books Borrowed" value={totalBorrows} />
      </div>

      {/* Borrowing Trends Line Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="dark:bg-[#1d293d] p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">📈 Borrowing Trends</h3>
          <ResponsiveContainer
            width="100%"
            height={300}
            className="dark:text-black"
          >
            <LineChart data={borrowingTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip /> {/* for interaction */}
              <Line
                type="monotone"
                dataKey="borrowings"
                stroke="#6366F1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Books By Category Pie Chart */}
        <div className="dark:bg-[#1d293d] p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">📊 Books by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={booksByCategory}
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {booksByCategory.map((_entry, index) => (
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

      {/* ===== Top Books Bar Chart ===== */}
      <div className="dark:bg-[#1d293d] bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4">🏆 Top Borrowed Books</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topBooks}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="borrowed" fill="#22C55E" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
