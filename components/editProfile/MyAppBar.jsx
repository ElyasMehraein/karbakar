import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function MyAppBar(props) {


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar >
          <Button
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <ArrowForwardIcon />
            <Typography component="div" >
              صفحه شخصی
            </Typography>
          </Button>
          <Box style={{ flexGrow: 1 }}></Box>
          {props.data?
          <Button color="inherit">
            ویرایش
            <EditIcon />
          </Button>
          :""}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
