import React, { useState, useRef, useEffect } from 'react';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import dayjs from 'dayjs';

function TaskManager() {
  const [tasksByDate, setTasksByDate] = useState(() => {
    const savedTasks = localStorage.getItem('tasksByDate');
    return savedTasks ? JSON.parse(savedTasks) : {};
  });
  
  const [newTask, setNewTask] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [taskWidthsByDate, setTaskWidthsByDate] = useState(() => {
    const savedWidths = localStorage.getItem('taskWidthsByDate');
    return savedWidths ? JSON.parse(savedWidths) : {};
  });
  const [minWidthsByDate, setMinWidthsByDate] = useState({});
  const [completedTasksByDate, setCompletedTasksByDate] = useState(() => {
    const savedCompleted = localStorage.getItem('completedTasksByDate');
    return savedCompleted ? JSON.parse(savedCompleted) : {};
  });
  const containerRef = useRef(null);
  
  useEffect(() => {
    const today = dayjs();
    setSelectedDate(today);
    const formattedDate = today.format('YYYY-MM-DD');
    if (!tasksByDate[formattedDate]) {
      setTasksByDate(prevTasks => ({ ...prevTasks, [formattedDate]: [] }));
      setTaskWidthsByDate(prevWidths => ({ ...prevWidths, [formattedDate]: [] }));
      setMinWidthsByDate(prevMinWidths => ({ ...prevMinWidths, [formattedDate]: [] }));
      setCompletedTasksByDate(prevCompleted => ({ ...prevCompleted, [formattedDate]: [] }));
    }
  }, [tasksByDate]);
  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const formattedDate = selectedDate?.format('YYYY-MM-DD');
      if (!tasksByDate[formattedDate]) {
        setTasksByDate({ ...tasksByDate, [formattedDate]: [] });
        setTaskWidthsByDate({ ...taskWidthsByDate, [formattedDate]: [] });
        setMinWidthsByDate({ ...minWidthsByDate, [formattedDate]: [] });
        setCompletedTasksByDate({ ...completedTasksByDate, [formattedDate]: [] });
      }
      setTasksByDate((prevTasks) => {
        const updatedTasks = {
          ...prevTasks,
          [formattedDate]: [...prevTasks[formattedDate], newTask]
        };
        localStorage.setItem('tasksByDate', JSON.stringify(updatedTasks));
        return updatedTasks;
      });
      setTaskWidthsByDate((prevWidths) => {
        const updatedWidths = {
          ...prevWidths,
          [formattedDate]: [...prevWidths[formattedDate], 200]
        };
        localStorage.setItem('taskWidthsByDate', JSON.stringify(updatedWidths));
        return updatedWidths;
      });
      setMinWidthsByDate((prevMinWidths) => {
        const updatedMinWidths = {
          ...prevMinWidths,
          [formattedDate]: [...prevMinWidths[formattedDate], 0]
        };
        localStorage.setItem('minWidthsByDate', JSON.stringify(updatedMinWidths));
        return updatedMinWidths;
      });
      setCompletedTasksByDate((prevCompleted) => {
        const updatedCompleted = {
          ...prevCompleted,
          [formattedDate]: [...prevCompleted[formattedDate], false]
        };
        localStorage.setItem('completedTasksByDate', JSON.stringify(updatedCompleted));
        return updatedCompleted;
      });
      setNewTask('');
      console.log({
        date: formattedDate,
        task: newTask,
        completed: false
      });
    }
  };

  const handleDeleteTask = (formattedDate, index) => {
    const taskToDelete = tasksByDate[formattedDate][index];
    
    setTasksByDate((prevTasks) => {
      const updatedTasks = {
        ...prevTasks,
        [formattedDate]: prevTasks[formattedDate].filter((_, i) => i !== index)
      };
      localStorage.setItem('tasksByDate', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    setTaskWidthsByDate((prevWidths) => {
      const updatedWidths = {
        ...prevWidths,
        [formattedDate]: prevWidths[formattedDate].filter((_, i) => i !== index)
      };
      localStorage.setItem('taskWidthsByDate', JSON.stringify(updatedWidths));
      return updatedWidths;
    });
    setMinWidthsByDate((prevMinWidths) => {
      const updatedMinWidths = {
        ...prevMinWidths,
        [formattedDate]: prevMinWidths[formattedDate].filter((_, i) => i !== index)
      };
      localStorage.setItem('minWidthsByDate', JSON.stringify(updatedMinWidths));
      return updatedMinWidths;
    });
    setCompletedTasksByDate((prevCompleted) => {
      const updatedCompleted = {
        ...prevCompleted,
        [formattedDate]: prevCompleted[formattedDate].filter((_, i) => i !== index)
      };
      localStorage.setItem('completedTasksByDate', JSON.stringify(updatedCompleted));
      return updatedCompleted;
    });
  };

  const handleCompleteTask = (formattedDate, index) => {
    const isCompleted = !completedTasksByDate[formattedDate][index];
    
    setCompletedTasksByDate((prevCompleted) => {
      const updatedCompleted = {
        ...prevCompleted,
        [formattedDate]: prevCompleted[formattedDate].map((completed, i) => i === index ? isCompleted : completed)
      };
      localStorage.setItem('completedTasksByDate', JSON.stringify(updatedCompleted));
      return updatedCompleted;
    });
  };


  const handleDoubleClick = (formattedDate, index) => {
    handleCompleteTask(formattedDate, index);
  };

  const handleMouseDown = (formattedDate, index, e) => {
    const startX = e.clientX;
    const startWidth = taskWidthsByDate[formattedDate][index];
    const containerWidth = containerRef.current.offsetWidth;

    const handleMouseMove = (e) => {
      const newWidth = Math.min(
        Math.max(minWidthsByDate[formattedDate][index], startWidth + (e.clientX - startX)) + 20,
        containerWidth - 50
      );
      setTaskWidthsByDate((prevWidths) => ({
        ...prevWidths,
        [formattedDate]: prevWidths[formattedDate].map((width, i) => {
          if (i === index) {
            return newWidth;
          }
          return width;
        })
      }));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    };

    
    useEffect(() => {
      const formattedDate = selectedDate?.format('YYYY-MM-DD');
      if (formattedDate && tasksByDate[formattedDate]) {
        const updatedMinWidths = tasksByDate[formattedDate].map((task, index) => {
          const span = document.createElement('span');
          span.style.visibility = 'hidden';
          span.style.position = 'absolute';
          span.style.whiteSpace = 'nowrap';
          span.style.fontSize = '16px';
          span.innerText = task;
          document.body.appendChild(span);
          const width = span.offsetWidth + 30;
          document.body.removeChild(span);
          return width;
        });
        setMinWidthsByDate((prevMinWidths) => ({
          ...prevMinWidths,
          [formattedDate]: updatedMinWidths
        }));
      }
    }, [tasksByDate, selectedDate]);
      
      

    return (
      <div
        ref={containerRef}
        style={{
          width: '1400px',
          height: '700px',
          margin: '0 auto',
          textAlign: 'center',
          border: '2px solid #ccc',
          padding: '20px',
          borderRadius: '8px',
          boxSizing: 'border-box',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="选择日期"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            value={newTask}
            onChange={handleInputChange}
            placeholder="输入任务内容"
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '4px',
              border: '3px solid #ccc', // 修改为 2px
              marginRight: '10px'
            }}
          />
          <button
            onClick={handleAddTask}
            style={{
              backgroundColor: '#F4D03F', // 起始颜色
              backgroundImage: 'linear-gradient(13deg, #F4D03F 0%, #16A085 100%)', // 渐变背景
              color: '#fff',
              border: 'none',
              padding: '10px',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s, background-image 0.3s', // 可选：添加过渡效果
            }}
          >
            <FaPlus />
          </button>
        </div>


        <ul style={{ listStyle: 'none', padding: 0 }}>
  {selectedDate && tasksByDate[selectedDate.format('YYYY-MM-DD')] && tasksByDate[selectedDate.format('YYYY-MM-DD')].map((task, index) => (
    <li
      key={index}
      onDoubleClick={() => handleDoubleClick(selectedDate.format('YYYY-MM-DD'), index)}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #eee',
        marginBottom: '10px',
        borderRadius: '4px',
        backgroundColor: '#85FFBD', // Fallback color
        backgroundImage: 'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)', // Gradient background
        width: `${taskWidthsByDate[selectedDate.format('YYYY-MM-DD')][index]}px`,
        position: 'relative',
        textDecoration: completedTasksByDate[selectedDate.format('YYYY-MM-DD')][index] ? 'line-through' : 'none'
      }}
    >
      <span style={{ flex: 1 }}>{task}</span>
      <button onClick={() => handleCompleteTask(selectedDate.format('YYYY-MM-DD'), index)} style={{
        backgroundColor: 'transparent',
        color: '#28a745',
        border: 'none',
        cursor: 'pointer',
        marginRight: '5px'
      }}>
        <FaCheck />
      </button>
      <button onClick={() => handleDeleteTask(selectedDate.format('YYYY-MM-DD'), index)} style={{
        backgroundColor: 'transparent',
        color: '#dc3545',
        border: 'none',
        cursor: 'pointer'
      }}>
        <FaTrash />
      </button>
      <div
        onMouseDown={(e) => handleMouseDown(selectedDate.format('YYYY-MM-DD'), index, e)}
        style={{
          width: '10px',
          height: '100%',
          cursor: 'ew-resize',
          backgroundColor: '#ccc',
          position: 'absolute',
          right: '-5px',
          top: 0
        }}
      />
    </li>
  ))}
</ul>

      </div>
    );
  }

  export default TaskManager;
