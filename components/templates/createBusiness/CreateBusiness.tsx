"use client"
import React, { useState } from 'react';
import { Box, TextField, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Business } from '@/types';

export default function CreateBusiness() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Business>>({
    businessName: '',
    bio: '',
    phone: '',
    email: '',
    address: '',
    explain: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/business');
      } else {
        throw new Error('خطا در ایجاد کسب و کار');
      }
    } catch (error) {
      console.error('Error creating business:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          ایجاد کسب و کار جدید
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="نام کسب و کار"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="بیوگرافی"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="شماره تلفن"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="ایمیل"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="آدرس"
            name="address"
            value={formData.address}
            onChange={handleChange}
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="توضیحات"
            name="explain"
            value={formData.explain}
            onChange={handleChange}
            multiline
            rows={6}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            ایجاد کسب و کار
          </Button>
        </form>
      </Box>
    </Container>
  );
} 