"use client"
import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import { Business } from '@/types';

interface BioProps {
  business: Business;
}

export default function Bio({ business }: BioProps) {
  if (!business.bio) return null;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">
          {business.bio}
        </Typography>
      </Box>
    </Container>
  );
} 