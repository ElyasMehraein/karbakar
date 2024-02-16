import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';

export default function MyAppBar({ business, logedUserCode, whichUserProfile }) {
  const router = useRouter()
  const [isLogedInMyOwnProfile, setIsLogedInMyOwnProfile] = useState(false)
  useEffect(() => {
    if (logedUserCode === whichUserProfile) {
      setIsLogedInMyOwnProfile(true)
    }

  }, [logedUserCode])
  console.log("logedUserCode", logedUserCode);
  console.log("whichUserProfile", whichUserProfile);
  console.log("isLogedInMyOwnProfile", isLogedInMyOwnProfile);


  const goToIndex = () => {
    router.push("/")
  }
  const goToEdit = () => {
    router.push(`${business}/edit`)
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

        </Toolbar>
      </AppBar>
    </Box>
  );
}
