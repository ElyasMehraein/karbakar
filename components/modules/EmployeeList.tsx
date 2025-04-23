'use client';
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';

import { Business, User } from '@/types';

import ItsAvatar from './ItsAvatar';


interface EmployeeListProps {
  business: Business;
  logedUserCode?: number;
  users?: User[];
  maxLengthError?: (message: string) => void;
}

export default function EmployeeList({
  business,
  logedUserCode,
  users,
  maxLengthError,
}: EmployeeListProps) {
  if (!business.workers || business.workers.length === 0) return null;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          کارمندان
        </Typography>
        <List>
          {business.workers.map((worker) => (
            <ListItem key={worker._id}>
              <ListItemAvatar>
                <ItsAvatar userCodeOrBusinessBrand={worker.code} />
              </ListItemAvatar>
              <ListItemText
                primary={worker.userName}
                secondary={`کد کاربری: ${worker.code}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
