import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ResizeIcon from '@mui/icons-material/DragHandle';
import Typography from '@mui/material/Typography';

const DEFAULT_HEIGHT = 50; // 默认高度
const MAX_HEIGHT = 200; // 最大高度
const colors = ['#F9F4F5', '#C8B8DB', '#B9D6F2' , '#A6ECE0' , '#7ADFBB']; // 循环的背景颜色

const style = {
  p: 0,
  width: '100%',
  maxWidth: 240, // 调整列表宽度
  borderRadius: 2, 
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  position: 'relative',
  overflow: 'hidden', // 确保背景色不会溢出边框
};

export default function ListDividers({ date }) {
  const [items, setItems] = React.useState([]); // 初始状态下列表为空
  const [newItem, setNewItem] = React.useState('');
  const [heights, setHeights] = React.useState([]); // 保存每个元素的高度
  const [completed, setCompleted] = React.useState([]); // 保存每个元素是否完成

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem]);
      setHeights([...heights, DEFAULT_HEIGHT]); // 设置默认高度为50px
      setCompleted([...completed, false]); // 设置初始状态为未完成
      setNewItem('');
    }
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
    setHeights(heights.filter((_, i) => i !== index)); // 删除相应的高度
    setCompleted(completed.filter((_, i) => i !== index)); // 删除相应的完成状态
  };

  const handleMouseDown = (index) => (e) => {
    const startY = e.clientY;
    const startHeight = heights[index];

    const handleMouseMove = (moveEvent) => {
      const newHeight = startHeight + (moveEvent.clientY - startY);
      const clampedHeight = Math.max(DEFAULT_HEIGHT, Math.min(newHeight, MAX_HEIGHT));
      setHeights(heights.map((h, i) => (i === index ? clampedHeight : h)));
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleDoubleClick = (index) => {
    setCompleted(completed.map((c, i) => (i === index ? !c : c))); // 切换完成状态
  };

  return (
    <Box sx={{ maxWidth: 240 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {date}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          variant="outlined"
          size="small"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="新的任务"
        />
        <Button 
          variant="contained" 
          onClick={handleAddItem} 
          sx={{ 
            fontStyle: 'bold', 
            backgroundColor: '#d5cabd',
            '&:hover': {
              backgroundColor: '#bea6a0', // 鼠标悬停时的颜色
            }
          }}
        >
          添加
        </Button>
      </Box>
      <List sx={style} aria-label="mailbox folders">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem
              sx={{ 
                height: `${heights[index]}px`, 
                position: 'relative',
                backgroundColor: completed[index] ? '#d3d3d3' : colors[index % colors.length], // 双击后变成灰色
                overflow: 'hidden', // 确保背景色不会溢出边框 
              }} 
              onDoubleClick={() => handleDoubleClick(index)} // 双击事件
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 0,
                  transform: 'translateY(-50%)',
                }}
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteItem(index)}
              >
                <DeleteIcon />
              </IconButton>
              <ListItemText 
                primary={item} 
                sx={{ 
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  height: '100%',
                  textDecoration: completed[index] ? 'line-through' : 'none', // 删除线
                  textDecorationThickness: '2px', // 删除线粗细
                  textShadow: completed[index] ? '1px 0 currentColor' : 'none', // 模拟更粗的删除线
                }} 
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  cursor: 'ns-resize', // 鼠标样式
                }}
                onMouseDown={handleMouseDown(index)}
              >
                <ResizeIcon />
              </IconButton>
            </ListItem>
            {index < items.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
