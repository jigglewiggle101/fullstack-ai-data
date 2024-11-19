import React from "react";
import { Bar } from "react-chartjs-2";

const Visualization = ({ data }) => {
  if (!data) {
    return <p>No data to display</p>;
  }

  // Assume data has { x: [], y: [] } format for simplicity
  const chartData = {
    labels: data.x,
    datasets: [
      {
        label: "Results",
        data: data.y,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Visualization</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Visualization;
