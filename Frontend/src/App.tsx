import { Route, Routes, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import AddNewBook from "./pages/AdminPages/AddNewBook";
import AdminDashboard from "./pages/AdminPages/Dashboard";
import apiClient from "./services/api-client";
import BookDetail from "./pages/BookDetail";
import Donate from "./pages/UserPages/Donate";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Main from "./components/Main";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./pages/Register";
import Shelf from "./pages/UserPages/Shelf";
import UserDashboard from "./pages/UserPages/Dashboard";
import UserDetail from "./pages/AdminPages/UserDetail";
import Users from "./pages/AdminPages/Users";
import ViewMore from "./pages/ViewMore";
import CompleteProfile from "./pages/CompleteProfile";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import ChangePassword from "./pages/ChangePassword";
import Pendings from "./pages/AdminPages/Pendings";

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  profileCompleted: boolean;
  status: string;
  isAdmin: boolean;
}

function App() {
  const navigate = useNavigate();

  const [isAuth, setAuth] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [emailToVerify, setEmailToVerify] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    apiClient
      .get("/students/me", { headers: { "x-auth-token": token } })
      .then((res) => {
        setAuth(true);
        setUser(res.data);
        setAdmin(res.data.isAdmin);
        setLoading(false);
      })
      .catch(() => {
        setAuth(false);
        setAdmin(false);
        localStorage.removeItem("token");
        setLoading(false);
      });
  }, [navigate]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/forgetpassword"
        element={
          <ForgetPassword resetEmail={(email) => setResetEmail(email)} />
        }
      />

      <Route
        path="/register"
        element={
          <Register emailToVerify={(email) => setEmailToVerify(email)} />
        }
      />
      <Route
        path="/resetpassword"
        element={<ResetPassword email={resetEmail} />}
      />
      <Route
        path="/verifyemail"
        element={<VerifyEmail email={emailToVerify} />}
      />
      <Route element={<ProtectedRoute isAuth={isAuth} />}>
        <Route path="/" element={<Main>{<Home />}</Main>} />
        <Route path="/shelf" element={<Main>{<Shelf />}</Main>} />
        <Route
          path="/dashboard"
          element={
            <Main>
              {
                <UserDashboard
                  name={user?.name}
                  memberSince={user?.createdAt}
                />
              }
            </Main>
          }
        />
        <Route
          path="/donate"
          element={<Main>{<Donate id={user?._id} />}</Main>}
        />
        <Route
          path="/bookdetail/:id"
          element={
            <Main>
              <BookDetail
                isAdmin={user?.isAdmin}
                profileCompleted={user?.profileCompleted}
                status={user?.status}
                userId={user?._id}
              />
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
        <Route
          path="/changepassword"
          element={
            <Main>{<ChangePassword id={user?._id} email={user?.email} />}</Main>
          }
        />
        {!user?.profileCompleted && (
          <Route
            path="/completeprofile"
            element={
              <Main>
                <CompleteProfile />
              </Main>
            }
          />
        )}

        {/* Admin  pages*/}
        {isAdmin && (
          <Route path="/addnewbook" element={<Main>{<AddNewBook />}</Main>} />
        )}
        {isAdmin && <Route path="/users" element={<Main>{<Users />}</Main>} />}
        {isAdmin && (
          <Route path="/donations" element={<Main>{<Pendings />}</Main>} />
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
      </Route>
    </Routes>
  );
}

export default App;
