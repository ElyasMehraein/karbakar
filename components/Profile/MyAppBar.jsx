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

export default function MyAppBar(props) {
  React.useEffect(() => {
    console.log("isLogedInMyOwnProfile", props.data,);
  }, [])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>

          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ ml: 2 }}
            >
              <ArrowForwardIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              صفحه شخصی
            </Typography>
            <Button sx={{ fontSize: 20 }} color="inherit">
              ویرایش
              <EditIcon sx={{ mr: 2 }} />
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
