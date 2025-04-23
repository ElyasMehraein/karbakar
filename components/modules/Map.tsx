'use client';
import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';

import { Business } from '@/types';

interface MapProps {
  business: Business;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function Map({ business }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || !business.address) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { address: business.address },
      (results: any[], status: string) => {
        if (status === 'OK' && results[0]) {
          const map = new window.google.maps.Map(mapRef.current, {
            center: results[0].geometry.location,
            zoom: 15,
          });

          new window.google.maps.Marker({
            map,
            position: results[0].geometry.location,
            title: business.businessName,
          });
        }
      }
    );
  }, [business.address, business.businessName]);

  return (
    <Box
      ref={mapRef}
      sx={{
        width: '100%',
        height: '400px',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    />
  );
}
