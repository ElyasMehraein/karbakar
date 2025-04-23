'use client';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';

import BusinessInfo from '@/components/modules/BusinessInfo';
import { Business } from '@/types';

import Map from './Map';
import MonthlyCommitment from './MonthlyCommitment';


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
