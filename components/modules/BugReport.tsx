'use client';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface User {
  _id: string;
  code: number;
}

interface BugReportProps {
  user: User;
}

export default function BugReport({ user }: BugReportProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/bug', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          userCode: user.code,
          message,
        }),
      });

      if (response.ok) {
        handleClose();
        router.refresh();
      }
    } catch (error) {
      console.error('Error submitting bug report:', error);
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        گزارش خطا
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>گزارش خطا</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="توضیحات خطا"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>انصراف</Button>
          <Button onClick={handleSubmit} color="primary">
            ارسال
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
