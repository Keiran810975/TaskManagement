import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Container, Button } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const isAuthenticated = useAuth();
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem('token');
      axios
        .get('http://localhost:8000/user/', {
          headers: { Authorization: `Token ${token}` },
        })
        .then(response => {
          console.log(response.data);
          setUsername(response.data.username);
        })
        .catch(error => {
          console.error('Failed to fetch user info:', error);
        });
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // 移除本地存储中的 token
    navigate('/login'); // 导航到登录页面
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      {isAuthenticated ? (
        username ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 3,
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
              boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
            }}
          >
            <Avatar sx={{ bgcolor: '#3f51b5', width: 64, height: 64, mb: 2 }}>
              {username.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h5" component="div">
              欢迎回来, {username}!
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              sx={{ mt: 2 }}
            >
              退出登录
            </Button>
          </Box>
        ) : (
          <Typography variant="h6">正在加载...</Typography>
        )
      ) : (
        <Typography variant="h6" color="error">
          未登录，请先登录。
        </Typography>
      )}
    </Container>
  );
}
