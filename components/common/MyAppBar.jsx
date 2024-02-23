"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MyAppBar({ business, logedUserCode, whichUserProfile }) {
  const router = useRouter()
  const [isLogedInMyOwnProfile, setIsLogedInMyOwnProfile] = useState(false)
  useEffect(() => {
    if (logedUserCode === whichUserProfile) {
      setIsLogedInMyOwnProfile(true)
    }

  }, [logedUserCode])

  const goToIndex = () => {
    router.replace("/")
  }
  const goToEdit = () => {
    router.replace(`${business}/edit`)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar >
          <Button
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={goToIndex}
          >
            <ArrowForwardIcon />
            <Typography component="div" >
              بازگشت به صفحه اصلی
            </Typography>
          </Button>
          <Box style={{ flexGrow: 1 }}></Box>
          {isLogedInMyOwnProfile ?
            <Button
              color="inherit"
              onClick={goToEdit}
            >
              ویرایش
              <EditIcon />
            </Button>
            : ""}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
