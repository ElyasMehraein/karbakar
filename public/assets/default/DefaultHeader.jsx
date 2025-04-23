import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';

export default function DefaultHeader() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: '#cfe8fc',
          height: '50vh',
          background: 'linear-gradient(to right bottom, #36EAEF, #6B0AC9)',
          position: 'relative',
        }}
      />
    </React.Fragment>
  );
}
