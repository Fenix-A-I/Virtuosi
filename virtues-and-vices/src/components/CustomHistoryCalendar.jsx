"use client";

import { useContext, useCallback, memo } from "react";
import {
  format,
  startOfYear,
  endOfYear,
  getDay,
  subDays,
  addWeeks,
} from "date-fns";

import { ThemeContext } from "../App";

const DayDot = memo(({ date, isActive }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="p-[1px]">
      <div
        className={`w-3 h-3 rounded-sm ${
          isActive
            ? theme === "virtues"
              ? "bg-blue-500"
              : "bg-purple-500"
            : "bg-gray-200 dark:bg-gray-700"
        }`}
        aria-label={
          isActive
            ? `Active on ${format(date, "MMM d, yyyy")}`
            : `Inactive on ${format(date, "MMM d, yyyy")}`
        }
      />
    </div>
  );
});

DayDot.displayName = "DayDot";

function YearlyCalendarDots({ dates, year = new Date().getFullYear() }) {
  const startDate = startOfYear(new Date(year, 0, 1));
  const endDate = endOfYear(new Date(year, 0, 1));

  // Ensure the calendar starts on a Sunday
  const calendarStartDate = subDays(startDate, getDay(startDate));

  const activeDates = new Set(dates);

  const isDateActive = useCallback(
    (date) => activeDates.has(format(date, "yyyy-MM-dd")),
    [activeDates],
  );

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weeks = [];
  let currentDate = calendarStartDate;
  while (currentDate <= endDate) {
    weeks.push(currentDate);
    currentDate = addWeeks(currentDate, 1);
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        {year} Contributions
      </h2>
      <div className="flex">
        <div className="pr-2 pt-[13px]">
          {dayNames.map((day, index) => (
            <div
              key={day}
              className="h-3 text-xs text-gray-400 mb-[5px] flex items-center justify-end"
            >
              {day}
            </div>
          ))}
        </div>
        <div>
          <div className="flex mb-1">
            {monthNames.map((month, index) => (
              <div
                key={month}
                style={{ width: `${100 / 12}%` }}
                className="text-center text-xs text-gray-400"
              >
                {month}
              </div>
            ))}
          </div>
          <div className="flex">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col">
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const currentDate = addWeeks(week, 0);
                  currentDate.setDate(week.getDate() + dayIndex);

                  if (currentDate < startDate || currentDate > endDate) {
                    return <div key={dayIndex} className="w-3 h-3" />;
                  }

                  return (
                    <DayDot
                      key={currentDate.toISOString()}
                      date={currentDate}
                      isActive={isDateActive(currentDate)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YearlyCalendarDots;
