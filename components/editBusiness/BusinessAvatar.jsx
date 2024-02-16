import UserAvatarImg from "@/public/assets/default/default-avatar.svg"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Image from "next/image";
import { grey } from '@mui/material/colors';
import { Container, IconButton } from "@mui/material";

const color = grey[900];

export default function BusinessAvatar() {
  return (
    <Container maxWidth="md">
      <Box sx={{ justifyContent: 'flex-start' }} display="flex">
        <Avatar
          sx={{ width: 80, height: 80, mt: -5 }}
        >
          <Image
            alt="business brand"
            src={UserAvatarImg}
            quality={100}
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
          />
        </Avatar>
        <IconButton
          sx={{ mr: -2, bgcolor: color }}>
          <AddAPhotoIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box>

    </Container>
  );
}
