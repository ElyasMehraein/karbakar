'use client';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';

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
