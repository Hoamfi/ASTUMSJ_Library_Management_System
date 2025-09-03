import { useEffect, useState } from "react";
import { Link } from "react-router";
import { IoSearch } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { LuArrowDownUp } from "react-icons/lu";
import apiClient from "../../services/api-client";

export interface Student {
  _id: string;
  name: string;
  email: string;
  status: string;
}

const Users = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    setLoading(true);
    if (!query.trim()) {
      apiClient
        .get(`/students/all?&sortBy=${sortBy}`, {
          headers: { "x-auth-token": localStorage.getItem("token") },
        })
        .then((response) => {
          setStudents(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching book details:", error);
          setLoading(false);
        });
      return;
    }

    const delayDebouce = setTimeout(() => {
      apiClient
        .get(`/students/search?q=${query}&sortBy=${sortBy}`, {
          headers: { "x-auth-token": localStorage.getItem("token") },
        })
        .then((res) => {
          setStudents(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }, 500);

    return () => clearTimeout(delayDebouce);
  }, [query]);

  useEffect(() => {
    if (!sortBy) return;

    setStudents((prev) => {
      const sorted = [...prev].sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "revname") return b.name.localeCompare(a.name);
        if (sortBy === "email") return a.email.localeCompare(b.email);
        if (sortBy === "revemail") return b.email.localeCompare(a.name);
        if (sortBy === "status") return a.status.localeCompare(b.status);
        if (sortBy === "revstatus") return b.status.localeCompare(a.status);
        return 0;
      });
      return sorted;
    });
  }, [sortBy]);

  return (
    <div className="bg-white dark:bg-[#1d293d] p-6 m-5 rounded-2xl shadow">
      <div className="flex mt-2 mb-5 justify-between flex-col md:flex-row">
        <h2 className="text-[2rem] font-semibold self-center">Current Users</h2>
        <div className="px-3 py-1 rounded-3xl flex items-center gap-2 border-2 border-gray-200 focus-within:border-4 focus-within:border-blue-400 bg-white dark:bg-gray-900 dark:border-0 shadow">
          <IoSearch size={25} />
          <input
            type="text"
            className="w-full outline-0"
            placeholder="Search for Student"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button onClick={() => setQuery("")} className="cursor-pointer">
              <FaTimes />
            </button>
          )}
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-[50vh]">
          <p className="text-lg text-gray-500 animate-pulse">
            Fetching list of students...
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {students.length !== 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-600 dark:text-gray-300 border-b">
                  <th className="p-2">
                    <span>
                      Name
                      <LuArrowDownUp
                        className="inline ml-1 cursor-pointer"
                        onClick={() => {
                          sortBy !== "name"
                            ? setSortBy("name")
                            : setSortBy("revname");
                        }}
                      />
                    </span>
                  </th>
                  <th className="p-2">
                    <span>
                      Email
                      <LuArrowDownUp
                        className="inline ml-1 cursor-pointer"
                        onClick={() => {
                          sortBy !== "email"
                            ? setSortBy("email")
                            : setSortBy("revemail");
                        }}
                      />
                    </span>
                  </th>
                  <th className="p-2">
                    <span>
                      Status
                      <LuArrowDownUp
                        className="inline ml-1 cursor-pointer"
                        onClick={() => {
                          sortBy !== "status"
                            ? setSortBy("status")
                            : setSortBy("revstatus");
                        }}
                      />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="border-b">
                    <td className="p-5 hover:opacity-70">
                      {
                        <Link to={"studentdetail/" + student._id}>
                          {student.name}
                        </Link>
                      }
                    </td>

                    <td className="p-5 text-blue-500 dark:text-blue-400">
                      {student.email}
                    </td>
                    <td
                      className={`p-2 font-semibold ${
                        student.status === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {student.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="self-center text-gray-400">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
