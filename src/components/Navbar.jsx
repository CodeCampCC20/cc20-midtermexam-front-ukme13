import { NavLink } from "react-router";
import useAuthStore from "../stores/useAuthStore";

function Navbar() {
  const token = useAuthStore((state) => state.token);
  const setToken = useAuthStore((state) => state.setToken);

  return (
    <nav className="h-14 bg-black/20 flex gap-4 w-full items-center justify-between px-6">
      <div className="">Logo</div>
      <div className="flex gap-4 items-center">
        {token == "" ? (
          <NavLink className="w-fit" to="/">
            Log in
          </NavLink>
        ) : null}
        <NavLink className="w-fit" to="register">
          Register
        </NavLink>
        {/* <NavLink className="w-fit" to="todolist">
          To Do List
        </NavLink> */}
        {token != "" ? (
          <NavLink className="w-fit" to="todolist">
            To Do List
          </NavLink>
        ) : null}
        {token != "" ? (
          <NavLink className="w-fit btn btn-error" to="/" onClick={() => setToken("")}>
            Log Out
          </NavLink>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
