'use client';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';

import { User } from '@/types';

import UserJobs from './UserJobs';


interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          پروفایل کاربری
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          نام کاربری: {user.userName}
        </Typography>
        {user.bio && (
          <Typography variant="body1" sx={{ mb: 4 }}>
            بیوگرافی: {user.bio}
          </Typography>
        )}
        <UserJobs user={user} />
      </Box>
    </Container>
  );
}
