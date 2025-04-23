"use client"
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Business, User } from '@/types';
import { useRouter } from 'next/navigation';

interface MyAppBarProps {
  business?: Business | null;
  logedUserCode?: number | null;
  whichUserProfile?: number | null;
}

export default function MyAppBar({ business, logedUserCode, whichUserProfile }: MyAppBarProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  const handleEdit = () => {
    if (business) {
      router.push(`/edit/${business.businessName}`);
    } else if (whichUserProfile) {
      router.push(`/edit/${whichUserProfile}`);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={handleBack}>
          بازگشت
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        {business && business.agentCode === logedUserCode && (
          <Button color="inherit" onClick={handleEdit}>
            ویرایش
          </Button>
        )}
        {whichUserProfile && whichUserProfile === logedUserCode && (
          <Button color="inherit" onClick={handleEdit}>
            ویرایش
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
} 