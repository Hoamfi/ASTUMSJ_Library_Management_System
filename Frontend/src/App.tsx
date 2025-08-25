import { Route, Routes } from "react-router";
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

function App() {
  function handleRegister(data: RegisterFormData) {
    console.log(data);
  }

  function handleLogin(data: LoginFormData) {
    console.log(data);
  }

  function handleAddBook(data: Book) {
    console.log(data);
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login onLogin={(data) => handleLogin(data)} />}
      />
      <Route
        path="/register"
        element={<Register onRegister={(data) => handleRegister(data)} />}
      />
      <Route path="/" element={<Main>{<Home />}</Main>} />
      <Route path="/search" element={<Main>{<Search />}</Main>} />
      <Route path="/shelf" element={<Main>{<Shelf />}</Main>} />
      <Route path="/donate" element={<Main>{<Donate />}</Main>} />
      <Route path="/about" element={<Main>{<About />}</Main>} />
      <Route path="/support" element={<Main>{<Support />}</Main>} />
      <Route path="/termsnconditions" element={<Main>{<Policy />}</Main>} />
      <Route path="/changepassword" element={<Main>{<ChangePassword />}</Main>} />

      <Route
        path="addnewbook"
        element={<AddNewBook onAdd={(data) => handleAddBook(data)} />}
      />
    </Routes>
  );
}

export default App;
