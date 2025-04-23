"use client"
import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Business } from '@/types';
import MonthlyCommitment from './MonthlyCommitment';
import Map from './Map';
import BusinessInfo from '@/components/modules/BusinessInfo';

interface BusinessProps {
  business: Business;
}

export default function Business({ business }: BusinessProps) {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {business.businessName}
        </Typography>
        <MonthlyCommitment business={business} />
        <Map business={business} />
        <BusinessInfo business={business} />
      </Box>
    </Container>
  );
} 