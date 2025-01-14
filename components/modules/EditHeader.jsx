"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Alert, Snackbar } from '@mui/material';

const color = grey[900];

export default function EditHeader({ user, business }) {
  const userCodeOrBusinessBrand = user?.code || business?.businessName
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isHeader, setIsHeader] = useState(user?.isHeader || business?.isHeader);
  const [uploadeding, setUploadeding] = useState(false)
  useEffect(() => {

    setIsLoading(false)
  }, []);

  const handleHeaderUpload = async (event) => {
    const image = event.target.files[0];

    if (!validateImageType(image)) {
      setSnackbarOpen(true)
      return;
    }

    setUploadeding(true)

    const formData = new FormData();
    formData.append('image', image);
    formData.append("imagePath", `images/headers/${userCodeOrBusinessBrand}.jpg`);

    try {
      const response = await fetch('/api/uploadImg', {
        method: 'PUT',
        body: formData,
      });

      if (response.status === 201) {
        console.log('header Uploaded successfully');
        setIsHeader(true)
        location.reload()
      }
    } catch (error) {
      console.error('Error uploading header:', error);
    } finally {
      setUploadeding(false);
    }
  };

  const validateImageType = (image) => {
    const acceptedTypes = ['image/jpeg']; // Only accept JPG
    return acceptedTypes.includes(image.type);
  };

  return (
    <>
      {isHeader && !isLoading ?
        <Box
          display="flex" alignItems="flex-end" justifyContent="left"
          style={{
            position: "relative",
            width: "100%",
            height: "50vh",
            backgroundImage: `url(/images/headers/${userCodeOrBusinessBrand}.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          sx={{ bgcolor: '#cfe8fc', width: "100%", height: "50vh", background: 'linear-gradient(to right bottom, #36EAEF, #6B0AC9)', }}
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
        :
        <Box
          display="flex" alignItems="flex-end" justifyContent="left"
          style={{
            position: "relative",
            width: "100vw",
            height: "30vh",
          }}
          sx={{ bgcolor: '#cfe8fc', width: "100vw", height: "30vh", background: 'linear-gradient(to right bottom, #36EAEF, #6B0AC9)', }}
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
      }
      {uploadeding && <LinearProgress />}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert
          severity={"error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          فرمت تصویر بایستی JPG باشد
        </Alert>
      </Snackbar>
    </>
  )
}



