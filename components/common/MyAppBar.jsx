"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';

export default function MyAppBar({ user, logedUserCode, business }) {

  const router = useRouter()
  const isAauthorizedToEdit = user ? (logedUserCode === user.code) : (logedUserCode == business?.agentCode)

  const goToIndex = () => {
    router.push("/")
  }
  const goToEdit = () => {
    router.push(`${business.businessName || logedUserCode}/edit`)
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
          {isAauthorizedToEdit ?
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
