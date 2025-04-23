"use client"
import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Business } from '@/types';
import Map from './Map';

interface BusinessInfoProps {
  business: Business;
}

export default function BusinessInfo({ business }: BusinessInfoProps) {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          اطلاعات کسب و کار
        </Typography>
        
        {business.bio && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              بیوگرافی
            </Typography>
            <Typography variant="body1">{business.bio}</Typography>
          </Box>
        )}

        {business.explain && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              توضیحات
            </Typography>
            <Typography variant="body1">{business.explain}</Typography>
          </Box>
        )}

        {business.phone && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              شماره تلفن
            </Typography>
            <Typography variant="body1">{business.phone}</Typography>
          </Box>
        )}

        {business.email && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              ایمیل
            </Typography>
            <Typography variant="body1">{business.email}</Typography>
          </Box>
        )}

        {business.address && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              آدرس
            </Typography>
            <Typography variant="body1">{business.address}</Typography>
            <Map business={business} />
          </Box>
        )}

        {(business.instagram || business.personalPage) && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              شبکه‌های اجتماعی
            </Typography>
            {business.instagram && (
              <Typography variant="body1">
                اینستاگرام: @{business.instagram}
              </Typography>
            )}
            {business.personalPage && (
              <Typography variant="body1">
                صفحه شخصی: {business.personalPage}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
} 