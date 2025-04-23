'use client';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Business } from '@/types';

interface SearchBoxProps {
  businesses: Business[];
}

export default function SearchBox({ businesses }: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBusinesses([]);
      return;
    }

    const filtered = businesses.filter(
      (business) =>
        business.businessName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        business.bio?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBusinesses(filtered);
  }, [searchTerm, businesses]);

  const handleBusinessClick = (businessCode: number) => {
    router.push(`/business/${businessCode}`);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="جستجو در کسب و کارها..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      {filteredBusinesses.length > 0 && (
        <List
          sx={{
            position: 'absolute',
            width: '100%',
            bgcolor: 'background.paper',
            boxShadow: 1,
            zIndex: 1,
            maxHeight: 300,
            overflow: 'auto',
          }}
        >
          {filteredBusinesses.map((business) => (
            <ListItem
              key={business.businessCode}
              button
              onClick={() => handleBusinessClick(business.businessCode)}
            >
              <ListItemText
                primary={business.businessName}
                secondary={business.bio}
              />
            </ListItem>
          ))}
        </List>
      )}

      {searchTerm && filteredBusinesses.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          نتیجه‌ای یافت نشد
        </Typography>
      )}
    </Box>
  );
}
