"use client"
import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@mui/material';
import { Business } from '@/types';
import { useSnackbar } from './SnackbarProvider';

interface ProvidersAndReceiversProps {
  business: Business;
}

interface Provider {
  id: number;
  name: string;
  avatar: string;
}

interface Receiver {
  id: number;
  name: string;
  avatar: string;
}

export default function ProvidersAndReceivers({ business }: ProvidersAndReceiversProps) {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [receivers, setReceivers] = useState<Receiver[]>([]);
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [providersResponse, receiversResponse] = await Promise.all([
          fetch(`/api/business/${business.businessCode}/providers`),
          fetch(`/api/business/${business.businessCode}/receivers`)
        ]);

        if (providersResponse.ok && receiversResponse.ok) {
          const providersData = await providersResponse.json();
          const receiversData = await receiversResponse.json();
          setProviders(providersData);
          setReceivers(receiversData);
        } else {
          showSnackbar('خطا در دریافت اطلاعات', 'error');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        showSnackbar('خطا در ارتباط با سرور', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [business.businessCode, showSnackbar]);

  if (loading) {
    return <Typography>در حال بارگذاری...</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        تامین‌کنندگان و دریافت‌کنندگان
      </Typography>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            تامین‌کنندگان
          </Typography>
          <List>
            {providers.map((provider) => (
              <ListItem key={provider.id}>
                <ListItemAvatar>
                  <Avatar src={provider.avatar} alt={provider.name} />
                </ListItemAvatar>
                <ListItemText primary={provider.name} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            دریافت‌کنندگان
          </Typography>
          <List>
            {receivers.map((receiver) => (
              <ListItem key={receiver.id}>
                <ListItemAvatar>
                  <Avatar src={receiver.avatar} alt={receiver.name} />
                </ListItemAvatar>
                <ListItemText primary={receiver.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
} 