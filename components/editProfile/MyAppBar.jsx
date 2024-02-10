import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/router';

export default function MyAppBar({whichUserProfile}) {
  const router = useRouter()
  const goToProfile = () => {
    router.replace(`/${whichUserProfile}`)
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
            onClick={goToProfile}

          >
            <ArrowForwardIcon />
            <Typography component="div" >
              صفحه شخصی
            </Typography>
          </Button>
          <Box style={{ flexGrow: 1 }}></Box>
           </Toolbar>
      </AppBar>
    </Box>
  );
}
