"use client"
import React, { useEffect, useRef } from 'react';
import { Box, Container } from '@mui/material';
import { Business } from '@/types';

interface MapProps {
  business: Business;
}

export default function Map({ business }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || !business.latitude || !business.longitude) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: business.latitude, lng: business.longitude },
      zoom: 15,
    });

    new google.maps.Marker({
      position: { lat: business.latitude, lng: business.longitude },
      map,
      title: business.businessName,
    });
  }, [business]);

  if (!business.latitude || !business.longitude) return null;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 2, height: '400px' }} ref={mapRef} />
    </Container>
  );
} 