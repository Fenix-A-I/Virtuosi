import HabitHistoryCard from "./HabitHistoryCard";

function HabitTrackingList() {
  const myObject = {
    habitName: "Get Stuff Done",
    habitDescription: "Do that jawn",
    successNum: 45,
    successNumLabel: "days",
    goalDayRequirement: "weekdays",
    goalDaycountCount: 100,
    goalDaycountPeriod: "week",
    goalWeekdaysDays: ["sat", "sun"],
    goalStreakCheat: "none",
  };

  const habits = [myObject, myObject];

  return (
    <div className="">{habits.map((habit) => HabitHistoryCard(habit))}</div>
  );
  // return <HabitHistoryCard {...myObject} />;
}

export default HabitTrackingList;
