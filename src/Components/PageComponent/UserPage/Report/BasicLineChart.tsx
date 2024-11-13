import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart'; // Ensure correct import

export default function BasicLineChart() {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]} // Correctly defined xAxis
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5], // Correctly defined series data
        },
      ]}
      width={500} // Correctly defined width
      height={300} // Correctly defined height
    />
  );
}
