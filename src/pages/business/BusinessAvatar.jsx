import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import businessAvatar from "../../assets/businessAvatar.jpg"

export default function BusinessAvatar() {
  return (
    <Avatar
      alt="Remy Sharp"
      src={businessAvatar}
      sx={{ width: 80, height: 80, mt: -5, ml: 2 }}
    />

  );
}
