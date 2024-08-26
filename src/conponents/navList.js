import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupIcon from '@mui/icons-material/Group';
import GitHubIcon from '@mui/icons-material/GitHub';
import PublicIcon from '@mui/icons-material/Public';
import { NavLink } from 'react-router-dom';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

export default function NestedList() {
  const [activeNav, setActiveNav] = React.useState('');

  const handleSetActiveNav = (navItem) => {
    setActiveNav(navItem);
  };

  const iconStyle = (navItem) => ({
    backgroundColor: activeNav === navItem ? '#F4D03F' : 'transparent',
    backgroundImage: activeNav === navItem ? 'linear-gradient(0deg, #F4D03F 0%, #16A085 100%)' : 'none',
    color: activeNav === navItem ? 'white' : 'inherit',
    borderRadius: '10%',
    width: 40, // Set width for square shape
    height: 40, // Set height for square shape
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 250,
        bgcolor: 'background.paper',
        borderRight: '2px solid #ddd', // Add right border
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" style={{ fontSize: '20px' }}>
          导航栏
        </ListSubheader>
      }
    >
      <NavLink
        to="/"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? 'inherit' : 'inherit',
        })}
        onClick={() => handleSetActiveNav('home')}
      >
        <ListItemButton sx={{ borderRadius: 2 }}>
          <ListItemIcon style={iconStyle('home')}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="主页" />
        </ListItemButton>
      </NavLink>

      <NavLink
        to="/login"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? 'inherit' : 'inherit',
        })}
        onClick={() => handleSetActiveNav('login')}
      >
        <ListItemButton sx={{ borderRadius: 2 }}>
          <ListItemIcon style={iconStyle('login')}>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText primary="登录" />
        </ListItemButton>
      </NavLink>

      <NavLink
        to="/team"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? 'inherit' : 'inherit',
        })}
        onClick={() => handleSetActiveNav('team')}
      >
        <ListItemButton sx={{ borderRadius: 2 }}>
          <ListItemIcon style={iconStyle('team')}>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="团队" />
        </ListItemButton>
      </NavLink>

      <NavLink
        to="/chart"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? 'inherit' : 'inherit',
        })}
        onClick={() => handleSetActiveNav('chart')}
      >
        <ListItemButton sx={{ borderRadius: 2 }}>
          <ListItemIcon style={iconStyle('chart')}>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="统计" />
        </ListItemButton>
      </NavLink>

      <NavLink
        to="/export"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? 'inherit' : 'inherit',
        })}
        onClick={() => handleSetActiveNav('export')}
      >
        <ListItemButton sx={{ borderRadius: 2 }}>
          <ListItemIcon style={iconStyle('export')}>
            <DriveFileMoveIcon />
          </ListItemIcon>
          <ListItemText primary="导出" />
        </ListItemButton>
      </NavLink>

      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      {/* Add links to GitHub and personal blog */}
      <ListSubheader component="div" style={{ fontSize: '16px', marginTop: '20px' }}>
        链接
      </ListSubheader>

      <a href="https://github.com/Keiran810975/TaskManagement.git" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton sx={{ borderRadius: 2 }}>
          <ListItemIcon>
            <GitHubIcon sx={{ color: '#008f7a' }}/>
          </ListItemIcon>
          <ListItemText primary="GitHub 仓库" />
        </ListItemButton>
      </a>

      <a href="https://keiran810975.github.io/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton sx={{ borderRadius: 2 }}>
          <ListItemIcon>
            <PublicIcon sx={{ color: '#008f7a' }} />
          </ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItemButton>
      </a>
    </List>
  );
}
