'use client';

import BusinessIcon from '@mui/icons-material/Business';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface User {
  _id: string;
  businesses: Array<{
    _id: string;
    businessName: string;
  }>;
}

interface Business {
  _id: string;
  businessName: string;
}

interface RightDrawerProps {
  user: User | null;
  open: boolean;
  handleDrawerClose: () => void;
  primeBusiness: Business | null;
}

export default function RightDrawer({
  user,
  open,
  handleDrawerClose,
  primeBusiness,
}: RightDrawerProps) {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/w');
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleDrawerClose}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px',
          justifyContent: 'flex-end',
        }}
      >
        <IconButton onClick={handleDrawerClose}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItemButton component={Link} href="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="صفحه اصلی" />
        </ListItemButton>
        {user && (
          <>
            <ListItemButton
              component={Link}
              href={`/${user.businesses[0]?.businessName}`}
            >
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary="صفحه کسب و کار" />
            </ListItemButton>
            <ListItemButton component={Link} href={`/${user._id}`}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="پروفایل" />
            </ListItemButton>
          </>
        )}
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="خروج" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
