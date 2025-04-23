"use client"
import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from '@mui/material';
import { useSnackbar } from './SnackbarProvider';
import { Business } from '@/types';

interface AddToReceiversButtonProps {
  business: Business;
  onAdd: () => void;
}

export default function AddToReceiversButton({ business, onAdd }: AddToReceiversButtonProps) {
  const [open, setOpen] = useState(false);
  const [receiverCode, setReceiverCode] = useState('');
  const { showSnackbar } = useSnackbar();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setReceiverCode('');
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/business/${business.businessCode}/receivers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receiverCode }),
      });

      if (response.ok) {
        showSnackbar('دریافت‌کننده با موفقیت اضافه شد', 'success');
        onAdd();
        handleClose();
      } else {
        showSnackbar('خطا در اضافه کردن دریافت‌کننده', 'error');
      }
    } catch (error) {
      console.error('Error adding receiver:', error);
      showSnackbar('خطا در ارتباط با سرور', 'error');
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        افزودن دریافت‌کننده
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>افزودن دریافت‌کننده</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            لطفا کد کسب و کار دریافت‌کننده را وارد کنید
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="کد کسب و کار"
            type="text"
            fullWidth
            value={receiverCode}
            onChange={(e) => setReceiverCode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>انصراف</Button>
          <Button onClick={handleSubmit} color="primary" disabled={!receiverCode.trim()}>
            تایید
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 