"use client"
import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Chip, Button } from '@mui/material';
import { useSnackbar } from './SnackbarProvider';
import { Business } from '@/types';

interface BugShowProps {
  business: Business;
}

interface Bug {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
}

export default function BugShow({ business }: BugShowProps) {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await fetch(`/api/business/${business.businessCode}/bugs`);
        if (response.ok) {
          const data = await response.json();
          setBugs(data);
        } else {
          showSnackbar('خطا در دریافت باگ‌ها', 'error');
        }
      } catch (error) {
        console.error('Error fetching bugs:', error);
        showSnackbar('خطا در ارتباط با سرور', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, [business.businessCode, showSnackbar]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'error';
      case 'in_progress':
        return 'warning';
      case 'resolved':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open':
        return 'باز';
      case 'in_progress':
        return 'در حال بررسی';
      case 'resolved':
        return 'حل شده';
      default:
        return status;
    }
  };

  if (loading) {
    return <Typography>در حال بارگذاری باگ‌ها...</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        گزارش باگ‌ها
      </Typography>

      {bugs.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          باگی گزارش نشده است
        </Typography>
      ) : (
        <List>
          {bugs.map((bug) => (
            <ListItem
              key={bug.id}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                mb: 1,
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1">{bug.title}</Typography>
                    <Chip
                      label={getStatusLabel(bug.status)}
                      color={getStatusColor(bug.status)}
                      size="small"
                    />
                  </Box>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {bug.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      تاریخ گزارش: {new Date(bug.createdAt).toLocaleDateString('fa-IR')}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
} 