import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import LoginPage from "../pages/LoginPage";
import ToDoList from "../pages/ToDoList";
import RegisterPage from "../pages/RegisterPage";
import ProtectRoute from "../components/protectRoute";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="todolist" element={<ToDoList />}/>
          {/* <Route
            path="todolist"
            element={
              <ProtectRoute>
                <ToDoList />
              </ProtectRoute>
            }
          /> */}
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
