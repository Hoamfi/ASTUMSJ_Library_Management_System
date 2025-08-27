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
import ChangePassword from "./pages/ChangePassword";
import apiClient from "./services/api-client";
import { useEffect, useState } from "react";
import BookDetail from "../pages/BookDetail";
import ProtectedRoute from "./ProtectedRoute";
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
  _id: string;
  title: string;
  author: string;
  description: string;
  catagory: string;
  publicationYear: number;
  bookCover: string;
}

interface Student {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

function App() {
  const [registrationError, setRegistrationError] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const [isAuth, setAuth] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    apiClient
      .get("/students/me", { headers: { "x-auth-token": token } })
      .then((res) => {
        if (res.data) setAuth(true);
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
    console.log(data);
  }

  return (
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
        <Route path="/termsnconditions" element={<Main>{<Policy />}</Main>} />)
        {isAdmin && (
          <Route
            path="/addnewbook"
            element={
              <Main>
                {<AddNewBook onAdd={(data) => handleAddBook(data)} />}
              </Main>
            }
          />
        )}
        <Route
          path="/changepassword"
          element={<Main>{<ChangePassword />}</Main>}
        />
        <Route path="/bookdetail/:id" element={<BookDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
