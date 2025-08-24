import { Route, Routes } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

function App() {
  function handleRegister(data: RegisterFormData) {
    console.log(data);
  }

  function handleLogin(data: LoginFormData) {
    console.log(data)
  }

  return (
    // <div>
    //   <Register onRegister={(data) => handleCreateAccount(data)} />
    //   <Login onLogin={(data) => handleLogin(data)}/>
    // </div>
    <Routes>
      <Route path="/login" element={<Login onLogin={(data) => handleLogin(data)}/>}/>
      <Route path="/register" element={<Register onRegister={(data) => handleRegister(data)}/>}/>
        <Route path="addNewBook" element/>
    </Routes>
  );
}

export default App;
