"use client"
import React, { useState } from 'react';
import { TextField, Box, Container } from '@mui/material';
import { Business } from '@/types';

interface ExplainEditProps {
  business: Business;
  maxLengthError: (message: string) => void;
}

export default function ExplainEdit({ business, maxLengthError }: ExplainEditProps) {
  const [explain, setExplain] = useState<string>(business.explain);

  const handleExplainChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newExplain = event.target.value;
    setExplain(newExplain);

    if (newExplain.length > 1000) {
      maxLengthError('توضیحات نباید بیشتر از 1000 کاراکتر باشد');
      return;
    }

    try {
      const response = await fetch(`/api/business/${business._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ explain: newExplain }),
      });

      if (!response.ok) {
        throw new Error('خطا در بروزرسانی توضیحات');
      }
    } catch (error) {
      console.error('Error updating explain:', error);
      maxLengthError('خطا در بروزرسانی توضیحات');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="توضیحات"
          value={explain}
          onChange={handleExplainChange}
          variant="outlined"
          multiline
          rows={6}
        />
      </Box>
    </Container>
  );
} 