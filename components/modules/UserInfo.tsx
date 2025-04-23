"use client";

import React from 'react';
import { Box, Typography, Avatar, Container } from '@mui/material';
import { User } from '@/types';
import { IMAGE_PATHS } from '@/configs/constants';
import Image from 'next/image';

interface UserInfoProps {
  user: User;
}

export default function UserInfo({ user }: UserInfoProps) {
  const avatarUrl = `${IMAGE_PATHS.AVATARS}/${user.code}.jpg?timestamp=${new Date().getTime()}`;
  const headerUrl = `${IMAGE_PATHS.HEADERS}/${user.code}.jpg?timestamp=${new Date().getTime()}`;

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '50vh',
        }}
      >
        <Image
          alt={`${user.userName} header`}
          src={headerUrl}
          priority
          quality={200}
          fill
          sizes="100%"
          style={{
            objectFit: 'cover',
          }}
        />
      </Box>
      <Container maxWidth="md" sx={{ mt: -5, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={avatarUrl}
            alt={user.userName}
            sx={{ width: 100, height: 100, border: '4px solid white' }}
          />
          <Box>
            <Typography variant="h4" component="h1">
              {user.userName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              کد کاربری: {user.code}
            </Typography>
          </Box>
        </Box>
        {user.bio && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">{user.bio}</Typography>
          </Box>
        )}
        {user.explain && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {user.explain}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
} 