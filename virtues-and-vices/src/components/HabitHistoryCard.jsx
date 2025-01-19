import PropTypes from "prop-types";
import { ThemeContext } from "../App";
import { useContext } from "react";
import HabitHistoryCalendar from "./HabitHistoryCalendar";
import YearlyCalendarDots from "./CustomHistoryCalendar";

function generateGoalDescription(props) {
  const formatList = (list) => {
    const compareArrays = (arr1, arr2) => {
      return (
        arr1.length === arr2.length &&
        arr1.every((value, index) => value === arr2[index])
      );
    };
    const formattedList = list.map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    });

    if (formattedList.length == 7) {
      return "every day";
    }

    if (compareArrays(formattedList, ["Mon", "Tue", "Wed", "Thu", "Fri"])) {
      return "every weekday";
    }

    if (compareArrays(formattedList, ["Sat", "Sun"])) {
      return "every weekend";
    }

    return `every ${formattedList.join(", ")}`;
  };

  switch (props.goalDayRequirement) {
    case "daycount":
      return `for ${props.goalDaycountCount} days each ${props.goalDaycountPeriod}`;
    case "weekdays":
      return formatList(props.goalWeekdaysDays);
    case "streak":
      return (
        "every day" +
        (props.goalStreakCheat === "freezes"
          ? " (with freezes)"
          : props.goalStreakCheat === "skips"
            ? " (with skips)"
            : "")
      );
    default:
      return "";
  }
}

function HabitHistoryCard(props) {
  const { theme } = useContext(ThemeContext);

  const goalDescription = generateGoalDescription(props);

  console.log(theme);

  const activeDates = [
    "2024-01-01",
    "2024-01-15",
    "2024-02-14",
    "2024-03-17",
    "2024-04-22",
    "2024-05-01",
    "2024-06-21",
    "2024-07-04",
    "2024-08-15",
    "2024-09-22",
    "2024-10-31",
    "2024-11-11",
    "2024-12-25",
  ];

  return (
    <div className={`theme-card-color rounded-md ${theme}-theme p11 m-2`}>
      <div className="flex justify-between text-lg">
        <span>
          <h3 className="font-bold text-lg">{props.habitName}</h3>
          <p>{goalDescription}</p>
        </span>
        <span className="text-right">
          <p className="font-bold text-xl">{props.successNum}</p>
          <p>{props.successNumLabel}</p>
        </span>
      </div>
      <div className="w-full max-w-7xl overflow-x-auto">
        <YearlyCalendarDots dates={activeDates} year={2024} />
      </div>
    </div>
  );
}

HabitHistoryCard.propTypes = {
  habitDescription: PropTypes.string.isRequired,
  successNum: PropTypes.number.isRequired,
  successNumLabel: PropTypes.string.isRequired,
  habitName: PropTypes.string.isRequired,
  goalDayRequirement: PropTypes.string.isRequired,
  goalDayCount: PropTypes.number,
  goalDayCountPeriod: PropTypes.string,
  goalStrakCheat: PropTypes.string,
};

export default HabitHistoryCard;
