import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import UserAvatarImg from "../../assets/UserAvatarImg.jpg"

export default function UserAvatar() {
  return (
    <Avatar
      alt="Remy Sharp"
      src={UserAvatarImg}
      sx={{ width: 80, height: 80, mt: -5, ml: 2 }}
    />

  );
}
