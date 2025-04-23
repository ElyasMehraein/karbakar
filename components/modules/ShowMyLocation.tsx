"use client"
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { useSnackbar } from './SnackbarProvider';
import { Business } from '@/types';

interface ShowMyLocationProps {
  business: Business;
  onLocationUpdate: (lat: number, lng: number) => void;
}

export default function ShowMyLocation({ business, onLocationUpdate }: ShowMyLocationProps) {
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationUpdate(latitude, longitude);
          showSnackbar('موقعیت مکانی با موفقیت به‌روزرسانی شد', 'success');
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          showSnackbar('خطا در دریافت موقعیت مکانی', 'error');
          setLoading(false);
        }
      );
    } else {
      showSnackbar('مرورگر شما از سرویس موقعیت مکانی پشتیبانی نمی‌کند', 'error');
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        موقعیت مکانی
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={getCurrentLocation}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        {loading ? 'در حال دریافت موقعیت...' : 'نمایش موقعیت فعلی'}
      </Button>
      {business.latitude && business.longitude && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          عرض جغرافیایی: {business.latitude}, طول جغرافیایی: {business.longitude}
        </Typography>
      )}
    </Box>
  );
} 