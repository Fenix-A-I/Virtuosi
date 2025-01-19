import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <header className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">
        <span className="text-blue-700">Virtues</span> and{" "}
        <span className="text-purple-700">Vices</span>
      </h1>
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            theme === "virtues"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => theme !== "virtues" && toggleTheme()}
        >
          Virtues
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            theme === "vices"
              ? "bg-purple-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => theme !== "vices" && toggleTheme()}
        >
          Vices
        </button>
      </div>
    </header>
  );
};

export default Header;
