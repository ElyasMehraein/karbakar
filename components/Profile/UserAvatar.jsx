import UserAvatarImg from "@/public/assets/default/default-avatar.svg"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Typography from '@mui/material/Typography';
import Image from "next/image";
import { grey } from '@mui/material/colors';
import { Container, IconButton } from "@mui/material";

const color = grey[900];
const createdAt = "10 days"
export default function BusinessAvatar() {
  return (
    <Container maxWidth="md">
      <Box sx={{ justifyContent: 'flex-start' }} display="flex">
        <Avatar
          sx={{ width: 80, height: 80, mt: -5 }}
        >
          <Image
            alt="profile picture"
            src={UserAvatarImg}
            quality={100}
            fill
            sizes="100vw"
            style={{
              // objectFit: 'cover',
            }}
          />
        </Avatar>
        <Box style={{ flexGrow: 1 }}></Box>

        <Typography display="inline" variant="subtitle2" sx={{ fontWeight: 'bold' }}>
          سابقه عضویت در سایت: {createdAt}
        </Typography>
      </Box>

    </Container>
  );
}
