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

export default function MyAppBar(props) {
  const [logedUserCode, setlogedUserCode] = useState(null)
  const router = useRouter()
  useEffect(() => {
    const userAuth = async () => {
      const res = await fetch("/api/auth/me")
      if (res.status === 200) {
        const user = await res.json()
        setlogedUserCode(user.data.code)
      }
      userAuth()

    }
  }, [logedUserCode])
  const goToIndex = () => {
    router.replace("/")
  }
  const goToEdit = () => {
    router.replace(`"/${logedUserCode}"`)
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
              صفحه اصلی
            </Typography>
          </Button>
          <Box style={{ flexGrow: 1 }}></Box>
          {props.data ?
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
