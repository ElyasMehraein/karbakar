import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function customSnackbar({ open, onClose, message}) {
  
  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

