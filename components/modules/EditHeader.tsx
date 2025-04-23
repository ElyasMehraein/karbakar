'use client';
import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { IMAGE_PATHS } from '@/configs/constants';
import { Business } from '@/types';

interface EditHeaderProps {
  business: Business;
}

export default function EditHeader({ business }: EditHeaderProps) {
  const [headerUrl, setHeaderUrl] = useState<string>(
    `${IMAGE_PATHS.HEADERS}/${business.businessName}.jpg`
  );

  useEffect(() => {
    setHeaderUrl(
      `${IMAGE_PATHS.HEADERS}/${business.businessName}.jpg?timestamp=${new Date().getTime()}`
    );
  }, [business.businessName]);

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
