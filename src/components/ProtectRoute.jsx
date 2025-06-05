import { BrowserRouter, Navigate, Route } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";


const ProtectRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  let isAuthen = false;
  if (token == "") isAuthen = false;
  else isAuthen = true;
  return isAuthen ? children : <Navigate to="todolist" />;
};

export default ProtectRoute;
