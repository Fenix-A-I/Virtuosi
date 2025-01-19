import { useContext } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "../App";

import { Formik, Form, Field, ErrorMessage } from "formik";

const habitTrackingTypes = ["numerical", "boolean", "time"];

const goalDayRequirements = ["trackonly", "daycount", "weekdays", "streak"];

const goalDaycountPeriods = ["week", "month"];

const goalStreakCheats = ["none", "skips", "freezes"];

const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const MyForm = (props) => {
  console.log(props.theme);
  return (
    <Formik
      key={props.theme}
      initialValues={{
        habitName: "",
        habitType: props.theme === "virtues" ? "virtue" : "vice", // Changed to habitType
        habitDescription: "",
        habitTrackingType: "numerical",
        habitNumericalTarget: null,
        habitTimeTarget: null,
        goalDayRequirement: "trackonly",
        goalDaycountCount: null,
        goalDaycountPeriod: null,
        goalWeekdaysDays: [],
        goalStreakCheat: null,
        goalStreakSkipsDays: null,
        goalStreakFreezesAccumulation: null,
      }}
      onSubmit={(values) => {
        // Handle form submission
        console.log(values);
      }}
    >
      {({ values }) => (
        <Form>
          {/* Habit Name */}
          <div className="font-semibold">
            <label htmlFor="habitName">Habit Name:</label>
            <Field type="text" name="habitName" />
            <ErrorMessage name="habitName" component="div" />
          </div>
          {/* Habit Description */}
          <div className="font-semibold">
            <label htmlFor="habitDescription">Habit Description:</label>
            <Field type="text" name="habitDescription" />
            <ErrorMessage name="habitDescription" component="div" />
          </div>

          {/* Habit Tracking Type - Radio Buttons */}
          <div>
            <label className="font-semibold">Tracking Type:</label>
            <div role="group" aria-labelledby="habitTrackingType">
              {habitTrackingTypes.map((type) => (
                <label key={type}>
                  <p>
                    <Field type="radio" name="habitTrackingType" value={type} />
                    {type}
                  </p>
                </label>
              ))}
            </div>
            <ErrorMessage name="habitTrackingType" component="div" />
          </div>

          {/* Conditional Fields based on Tracking Type */}
          {values.habitTrackingType === "numerical" && (
            <div className="font-semibold">
              <label htmlFor="habitNumericalTarget">Numerical Target:</label>
              <Field type="number" name="habitNumericalTarget" />
              <ErrorMessage name="habitNumericalTarget" component="div" />
            </div>
          )}

          {values.habitTrackingType === "time" && (
            <div className="font-semibold">
              <label htmlFor="habitTimeTarget">
                Time Target (e.g., 8:00pm):
              </label>
              <Field type="text" name="habitTimeTarget" />
              <ErrorMessage name="habitTimeTarget" component="div" />
            </div>
          )}

          {/* Goal Day Requirement - Radio Buttons */}
          <div>
            <label className="font-semibold">Goal Day Requirement:</label>
            <div role="group" aria-labelledby="goalDayRequirement">
              {goalDayRequirements.map((req) => (
                <label key={req}>
                  <p>
                    <Field type="radio" name="goalDayRequirement" value={req} />
                    {req}
                  </p>
                </label>
              ))}
            </div>
            <ErrorMessage name="goalDayRequirement" component="div" />
          </div>

          {/* Conditional Fields based on Goal Day Requirement */}
          {values.goalDayRequirement === "daycount" && (
            <div className="font-semibold">
              <label htmlFor="goalDaycountCount">Day Count:</label>
              <Field type="number" name="goalDaycountCount" />
              <ErrorMessage name="goalDaycountCount" component="div" />

              {/* Goal Day Count Period - Radio Buttons */}
              <div className="font-semibold">
                <label>Period:</label>
                <div role="group" aria-labelledby="goalDaycountPeriod">
                  {goalDaycountPeriods.map((period) => (
                    <label key={period}>
                      <p>
                        <Field
                          type="radio"
                          name="goalDaycountPeriod"
                          value={period}
                        />
                        {period}
                      </p>
                    </label>
                  ))}
                </div>
                <ErrorMessage name="goalDaycountPeriod" component="div" />
              </div>
            </div>
          )}

          {values.goalDayRequirement === "weekdays" && (
            <div>
              <label htmlFor="goalWeekdaysDays">Weekdays:</label>
              {weekdays.map((day) => (
                <div key={day}>
                  <label>
                    <Field
                      type="checkbox"
                      name="goalWeekdaysDays"
                      value={day}
                    />
                    {day}
                  </label>
                </div>
              ))}
              <ErrorMessage name="goalWeekdaysDays" component="div" />
            </div>
          )}

          {values.goalDayRequirement === "streak" && (
            <div>
              {/* Goal Streak Cheat - Radio Buttons */}
              <div>
                <label>Cheat Type:</label>
                <div role="group" aria-labelledby="goalStreakCheat">
                  {goalStreakCheats.map((cheat) => (
                    <label key={cheat}>
                      <p>
                        <Field
                          type="radio"
                          name="goalStreakCheat"
                          value={cheat}
                        />
                        {cheat}
                      </p>
                    </label>
                  ))}
                </div>
                <ErrorMessage name="goalStreakCheat" component="div" />
              </div>

              {values.goalStreakCheat === "skips" && (
                <div>
                  <label htmlFor="goalStreakSkipsDays">Allowed Skips:</label>
                  <Field type="number" name="goalStreakSkipsDays" />
                  <ErrorMessage name="goalStreakSkipsDays" component="div" />
                </div>
              )}

              {values.goalStreakCheat === "freezes" && (
                <div>
                  <label htmlFor="goalStreakFreezesAccumulation">
                    Freeze Accumulation:
                  </label>
                  <Field type="number" name="goalStreakFreezesAccumulation" />
                  <ErrorMessage
                    name="goalStreakFreezesAccumulation"
                    component="div"
                  />
                </div>
              )}
            </div>
          )}

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

MyForm.propTypes = {
  theme: PropTypes.oneOf(["virtues", "habits"]).isRequired,
};

function CreateHabitPage() {
  const { theme } = useContext(ThemeContext);
  console.log("Sending prop theme with value ", theme, "to form");
  return (
    <div className="justify-items-center">
      <h1 className="font-semibold">
        Define your {theme === "virtues" ? "new" : "current"}{" "}
        {theme.substring(0, theme.length - 1)}
        {theme === "virtues" ? "!" : "."}
      </h1>
      <MyForm theme={theme} />
    </div>
  );
}

export default CreateHabitPage;
