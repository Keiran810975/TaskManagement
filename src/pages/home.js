
import React from 'react';
import ListDividers from '../conponents/singleList';
import MultiDayToDoList from '../conponents/mainList';
import SimplePieChart from '../conponents/SimplePieChart';
import ReminderBox from '../conponents/ReminderBox';
import { Task } from '@mui/icons-material';
import TaskManager from '../conponents/gantt';
const Home = () => {
  
  return (
  <div>
    
    {/* <ReminderBox/> */}
    {/* <ListDividers/> */}
    {/* <MultiDayToDoList/> */}
    <TaskManager/>
  </div>
  )
};

export default Home;
