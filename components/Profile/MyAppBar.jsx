import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from '../../styles/theme';


export default function MyAppBar() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              component={Link} to="/Index"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="p" component="div" sx={{ flexGrow: 1 }}>
              صفحه شخصی
            </Typography>

            <Button color="inherit"><EditIcon />ویرایش</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
