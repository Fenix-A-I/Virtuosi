import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../App";

const Nav = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <nav
      className={`p-4 ${theme === "virtues" ? "bg-blue-100" : "bg-purple-100"}`}
    >
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${isActive ? "font-bold" : ""} hover:underline`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/create-habit"
            className={({ isActive }) =>
              `${isActive ? "font-bold" : ""} hover:underline`
            }
          >
            Add a Habit
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
