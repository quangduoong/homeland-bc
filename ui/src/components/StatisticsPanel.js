import React from "react";

function StatisticsPanel({ header, data }) {
  return (
    <div className="rounded bg-gray-50 w-full">
      <div className="p-2">
        <h2>{header && header}</h2>
        <div className="mt-2 text-lg bg-white rounded p-1">
          {data &&
            data.map((item, index) => {
              return (
                <div key={index}>
                  <div>{item.key}</div>
                  <div className="font-bold text-2xl">{item.value}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default StatisticsPanel;
