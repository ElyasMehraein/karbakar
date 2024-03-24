"use client"
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Image from "next/image";
import { grey } from '@mui/material/colors';
import { Container, IconButton } from "@mui/material";

const color = grey[900];

export default function EditAvatar({ user, business }) {
  const [imageKey, setImageKey] = useState(null);
  const defaultAvatarImg = "/assets/default/default-avatar.png"

  const AvatarImg = `/${user ? `avatars` : `brands`}/${user?.code || business?.businessName}.jpg${imageKey ? `?key=${imageKey}` : ''}`

  useEffect(() => {
    setImageKey(Date.now());
  }, []);

  const handleAvatarUpload = async (event) => {
    console.log("change avatar clicked");
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    formData.append("imagePath", `avatars/${user?.code || business?.businessName}.jpg`);

    try {
      const response = await fetch('/api/uploadImg', {
        method: 'PUT',
        body: formData,
      });

      if (response.status === 201) {
        console.log('avatar Uploaded successfully');
        setImageKey(Date.now());
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ justifyContent: 'flex-start' }} display="flex">
        <Avatar
          sx={{ width: 80, height: 80, mt: -5 }}
        >
          <Image
            alt="business brand"
            src={AvatarImg || defaultAvatarImg}
            quality={100}
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
          />
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
            sx={{ mr: -2, bgcolor: color }}>
            <AddAPhotoIcon sx={{ color: 'white' }} />
          </IconButton>
        </label>
      </Box>
    </Container>
  );
}
