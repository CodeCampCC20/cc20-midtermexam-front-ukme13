import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import LoginPage from "../pages/LoginPage";
import ToDoList from "../pages/ToDoList";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";
import MoviePage from "../pages/MoviePage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="todolist" element={<ToDoList />}/>
          </Route>

          {/* <Route path="todolist" element={<ToDoList />}/> */}
          <Route path="movies" element={<MoviePage />}/>
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
