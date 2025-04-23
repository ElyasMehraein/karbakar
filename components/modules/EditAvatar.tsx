'use client';
import { Box, Button, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';


import { IMAGE_PATHS } from '@/configs/constants';
import { Business } from '@/types';

import ItsAvatar from './ItsAvatar';

interface EditAvatarProps {
  business: Business;
}

export default function EditAvatar({ business }: EditAvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>(
    `${IMAGE_PATHS.AVATARS}/${business.businessName}.jpg`
  );

  useEffect(() => {
    setAvatarUrl(
      `${IMAGE_PATHS.AVATARS}/${business.businessName}.jpg?timestamp=${new Date().getTime()}`
    );
  }, [business.businessName]);

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('businessName', business.businessName);

    try {
      const response = await fetch('/api/uploadImg', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setAvatarUrl(
          `${IMAGE_PATHS.AVATARS}/${business.businessName}.jpg?timestamp=${new Date().getTime()}`
        );
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <ItsAvatar
          userCodeOrBusinessBrand={business.businessName}
          sx={{ width: 100, height: 100 }}
        />
        <Button variant="contained" component="label">
          تغییر آواتار
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </Button>
      </Box>
    </Container>
  );
}
