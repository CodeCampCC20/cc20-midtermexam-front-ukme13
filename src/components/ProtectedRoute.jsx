import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);

  const isAuthenticated = !!token;

  if (isAuthenticated === false) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
