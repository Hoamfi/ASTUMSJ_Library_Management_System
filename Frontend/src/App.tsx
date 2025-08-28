import { Route, Routes, useNavigate } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddNewBook from "./pages/AddNewBook";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Search from "./pages/Search";
import Shelf from "./pages/Shelf";
import Donate from "./pages/Donate";
import Policy from "./pages/Policy";
import About from "./pages/About";
import Support from "./pages/Support";
import apiClient from "./services/api-client";
import { useEffect, useState } from "react";
import BookDetail from "../pages/BookDetail";
import ProtectedRoute from "./ProtectedRoute";
import axios from "axios";
import UpdatePassword from "./pages/UpdateProfile";
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
}

interface Student {
  _id: string;
  name: string;
  email: string;
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
    // console.log(data)
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

  return (
    <>
      {profileUpdated && (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-5 shadow-xl rounded-lg flex flex-col w-md font-sans">
            <h1 className="text-3xl">🎉 You've Updated ur Profile Successfully</h1>
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
          <Route path="/search" element={<Main>{<Search />}</Main>} />
          <Route path="/shelf" element={<Main>{<Shelf />}</Main>} />
          <Route path="/donate" element={<Main>{<Donate />}</Main>} />
          <Route path="/about" element={<Main>{<About />}</Main>} />
          <Route path="/support" element={<Main>{<Support />}</Main>} />
          (
          <Route path="/termsnconditions" element={<Main>{<Policy />}</Main>} />
          )
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
          <Route path="/bookdetail/:id" element={<BookDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
