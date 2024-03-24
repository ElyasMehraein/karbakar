"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { useEffect } from 'react';

const color = grey[900];

export default function EditHeader({user, business}) {
  const [imageKey, setImageKey] = useState(null);

  useEffect(() => {
    setImageKey(Date.now());
  }, []);

  const handleHeaderUpload = async (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    formData.append("imagePath", `headers/${user?.code || business?.businessName}.jpg`);

    try {
      const response = await fetch('/api/uploadImg', {
        method: 'PUT',
        body: formData,
      });

      if (response.status === 201) {
        console.log('header Uploaded successfully');
        setImageKey(Date.now());
      }
    } catch (error) {
      console.error('Error uploading header:', error);
    }
  };

  return (
    <Box
      display="flex" alignItems="flex-end" justifyContent="left"
      style={{
        position: "relative",
        width: "100vw",
        height: "50vh",
        backgroundImage: `url(/headers/${user?.code || business?.businessName}.jpg${imageKey ? `?key=${imageKey}` : ''})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      sx={{ bgcolor: '#cfe8fc', width: "100vw", height: "50vh", background: 'linear-gradient(to right bottom, #36EAEF, #6B0AC9)', }}
    >
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="header-image-updater"
        type="file"
        onChange={handleHeaderUpload}
      />
      <label htmlFor="header-image-updater">
        <IconButton component="span" sx={{ ml: 5, mb: 5, bgcolor: color }}>
          <AddAPhotoIcon sx={{ color: 'white' }} />
        </IconButton>
      </label>
    </Box>
  )
}



