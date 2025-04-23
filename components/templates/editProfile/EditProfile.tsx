"use client"
import React, { useState } from 'react';
import { Box, TextField, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { User } from '@/types';

interface EditProfileProps {
  user: User;
}

export default function EditProfile({ user }: EditProfileProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<User>>({
    userName: user.userName,
    bio: user.bio,
    phone: user.phone,
    email: user.email,
    personalPage: user.personalPage,
    instagram: user.instagram,
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
      const response = await fetch(`/api/user/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/profile');
      } else {
        throw new Error('خطا در بروزرسانی پروفایل');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          ویرایش پروفایل
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="نام کاربری"
            name="userName"
            value={formData.userName}
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
            label="صفحه شخصی"
            name="personalPage"
            value={formData.personalPage}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="اینستاگرام"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            ذخیره تغییرات
          </Button>
        </form>
      </Box>
    </Container>
  );
} 