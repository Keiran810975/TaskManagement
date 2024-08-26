import * as React from 'react';
import Box from '@mui/material/Box';
import ListDividers from './singleList';

export default function MultiDayToDoList() {
  // 生成未来 30 天的日期
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toLocaleDateString();
  });

  const handleWheel = (event) => {
    event.preventDefault(); // 阻止默认的垂直滚动行为
    const container = event.currentTarget;
    container.scrollLeft += event.deltaY; // 根据滚轮的垂直滚动值来水平滚动
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '500px', // 固定高度
        overflowX: 'auto', // 添加水平滚动条
        display: 'flex', // 水平排列
        flexWrap: 'nowrap', // 不换行，超出部分会产生滚动条
        border: '1px solid #ccc', // 边框
        padding: 2,
        boxSizing: 'border-box',
      }}
      onWheel={handleWheel} // 添加滚轮事件处理器
    >
      {dates.map((date, index) => (
        <Box key={index} sx={{ flex: '0 0 auto', marginRight: 2 }}>
          <ListDividers date={date} />
        </Box>
      ))}
    </Box>
  );
}
