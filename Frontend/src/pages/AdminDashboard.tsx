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

const stats = {
  totalBooks: 1200,
  totalMembers: 340,
  booksBorrowed: 220,
  overdueBooks: 35,
};

const borrowingTrends = [
  { month: "Jan", borrowings: 50 },
  { month: "Feb", borrowings: 75 },
  { month: "Mar", borrowings: 90 },
  { month: "Apr", borrowings: 120 },
  { month: "May", borrowings: 65 },
  { month: "Jun", borrowings: 150 },
];

const booksByCategory = [
  { name: "Islamic", value: 400 },
  { name: "Self Helps", value: 300 },
  { name: "Bussiness", value: 200 },
];

const topBooks = [
  { title: "1984", borrowed: 120 },
  { title: "Harry Potter", borrowed: 95 },
  { title: "Sapiens", borrowed: 70 },
  { title: "Atomic Habits", borrowed: 55 },
  { title: "Clean Code", borrowed: 40 },
];

// Colors for pie chart
const COLORS = ["#6366F1", "#22C55E", "#EF4444"];

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-6 rounded-br-2xl rounded-tl-2xl shadow text-center">
      <h4 className="text-gray-500 text-sm">{title}</h4>
      <p className="text-2xl font-bold text-black">{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="flex-1 p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Dashboard Overview</h2>
        <button className="bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-black/80 cursor-pointer">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Books" value={stats.totalBooks} />
        <StatCard title="Total Members" value={stats.totalMembers} />
        <StatCard title="Books Borrowed" value={stats.booksBorrowed} />
        <StatCard title="Overdue Books" value={stats.overdueBooks} />
      </div>

      {/* Borrowing Trends Line Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">📈 Borrowing Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
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
        <div className="bg-white p-6 rounded-2xl shadow">
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
      <div className="bg-white p-6 rounded-2xl shadow">
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
