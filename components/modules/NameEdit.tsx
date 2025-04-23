'use client';
import { Box, Container, TextField } from '@mui/material';
import React, { useState } from 'react';

import { Business } from '@/types';

interface NameEditProps {
  business: Business;
  label: string;
  maxLengthError: (message: string) => void;
}

export default function NameEdit({
  business,
  label,
  maxLengthError,
}: NameEditProps) {
  const [name, setName] = useState<string>(business.businessName);

  const handleNameChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newName = event.target.value;
    setName(newName);

    if (newName.length < 3) {
      maxLengthError('نام باید حداقل 3 کاراکتر باشد');
      return;
    }

    if (!/^[A-Za-z\-_.]+$/.test(newName)) {
      maxLengthError(
        'نام باید فقط شامل حروف انگلیسی، خط تیره، نقطه و زیرخط باشد'
      );
      return;
    }

    try {
      const response = await fetch(`/api/business/${business._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ businessName: newName }),
      });

      if (!response.ok) {
        throw new Error('خطا در بروزرسانی نام');
      }
    } catch (error) {
      console.error('Error updating name:', error);
      maxLengthError('خطا در بروزرسانی نام');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label={label}
          value={name}
          onChange={handleNameChange}
          variant="outlined"
        />
      </Box>
    </Container>
  );
}
