'use client';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';

import { Business } from '@/types';

interface ContactProps {
  business: Business;
}

export default function Contact({ business }: ContactProps) {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {business.phone && (
            <Typography variant="body2">📞 {business.phone}</Typography>
          )}
          {business.email && (
            <Typography variant="body2">📧 {business.email}</Typography>
          )}
        </Box>
        <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
          {business.personalPage && (
            <Typography variant="body2">🌐 {business.personalPage}</Typography>
          )}
          {business.instagram && (
            <Typography variant="body2">📸 {business.instagram}</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}
