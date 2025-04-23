"use client"
import React, { useState } from 'react';
import { TextField, Box, Container } from '@mui/material';
import { Business } from '@/types';

interface PhoneEditProps {
  business: Business;
  maxLengthError: (message: string) => void;
}

export default function PhoneEdit({ business, maxLengthError }: PhoneEditProps) {
  const [phone, setPhone] = useState<string>(business.phone || '');

  const handlePhoneChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = event.target.value;
    setPhone(newPhone);

    if (newPhone.length > 11) {
      maxLengthError('شماره تلفن نباید بیشتر از 11 رقم باشد');
      return;
    }

    if (!/^[0-9]*$/.test(newPhone)) {
      maxLengthError('شماره تلفن باید فقط شامل اعداد باشد');
      return;
    }

    try {
      const response = await fetch(`/api/business/${business._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: newPhone }),
      });

      if (!response.ok) {
        throw new Error('خطا در بروزرسانی شماره تلفن');
      }
    } catch (error) {
      console.error('Error updating phone:', error);
      maxLengthError('خطا در بروزرسانی شماره تلفن');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="شماره تلفن"
          value={phone}
          onChange={handlePhoneChange}
          variant="outlined"
          type="tel"
        />
      </Box>
    </Container>
  );
} 