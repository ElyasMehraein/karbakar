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
import { usePathname } from 'next/navigation';


export default function MyAppBar({ user, logedUserCode, business }) {
  const pathname = usePathname();
  const modifiedUrl = pathname.split('/').slice(0, -1).join('/') + '/';
  const router = useRouter()
  const isEditNeeded = Boolean(user || business)
  const isAauthorizedToEdit = user ? (logedUserCode === user.code) : (logedUserCode == business?.agentCode)

  const goToIndex = () => {
    router.push(modifiedUrl)
  }
  const goToEdit = () => {
    router.push(`${business?.businessName || logedUserCode}/edit`)
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
            <Typography sx={{ mx: 1 }} component="div" >
              بازگشت
            </Typography>
          </Button>
          <Box style={{ flexGrow: 1 }}></Box>
          {isAauthorizedToEdit && !pathname.endsWith('/edit') && isEditNeeded &&
            <Button
              color="inherit"
              onClick={goToEdit}
            >
              ویرایش
              <EditIcon />
            </Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
