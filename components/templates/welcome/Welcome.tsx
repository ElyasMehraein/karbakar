'use client';
import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

import { User } from '@/types';

interface WelcomeProps {
  user: User;
}

export default function Welcome({ user }: WelcomeProps) {
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          خوش آمدید {user.userName}!
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          به پلتفرم کارباکار خوش آمدید. اینجا می‌توانید کسب و کار خود را مدیریت
          کنید و با دیگران در ارتباط باشید.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => router.push('/business/create')}
        >
          ایجاد کسب و کار جدید
        </Button>
      </Box>
    </Container>
  );
}
