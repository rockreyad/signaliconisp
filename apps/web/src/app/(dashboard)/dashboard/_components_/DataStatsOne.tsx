import React from "react";
import { dataStats } from "@/types/dataStats";

const dataStatsList = [
  {
    icon: <div>Icon</div>,
    color: "#3FD97F",
    title: "Status",
    value: "Active",
  },
  {
    icon: <div>Icon</div>,
    color: "#3FD97F",
    title: "Package",
    value: "PLUS 20",
  },
  {
    icon: <div>Icon</div>,
    color: "#3FD97F",
    title: "Speed",
    value: "100 Mbps",
  },
  {
    icon: <div>Icon</div>,
    color: "#3FD97F",
    title: "Last Payment",
    value: "January",
  },
];

export const DataStatsOne = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {dataStatsList.map((item, index) => (
        <div
          key={index}
          className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
        >
          <div
            className="flex h-14.5 w-14.5 items-center justify-center rounded-full"
            style={{ backgroundColor: item.color }}
          >
            {item.icon}
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
                {item.value}
              </h4>
              <span className="text-body-sm font-medium">{item.title}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
