import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link, NavLink } from 'react-router-dom';

export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" style={{fontSize : '20px'}}>
          导航栏
        </ListSubheader>
      }
    >

      <NavLink 
        to="/" 
        style={({ isActive }) => ({
            textDecoration: 'none',
            color: isActive ? 'inherit' : 'inherit'
        })}
      >
      <ListItemButton>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="主页" />
      </ListItemButton>
      </NavLink>

      <NavLink 
        to="/login" 
        style={({ isActive }) => ({
            textDecoration: 'none',
            color: isActive ? 'inherit' : 'inherit'
        })}
      >
      <ListItemButton>
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>
        <ListItemText primary="登录" />
      </ListItemButton>
      </NavLink>

      <NavLink 
        to="/chart" 
        style={({ isActive }) => ({
            textDecoration: 'none',
            color: isActive ? 'inherit' : 'inherit'
        })}
      >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <BarChartIcon/>
        </ListItemIcon>
        <ListItemText primary="统计" />
      </ListItemButton>
      </NavLink>
      
    </List>
  );
}
