import PropTypes from "prop-types";
import { ThemeContext } from "../App";
import { useContext } from "react";

function HabitHistoryCard(props) {
  const { theme } = useContext(ThemeContext);

  let goalDescription;
  switch (props.goalDayRequirement) {
    case "daycount":
      goalDescription = `for ${props.goalDayCount} days every ${props.goalDayCountPeriod}`;
      break;
    case "streak":
      goalDescription = "every day";
    default:
      goalDescription = "";
      break;
  }

  console.log(theme);

  return (
    <div className={`habit-history-card ${theme}-theme max-w-96`}>
      <div className="flex justify-between text-lg">
        <span className="">{props.habitDescription}</span>
        <span>{props.successNum}</span>
      </div>
      <h3>{props.habitName}</h3>
      <p>
        {props.habitDescription} {goalDescription}
      </p>
    </div>
  );
}

HabitHistoryCard.propTypes = {
  habitDescription: PropTypes.string.isRequired,
  successNum: PropTypes.number.isRequired,
  habitName: PropTypes.string.isRequired,
  goalDayRequirement: PropTypes.string.isRequired,
  goalDayCount: PropTypes.number,
  goalDayCountPeriod: PropTypes.string,
};

export default HabitHistoryCard;
