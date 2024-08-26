import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const createGradient = (canvasCtx, color1, color2) => {
  const gradient = canvasCtx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
};

const SimplePieChart = () => {
  const [data, setData] = useState({ completed: 0, pending: 0 });

  useEffect(() => {
    const tasksByDate = JSON.parse(localStorage.getItem('tasksByDate')) || {};
    const completedTasksByDate = JSON.parse(localStorage.getItem('completedTasksByDate')) || {};

    let completedCount = 0;
    let pendingCount = 0;

    Object.keys(tasksByDate).forEach(date => {
      tasksByDate[date].forEach((task, index) => {
        if (completedTasksByDate[date] && completedTasksByDate[date][index]) {
          completedCount++;
        } else {
          pendingCount++;
        }
      });
    });

    setData({ completed: completedCount, pending: pendingCount });
  }, []);

  const canvasRef = React.useRef(null);

  const chartData = {
    labels: ['已完成', '未完成'],
    datasets: [
      {
        data: [data.completed, data.pending],
        backgroundColor: (ctx) => {
          const canvasCtx = ctx.chart.ctx;
          return [
            createGradient(canvasCtx, '#85FFBD', '#FFFB7D'), // 已完成
            createGradient(canvasCtx, '#0093E9', '#80D0C7'), // 未完成
          ];
        },
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.raw;
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  return (
    <div style={{ width: '300px', height: '300px' }}>
      <h2 style={{ textAlign: 'center' }}>任务完成情况</h2>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default SimplePieChart;
