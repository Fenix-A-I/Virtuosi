import { useContext } from "react";
import Header from "./Header";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../App";

const Layout = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme === "virtues" ? "virtues-theme" : "vices-theme"}`}>
      <Header />
      <Nav />
      <div className="app-layout">
        <Outlet className="flex-col" />
      </div>
    </div>
  );
};

export default Layout;
