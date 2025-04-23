"use client"
import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import { Business } from '@/types';

interface MonthlyCommitmentProps {
  business: Business;
}

export default function MonthlyCommitment({ business }: MonthlyCommitmentProps) {
  if (!business.monthlyCommitment?.product) return null;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          تعهد ماهانه
        </Typography>
        <Typography variant="body1">
          محصول: {business.monthlyCommitment.product.productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          واحد اندازه‌گیری: {business.monthlyCommitment.product.unitOfMeasurement}
        </Typography>
      </Box>
    </Container>
  );
} 