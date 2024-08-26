import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const ReminderBox = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        maxWidth: 400,
        margin: '0 auto',
        mt: 3,
      }}
    >
      <WarningIcon sx={{ fontSize: 40, color: 'pink', mr: 2 }} />
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
        您有未完成的任务
      </Typography>
    </Box>
  );
};

export default ReminderBox;
