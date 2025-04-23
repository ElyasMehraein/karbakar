"use client"
import React, { useState } from 'react';
import { TextField, Box, Container, Typography } from '@mui/material';
import { Business } from '@/types';

interface SocialMediaEditProps {
  business: Business;
  maxLengthError: (message: string) => void;
}

export default function SocialMediaEdit({ business, maxLengthError }: SocialMediaEditProps) {
  const [instagram, setInstagram] = useState<string>(business.instagram || '');
  const [personalPage, setPersonalPage] = useState<string>(business.personalPage || '');

  const handleInstagramChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInstagram = event.target.value;
    setInstagram(newInstagram);

    if (newInstagram.length > 50) {
      maxLengthError('نام کاربری اینستاگرام نباید بیشتر از 50 کاراکتر باشد');
      return;
    }

    try {
      const response = await fetch(`/api/business/${business._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instagram: newInstagram }),
      });

      if (!response.ok) {
        throw new Error('خطا در بروزرسانی اینستاگرام');
      }
    } catch (error) {
      console.error('Error updating instagram:', error);
      maxLengthError('خطا در بروزرسانی اینستاگرام');
    }
  };

  const handlePersonalPageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPersonalPage = event.target.value;
    setPersonalPage(newPersonalPage);

    if (newPersonalPage.length > 100) {
      maxLengthError('آدرس صفحه شخصی نباید بیشتر از 100 کاراکتر باشد');
      return;
    }

    try {
      const response = await fetch(`/api/business/${business._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ personalPage: newPersonalPage }),
      });

      if (!response.ok) {
        throw new Error('خطا در بروزرسانی صفحه شخصی');
      }
    } catch (error) {
      console.error('Error updating personal page:', error);
      maxLengthError('خطا در بروزرسانی صفحه شخصی');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          شبکه‌های اجتماعی
        </Typography>
        <TextField
          fullWidth
          label="اینستاگرام"
          value={instagram}
          onChange={handleInstagramChange}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="صفحه شخصی"
          value={personalPage}
          onChange={handlePersonalPageChange}
          variant="outlined"
        />
      </Box>
    </Container>
  );
} 