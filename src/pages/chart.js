import React, { useState, useEffect } from 'react';
import SimplePieChart from '../conponents/SimplePieChart';
import BarChartComponent from '../conponents/BarChart';

const Chart = () => {
  const [chartData, setChartData] = useState({ completed: 0, pending: 0 });

  useEffect(() => {
    // 从 localStorage 中加载任务数据
    const tasksByDate = JSON.parse(localStorage.getItem('tasksByDate')) || {};
    const completedTasksByDate = JSON.parse(localStorage.getItem('completedTasksByDate')) || {};

    let completedCount = 0;
    let pendingCount = 0;

    // 计算已完成和未完成任务数量
    Object.keys(tasksByDate).forEach(date => {
      tasksByDate[date].forEach((task, index) => {
        const completed = completedTasksByDate[date]?.[index];
        if (completed) {
          completedCount += 1;
        } else {
          pendingCount += 1;
        }
      });
    });

    setChartData({ completed: completedCount, pending: pendingCount });
  }, []);

  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        gap: '20px', 
        border: '2px solid #ddd', 
        padding: '100px', 
        borderRadius: '8px' 
      }}
    >
      <div style={{ flex: 0.3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <SimplePieChart data={chartData} />
      </div>
      <div style={{ flex: 1 }}>
        <h2 style={{ textAlign: 'center' }}>最近十天的任务统计</h2>
        <BarChartComponent />
      </div>
    </div>
  );
};

export default Chart;
