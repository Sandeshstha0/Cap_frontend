import React from 'react';

import BarGraph from '../Dashboard/BarGraph';
import BarData from '@/Data/Bardata';

function generateColor(index: any) {
  const baseColors = ["#f94144", "#f3722c", "#f8961e"];
  const additionalColors = ["#f9c74f", "#43aa8b", "#577590"];
  return index < baseColors.length ? baseColors[index] : additionalColors[index % additionalColors.length];
}

function OverView() {
  return (
    <div className="container bg-white mt-6 rounded-lg p-4 sm:p-10">
      <h1 className="font-semibold text-lg">Overview</h1>

      <div className="flex flex-wrap justify-center">
        {BarData.map((item, index) => (
          <div key={index} className="w-full md:w-1/2 mb-4 p-2 md:p-8 rounded-lg">
            <div className="border-2 rounded-lg shadow-lg">
              <div className="p-4 border-b">
                <p className="font-semibold text-lg">{item.title}</p>
                <h1 className="font-bold text-3xl mt-1">{item. total_Budget}</h1>
              </div>
              <div className="p-3">
                <BarGraph
                  chartData={{
                    labels: item.data.map((data) => data.category),
                    datasets: [
                      {
                        label: "Total Budget",
                        data: item.data.map((data) => data.budget),
                        backgroundColor: item.data.map((data, dataIndex) => generateColor(dataIndex)),
                        borderColor: "black",
                        barThickness: 30,
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OverView;
