"use client"
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { User, Business } from '@/types';

interface UserJobsProps {
  user: User;
}

export default function UserJobs({ user }: UserJobsProps) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        کسب و کارها
      </Typography>
      {user.businesses && user.businesses.length > 0 ? (
        <List>
          {user.businesses.map((business: Business) => (
            <ListItem key={business._id}>
              <ListItemText
                primary={business.businessName}
                secondary={business.bio}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" color="text.secondary">
          هیچ کسب و کاری ثبت نشده است.
        </Typography>
      )}
    </Box>
  );
} 