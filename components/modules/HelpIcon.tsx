'use client';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface HelpIconProps {
  title: string;
  content: string;
}

export default function HelpIcon({ title, content }: HelpIconProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="راهنما">
        <IconButton onClick={handleClickOpen} size="small">
          <HelpOutlineIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography>{content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>بستن</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
