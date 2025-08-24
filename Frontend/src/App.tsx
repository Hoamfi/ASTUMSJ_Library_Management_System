import { Route, Routes } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddNewBook from "./pages/AddNewBook";

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
  publicationYear: string;
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
    console.log(data)
  }

  return (
    // <div>
    //   <Register onRegister={(data) => handleCreateAccount(data)} />
    //   <Login onLogin={(data) => handleLogin(data)}/>
    // </div>
    <Routes>
      <Route
        path="/login"
        element={<Login onLogin={(data) => handleLogin(data)} />}
      />
      <Route
        path="/register"
        element={<Register onRegister={(data) => handleRegister(data)} />}
      />
      <Route path="addnewbook" element={<AddNewBook onAdd={(data) => handleAddBook(data)}/>} />
    </Routes>
  );
}

export default App;
