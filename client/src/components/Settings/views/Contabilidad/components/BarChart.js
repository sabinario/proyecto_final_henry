import React from "react";
import { Chart } from "primereact/chart";

export default function BarChart() {
  const basicData = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
    ],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "#42A5F5",
        data: [65, 59, 80, 81, 56, 55, 40, 75, 56, 35],
      },
      {
        label: "My Second dataset",
        backgroundColor: "#FFA726",
        data: [28, 48, 40, 19, 86, 27, 90, 56, 55, 40],
      },
      {
        label: "My third dataset",
        backgroundColor: "##FFA726",
        data: [28, 48, 40, 19, 86, 27, 90, 89, 89, 46],
      },
    ],
  };

  const getLightTheme = () => {
    let basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: "#FF6344",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };
    return {
      basicOptions,
    };
  };

  let stackedOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      tooltips: {
        mode: "index",
        intersect: false,
      },
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  };

  const { basicOptions } = getLightTheme();

  return (
    <>
      <div className="card">
        <h5>Vertical</h5>
        <Chart type="bar" data={basicData} options={basicOptions} />
      </div>
    </>
  );
}
