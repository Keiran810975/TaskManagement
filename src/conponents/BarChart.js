import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

const BarChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 获取 localStorage 中的数据
    const tasksByDate = JSON.parse(localStorage.getItem('tasksByDate')) || {};
    const completedTasksByDate = JSON.parse(localStorage.getItem('completedTasksByDate')) || {};

    // 统计最近十天的数据
    const lastTenDays = Array.from({ length: 10 }, (_, i) => {
      const date = dayjs().subtract(i, 'day').format('YYYY-MM-DD');
      const totalTasks = tasksByDate[date] ? tasksByDate[date].length : 0;
      const completedTasks = completedTasksByDate[date]
        ? completedTasksByDate[date].filter((task) => task).length
        : 0;
      return { date, totalTasks, completedTasks };
    }).reverse();

    setData(lastTenDays);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="totalTasksGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0093E9" />
            <stop offset="100%" stopColor="#80D0C7" />
          </linearGradient>
          <linearGradient id="completedTasksGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#85FFBD" />
            <stop offset="100%" stopColor="#FFFB7D" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend
          formatter={(value) => {
            switch (value) {
              case 'totalTasks':
                return '当日任务数';
              case 'completedTasks':
                return '完成任务数';
              default:
                return value;
            }
          }}
        />
        <Bar dataKey="totalTasks" fill="url(#totalTasksGradient)" />
        <Bar dataKey="completedTasks" fill="url(#completedTasksGradient)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
