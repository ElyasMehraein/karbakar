'use client';
import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface CustomSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
}

export default function CustomSnackbar({
  open,
  onClose,
  message,
  severity = 'info',
}: CustomSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
