"use client"
import React, { useState } from 'react';
import { TextField, Box, Container } from '@mui/material';
import { Business } from '@/types';

interface AddressEditProps {
  business: Business;
  maxLengthError: (message: string) => void;
}

export default function AddressEdit({ business, maxLengthError }: AddressEditProps) {
  const [address, setAddress] = useState<string>(business.address || '');

  const handleAddressChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = event.target.value;
    setAddress(newAddress);

    if (newAddress.length > 200) {
      maxLengthError('آدرس نباید بیشتر از 200 کاراکتر باشد');
      return;
    }

    try {
      const response = await fetch(`/api/business/${business._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: newAddress }),
      });

      if (!response.ok) {
        throw new Error('خطا در بروزرسانی آدرس');
      }
    } catch (error) {
      console.error('Error updating address:', error);
      maxLengthError('خطا در بروزرسانی آدرس');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="آدرس"
          value={address}
          onChange={handleAddressChange}
          variant="outlined"
          multiline
          rows={3}
        />
      </Box>
    </Container>
  );
} 