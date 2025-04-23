'use client';
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Business } from '@/types';

import { useSnackbar } from './SnackbarProvider';


interface GuildProps {
  business: Business;
}

interface GuildMember {
  id: number;
  name: string;
  avatar: string;
  role: string;
}

export default function Guild({ business }: GuildProps) {
  const [members, setMembers] = useState<GuildMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(
          `/api/business/${business.businessCode}/guild-members`
        );
        if (response.ok) {
          const data = await response.json();
          setMembers(data);
        } else {
          showSnackbar('خطا در دریافت اعضای صنف', 'error');
        }
      } catch (error) {
        console.error('Error fetching guild members:', error);
        showSnackbar('خطا در ارتباط با سرور', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [business.businessCode, showSnackbar]);

  if (loading) {
    return <Typography>در حال بارگذاری...</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        اعضای صنف
      </Typography>

      {members.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          هیچ عضوی در این صنف وجود ندارد
        </Typography>
      ) : (
        <List>
          {members.map((member) => (
            <ListItem key={member.id}>
              <ListItemAvatar>
                <Avatar src={member.avatar} alt={member.name} />
              </ListItemAvatar>
              <ListItemText primary={member.name} secondary={member.role} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
