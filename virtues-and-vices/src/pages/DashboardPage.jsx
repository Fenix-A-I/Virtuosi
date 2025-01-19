import { useContext } from "react";
import { ThemeContext } from "../App";
import HabitTrackingList from "../components/HabitTrackingList";

function DashboardPage() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`w-full ${theme === "virtues" ? "bg-blue-50" : "bg-purple-50"}`}
    >
      <h2 className="text-2xl font-bold mb-4 r">Dashboard</h2>
      <p className="font-bold">
        Welcome to your {theme === "virtues" ? "Virtues" : "Vices"} dashboard!
      </p>
      <HabitTrackingList />
    </div>
  );
}

export default DashboardPage;
