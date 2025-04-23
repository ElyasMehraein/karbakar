'use client';
import { Box, Container, TextField } from '@mui/material';
import React, { useState } from 'react';

import { Business } from '@/types';

interface EmailEditProps {
  business: Business;
  maxLengthError: (message: string) => void;
}

export default function EmailEdit({
  business,
  maxLengthError,
}: EmailEditProps) {
  const [email, setEmail] = useState<string>(business.email || '');

  const handleEmailChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    if (newEmail.length > 100) {
      maxLengthError('ایمیل نباید بیشتر از 100 کاراکتر باشد');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      maxLengthError('فرمت ایمیل نامعتبر است');
      return;
    }

    try {
      const response = await fetch(`/api/business/${business._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newEmail }),
      });

      if (!response.ok) {
        throw new Error('خطا در بروزرسانی ایمیل');
      }
    } catch (error) {
      console.error('Error updating email:', error);
      maxLengthError('خطا در بروزرسانی ایمیل');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="ایمیل"
          value={email}
          onChange={handleEmailChange}
          variant="outlined"
          type="email"
        />
      </Box>
    </Container>
  );
}
