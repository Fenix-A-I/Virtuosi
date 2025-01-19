import React, { useEffect, useRef } from "react";
import anychart from "anychart";

const HabitHistoryCalendar = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    anychart.onDocumentReady(() => {
      anychart.data.loadJsonFile(
        "https://cdn.anychart.com/samples/calendar-chart/github-contributions/data.json",
        (data) => {
          const filteredData = data.filter((item) =>
            item.date.startsWith("2019"),
          );
          const dataset = anychart.data.set(filteredData);
          const mapping = dataset.mapAs({
            x: "date",
            value: "level",
          });

          const chart = anychart.calendar(mapping);

          chart.background("#ff0000");
          let credits = chart.credits;
          chart.months().stroke(false).noDataStroke(false);

          chart
            .days()
            .spacing(5)
            .stroke(false)
            .noDataStroke(false)
            .noDataFill("#2d333b")
            .noDataHatchFill(false);

          chart.colorRange(false);

          const customColorScale = anychart.scales.ordinalColor();
          customColorScale.ranges([
            { equal: 1, color: "#0D4428" },
            { equal: 2, color: "#006D31" },
            { equal: 3, color: "#37AB4B" },
            { equal: 4, color: "#39D353" },
          ]);

          chart.colorScale(customColorScale);

          chart.tooltip().format("{%count} contributions");

          chart.listen("chartDraw", () => {
            if (containerRef.current) {
              containerRef.current.style.height =
                chart.getActualHeight() + "px";
            }
          });

          chart.container(containerRef.current);
          chart.draw();
        },
      );
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "auto", margin: 0, padding: 0 }}
    ></div>
  );
};

export default HabitHistoryCalendar;
