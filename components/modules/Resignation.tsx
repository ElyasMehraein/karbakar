"use client"
import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from '@mui/material';
import { useSnackbar } from './SnackbarProvider';
import { Business } from '@/types';

interface ResignationProps {
  business: Business;
  onResign: () => void;
}

export default function Resignation({ business, onResign }: ResignationProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const { showSnackbar } = useSnackbar();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setReason('');
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/business/${business.businessCode}/resign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });

      if (response.ok) {
        showSnackbar('درخواست استعفا با موفقیت ثبت شد', 'success');
        onResign();
        handleClose();
      } else {
        showSnackbar('خطا در ثبت درخواست استعفا', 'error');
      }
    } catch (error) {
      console.error('Error submitting resignation:', error);
      showSnackbar('خطا در ارتباط با سرور', 'error');
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button
        variant="outlined"
        color="error"
        onClick={handleOpen}
      >
        درخواست استعفا
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>درخواست استعفا</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            آیا از درخواست استعفا از کسب و کار {business.businessName} اطمینان دارید؟
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="دلیل استعفا"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>انصراف</Button>
          <Button onClick={handleSubmit} color="error" disabled={!reason.trim()}>
            تایید استعفا
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 