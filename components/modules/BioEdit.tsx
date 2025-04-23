"use client"
import React, { useState } from 'react';
import { TextField, Box, Container } from '@mui/material';
import { Business } from '@/types';

interface BioEditProps {
  business: Business;
  maxLengthError: (message: string) => void;
}

export default function BioEdit({ business, maxLengthError }: BioEditProps) {
  const [bio, setBio] = useState<string>(business.bio);

  const handleBioChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBio = event.target.value;
    setBio(newBio);

    if (newBio.length > 500) {
      maxLengthError('بیوگرافی نباید بیشتر از 500 کاراکتر باشد');
      return;
    }

    try {
      const response = await fetch(`/api/business/${business._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bio: newBio }),
      });

      if (!response.ok) {
        throw new Error('خطا در بروزرسانی بیوگرافی');
      }
    } catch (error) {
      console.error('Error updating bio:', error);
      maxLengthError('خطا در بروزرسانی بیوگرافی');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="بیوگرافی"
          value={bio}
          onChange={handleBioChange}
          variant="outlined"
          multiline
          rows={4}
        />
      </Box>
    </Container>
  );
} 