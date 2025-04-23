'use client';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';

import { Business } from '@/types';

interface NameProps {
  business: Business;
}

export default function Name({ business }: NameProps) {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 2 }}>
        <Typography variant="h4" component="h1">
          {business.businessName}
        </Typography>
      </Box>
    </Container>
  );
}
