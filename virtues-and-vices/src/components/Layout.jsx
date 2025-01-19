import { useContext } from "react";
import Header from "./Header";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../App";

const Layout = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`w-full font-mono ${theme === "virtues" ? "virtues-theme" : "vices-theme"}`}
    >
      <Header />
      <Nav />
      <div
        className={`m-0 min-h-screen max-h-screen ${theme === "virtues" ? "bg-blue-50" : "bg-purple-50"}`}
      >
        <div className="px-[10%] w-full min-w-screen grid justify-items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
