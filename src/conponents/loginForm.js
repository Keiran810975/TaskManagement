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
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        p: 3,
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        maxWidth: 400,
        margin: '0 auto',
        mt: 5,
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <h2>登录界面</h2>
      </div>
      <div>
        <TextField
          id="outlined-username"
          label="账号"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        />
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '25ch', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          登录
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleRegister}
        >
          注册
        </Button>
      </Box>
    </Box>
  );
}
  