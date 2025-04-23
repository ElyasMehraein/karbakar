"use client"
import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import { Business } from '@/types';

interface ExplainProps {
  business: Business;
}

export default function Explain({ business }: ExplainProps) {
  if (!business.explain) return null;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {business.explain}
        </Typography>
      </Box>
    </Container>
  );
} 