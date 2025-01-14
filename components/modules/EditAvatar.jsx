"use client"
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { grey } from '@mui/material/colors';
import { Alert, Container, IconButton, Snackbar } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
const color = grey[900];
import CircularProgress from '@mui/material/CircularProgress';

export default function EditAvatar({ user, business }) {
  const [isAvatar, setIsAvatar] = useState(user?.isAvatar || business?.isAvatar);
  const [uploadeding, setUploadeding] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleAvatarUpload = async (event) => {
    const image = event.target.files[0];

    if (!validateImageType(image)) {
      setSnackbarOpen(true)
      return;
    }

    setUploadeding(true);

    const formData = new FormData();
    formData.append('image', image);
    formData.append("imagePath", `images/avatars/${user?.code || business?.businessName}.jpg`);

    try {
      const response = await fetch('/api/uploadImg', {
        method: 'PUT',
        body: formData,
      });

      if (response.status === 201) {
        console.log('avatar Uploaded successfully');
        setIsAvatar(true);
        location.reload();
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setUploadeding(false);
    }
  };

  const validateImageType = (image) => {
    const acceptedTypes = ['image/jpeg']; // Only accept JPG
    return acceptedTypes.includes(image.type);
  };

  const userCodeOrBusinessBrand = user?.code || business?.businessName;
  const avatar = `/images/avatars/${userCodeOrBusinessBrand}.jpg`;

  return (
    <Container maxWidth="md">
      <Box sx={{ justifyContent: 'flex-start' }} display="flex">
        <Avatar sx={{ width: 70, height: 70, mt: -5 }}>
          {uploadeding ? <CircularProgress /> :
            isAvatar ?
              <Image
                src={avatar}
                alt={userCodeOrBusinessBrand}
                quality={100}
                fill
                sizes="100px"
                style={{ objectFit: 'cover' }}
              />
              :
              isNaN(userCodeOrBusinessBrand) ?

                <BusinessIcon />
                :
                <AccountCircle sx={{ width: 70, height: 70 }} />
          }
        </Avatar>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="uploadAvatar"
          type="file"
          onChange={handleAvatarUpload}
        />
        <label htmlFor="uploadAvatar">
          <IconButton
            component="span"
            sx={{ mr: -2, bgcolor: color }}
          >
            <AddAPhotoIcon sx={{ color: 'white' }} />
          </IconButton>
        </label>
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert
          severity={"error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          فرمت تصویر بایستی JPG باشد
        </Alert>
      </Snackbar>
    </Container>
  );
}
