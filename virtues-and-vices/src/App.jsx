import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useContext, useState } from "react";

/* Pages */
import CreateHabitPage from "./pages/CreateHabitPage";
import DashboardPage from "./pages/DashboardPage";
import Layout from "./components/Layout.jsx";

/* Theme */
export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("virtues");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "virtues" ? "vices" : "virtues"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Routes() {
  return createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <DashboardPage />,
        },
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
        {
          path: "/create-habit",
          element: <CreateHabitPage />,
        },
      ],
    },
  ]);
}

function App() {
  const router = Routes();

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
