import { Navigate, Outlet } from "react-router-dom";

interface Props {
  isAuth: boolean;
}

function ProtectedRoute({ isAuth }: Props) {
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
