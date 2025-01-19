import HabitHistoryCard from "./HabitHistoryCard";

function HabitTrackingList() {
  const myObject = {
    habitName: "Get Stuff Done",
    habitDescription: "Do that jawn",
    successNum: 45,
    goalDayRequirement: "daycount",
    goalDayCount: 100,
    goalDayCountPeriod: "week",
  };

  return <HabitHistoryCard {...myObject} />;
}

export default HabitTrackingList;
