import { Route, Routes, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import AddNewBook from "./pages/AdminPages/AddNewBook";
import AdminDashboard from "./pages/AdminPages/Dashboard";
import apiClient from "./services/api-client";
import axios from "axios";
import BookDetail from "./pages/BookDetail";
import Donate from "./pages/UserPages/Donate";
import Donations from "./pages/AdminPages/Donations";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Main from "./components/Main";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./pages/Register";
import Shelf from "./pages/UserPages/Shelf";
import UpdatePassword from "./pages/UpdateProfile";
import UserDashboard from "./pages/UserPages/Dashboard";
import UserDetail from "./pages/AdminPages/UserDetail";
import Users from "./pages/AdminPages/Users";
import ViewMore from "./pages/ViewMore";
import CompleteProfile from "./pages/CompleteProfile";
interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface Book {
  title: string;
  author: string;
  description: string;
  catagory: string;
  publicationYear: number;
  bookCover: FileList;
  totalCopies: number;
  pages: number;
}

interface Student {
  _id: string;
  name: string;
  email: string;
  profileCompleted: boolean;
  isAdmin: boolean;
}

function App() {
  const navigate = useNavigate();

  const [isAuth, setAuth] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [loginError, setLoginError] = useState("");
  const [addBookError, setAddBookError] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [updateProfileError, setUpdateProfileError] = useState("");
  const [profileUpdated, setProfileUpdated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    apiClient
      .get("/students/me", { headers: { "x-auth-token": token } })
      .then((res) => {
        if (res.data) {
          setAuth(true);
          setStudent(res.data);
        }
        if (res.data.isAdmin) setAdmin(true);
      })
      .catch(() => {
        setAuth(false);
        setAdmin(false);
        localStorage.removeItem("token");
      });
  }, [navigate]);

  async function handleRegister(data: RegisterFormData) {
    apiClient
      .post("/students", data)
      .then((res) => {
        const token = res.headers["x-auth-token"];
        localStorage.setItem("token", token);
        navigate("/");
      })
      .catch((error) => setRegistrationError(error.response.data));
  }

  function handleLogin(data: LoginFormData) {
    apiClient
      .post("/auth", data)
      .then((res) => {
        const token = res.data;
        localStorage.setItem("token", token);
        navigate("/");
      })
      .catch((error) => setLoginError(error.response.data));
  }

  function handleAddBook(data: Book) {
    const imageFile = data.bookCover?.[0];
    const imageData = new FormData();
    imageData.append("image", imageFile);
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=82bca9b4b1e6512f2421267af231717d`,
        imageData
      )
      .then((res) => {
        console.log(res.data.data.url);
        const newBook = {
          title: data.title,
          author: data.author,
          description: data.description,
          catagory: data.catagory,
          publicationYear: data.publicationYear,
          bookCover: res.data.data.url,
          totalCopies: data.totalCopies,
        };
        apiClient
          .post("/books", newBook, {
            headers: { "x-auth-token": localStorage.getItem("token") },
          })
          .then(() => navigate("/"))
          .catch((error) => setAddBookError(error.response.data));
      })
      .catch((error) => setAddBookError(error.response.data));
  }

  function handleUpdateProfile(data: {
    email: string;
    currentPassword: string;
    newPassword: string;
  }) {
    const updateProfile = {
      _id: student?._id,
      email: data.email,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    apiClient
      .put("/students/updateStudent", updateProfile, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then(() => {
        setProfileUpdated(true);
        localStorage.removeItem("token");
      })
      .catch((error) => setUpdateProfileError(error.response.data));
  }

  function handleDonation(data: { amount: number; screenshot: FileList }) {
    console.log(data);
  }

  return (
    <>
      {profileUpdated && (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-[#1d293d] p-5 shadow-xl dark:text-white rounded-lg flex flex-col w-md font-sans">
            <h1 className="text-3xl">
              🎉 You've Updated ur Profile Successfully
            </h1>
            <button
              className="py-2 px-2 bg-black rounded-lg text-white font-sans justify-end hover:bg-black/80 cursor-pointer mt-10 mb-3"
              onClick={() => {
                setProfileUpdated(false);
                navigate("/login");
              }}
            >
              Ok
            </button>
          </div>
        </div>
      )}
      <Routes>
        <Route
          path="/login"
          element={
            <Login onLogin={(data) => handleLogin(data)} error={loginError} />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              onRegister={(data) => handleRegister(data)}
              error={registrationError}
            />
          }
        />
        <Route element={<ProtectedRoute isAuth={isAuth} />}>
          <Route path="/" element={<Main>{<Home />}</Main>} />
          <Route path="/shelf" element={<Main>{<Shelf />}</Main>} />
          <Route path="/dashboard" element={<Main>{<UserDashboard />}</Main>} />
          <Route
            path="/donate"
            element={
              <Main>
                {<Donate onSubmit={(data) => handleDonation(data)} />}
              </Main>
            }
          />
          <Route
            path="/bookdetail/:id"
            element={
              <Main>
                <BookDetail isAdmin={student?.isAdmin} />
              </Main>
            }
          />
          <Route
            path="/books/:catagory"
            element={
              <Main>
                <ViewMore />
              </Main>
            }
          />
          {!student?.profileCompleted && (
            <Route
              path="/completeprofile"
              element={
                <Main>
                  <CompleteProfile />
                </Main>
              }
            />
          )}

          {isAdmin && (
            <Route
              path="/addnewbook"
              element={
                <Main>
                  {
                    <AddNewBook
                      onAdd={(data) => handleAddBook(data)}
                      error={addBookError}
                    />
                  }
                </Main>
              }
            />
          )}
          {isAdmin && (
            <Route path="/users" element={<Main>{<Users />}</Main>} />
          )}
          {isAdmin && (
            <Route path="/donations" element={<Main>{<Donations />}</Main>} />
          )}
          {isAdmin && (
            <Route
              path="/admindashboard"
              element={<Main>{<AdminDashboard />}</Main>}
            />
          )}
          {isAdmin && (
            <Route
              path="/userdetail/:id"
              element={<Main>{<UserDetail />}</Main>}
            />
          )}
          <Route
            path="/changepassword"
            element={
              <Main>
                {
                  <UpdatePassword
                    email={student?.email}
                    onUpdate={(data) => handleUpdateProfile(data)}
                    error={updateProfileError}
                  />
                }
              </Main>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
