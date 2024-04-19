import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function DefaultHeader() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ bgcolor: '#cfe8fc', height: "30vh", background: 'linear-gradient(to right bottom, #36EAEF, #6B0AC9)', position: 'relative'}} />
    </React.Fragment>
  );
}
