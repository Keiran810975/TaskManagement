import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password,
      });

      if (response.data.message === 'Login successful.') {
        localStorage.setItem('token', response.data.token); // 存储 token
        alert('登录成功!');
        navigate('/home'); 
      } else {
        alert('登录失败: ' + response.data.error);
      }
    } catch (error) {
      alert('登录失败2: ' + error.message);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': { m: 1, width: '30ch' },
        p: 5,
        backgroundColor: 'white', // 修改背景颜色为白色
        border: '2px solid #ccc', // 添加边框
        borderRadius: 4,
        maxWidth: 500,
        margin: '0 auto',
        mt: 8,
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <h2 style={{ fontSize: '2.2rem' }}>登录界面</h2>
      </div>
      <div>
        <TextField
          id="outlined-username"
          label="账号"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ input: { fontSize: '1.2rem' } }}
        />
      </div>
      <div>
        <TextField
          id="outlined-password"
          label="密码"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ input: { fontSize: '1.2rem' } }}
        />
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '30ch', mt: 3 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#F4D03F',
            backgroundImage: 'linear-gradient(280deg, #F4D03F 0%, #16A085 100%)',
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: '#F4D03F',
              backgroundImage: 'linear-gradient(280deg, #16A085 0%, #F4D03F 100%)',
            },
          }}
          onClick={handleLogin}
        >
          登录
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: 'white',
            backgroundColor: '#0093E9',
            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: '#0093E9',
              backgroundImage: 'linear-gradient(160deg, #80D0C7 0%, #0093E9 100%)',
            },
          }}
          onClick={handleRegister}
        >
          注册
        </Button>
      </Box>
    </Box>
  );
}
