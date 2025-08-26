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
import { useState } from "react";

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
  totalCopies: number;
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
  const [user, setUser] = useState<Student | null>(null);
  const navigate = useNavigate();

  async function saveUserAndRedirect(token: string) {
    localStorage.setItem("token", token);

    const me = await apiClient.get("/students/me", {
      headers: { "x-auth-token": token },
    });

    setUser(me.data);
    navigate("/");
  }

  async function handleRegister(data: RegisterFormData) {
    apiClient
      .post("/students", data)
      .then((res) => {
        const token = res.headers["x-auth-token"];
        saveUserAndRedirect(token);
      })
      .catch((error) => setRegistrationError(error.response.data));
  }

  function handleLogin(data: LoginFormData) {
    apiClient
      .post("/auth", data)
      .then((res) => {
        const token = res.data;
        saveUserAndRedirect(token);
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
      <Route path="/" element={<Main>{<Home />}</Main>} />
      <Route path="/search" element={<Main>{<Search />}</Main>} />
      <Route path="/shelf" element={<Main>{<Shelf />}</Main>} />
      <Route path="/donate" element={<Main>{<Donate />}</Main>} />
      <Route path="/about" element={<Main>{<About />}</Main>} />
      <Route path="/support" element={<Main>{<Support />}</Main>} />
      <Route path="/termsnconditions" element={<Main>{<Policy />}</Main>} />
      <Route
        path="/changepassword"
        element={<Main>{<ChangePassword />}</Main>}
      />

      <Route
        path="addnewbook"
        element={<AddNewBook onAdd={(data) => handleAddBook(data)} />}
      />
    </Routes>
  );
}

export default App;
