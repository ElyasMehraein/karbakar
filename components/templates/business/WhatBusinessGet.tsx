"use client"
import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Business } from '@/types';

interface WhatBusinessGetProps {
  business: Business;
}

export default function WhatBusinessGet({ business }: WhatBusinessGetProps) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        مزایای کسب و کار
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon color="success" />
          </ListItemIcon>
          <Typography variant="body1">
            امکان نمایش اطلاعات کسب و کار به صورت کامل
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon color="success" />
          </ListItemIcon>
          <Typography variant="body1">
            امکان نمایش موقعیت مکانی روی نقشه
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon color="success" />
          </ListItemIcon>
          <Typography variant="body1">
            امکان مدیریت تعهدات ماهانه
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon color="success" />
          </ListItemIcon>
          <Typography variant="body1">
            امکان ارتباط با مشتریان و همکاران
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
} 