import { useContext } from "react";
import Header from "./Header";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../App";

const Layout = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`font-mono ${theme === "virtues" ? "virtues-theme" : "vices-theme"}`}
    >
      <Header />
      <Nav />
      <div
        className={`min-h-screen max-h-screen ${theme === "virtues" ? "bg-blue-50" : "bg-purple-50"}`}
      >
        <div className="grid justify-items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
