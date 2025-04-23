'use client';
import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { IMAGE_PATHS } from '@/configs/constants';
import { Business } from '@/types';

interface HeaderProps {
  business: Business;
}

export default function Header({ business }: HeaderProps) {
  const headerUrl = `${IMAGE_PATHS.HEADERS}/${business.businessName}.jpg?timestamp=${new Date().getTime()}`;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '50vh',
      }}
    >
      <Image
        alt={`${business.businessName} header`}
        src={headerUrl}
        priority
        quality={200}
        fill
        sizes="100%"
        style={{
          objectFit: 'cover',
        }}
      />
    </Box>
  );
}
