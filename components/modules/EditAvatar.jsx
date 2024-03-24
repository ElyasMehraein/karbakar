"use client"
import defaultAvatarImg from "@/public/assets/default/default-avatar.svg"
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Image from "next/image";
import { grey } from '@mui/material/colors';
import { Container, IconButton } from "@mui/material";

const color = grey[900];

export default function EditAvatar({user , business}) {
  const [imageKey, setImageKey] = useState(null);
  const AvatarImg = `/avatars/${user?.code || business?.businessName}.jpg${imageKey ? `?key=${imageKey}` : ''}`

  useEffect(() => {
    setImageKey(Date.now());
  }, []);

  const handleImageUpload = async (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    formData.append("imagePath", `avatars/${user?.code || business?.businessName}.jpg`);

    try {
      const response = await fetch('/api/uploadImg', {
        method: 'PUT',
        body: formData,
      });
      
      if(response.status===201){
        console.log('image Uploaded successfully');
        setImageKey(Date.now());
      }
    } catch (error) {
      console.error('Error uploading image:', error);
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
          id="raised-button-file"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="raised-button-file">
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
